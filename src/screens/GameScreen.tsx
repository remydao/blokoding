import React, { Component } from 'react';
import BackgroundGame from "../components/BackgroundGame";
import { View, StatusBar, Image} from 'react-native';
import Character from "../components/Character";
import EngineConstants from '../constants/EngineConstants';
import { MoveBlock, JumpBlock, GrabBlock, UseBlock } from '../scripts/blocks/ActionBlock';
import { BlockType, Characters, Environments, Items } from '../constants/BlockType';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import MapItem from '../components/MapItem'
import Inventory from '../components/Inventory';
import Overlay from '../components/Overlay';
import { CameraMode } from '../constants/CameraMode';
import Cells from '../constants/Cells';
import { isItem, ItemImages } from '../constants/ItemImages';
import { getIsDoneList, storeIsDoneList } from '../scripts/storage/DiscoverLevels';
import { getCharacterImages } from '../constants/CharacterImages';
import MyColors from '../constants/Colors';
import {loadSound} from '../scripts/sound/sound'
import BlockSchema from '../components/BlockSchema';
import BlockSchemaItem from '../components/BlockSchemaItem';
import BlockSchemaRow from '../components/BlockSchemaRow';
import { EnvironmentImages } from '../constants/EnvironmentImages';
import uuid from 'react-native-uuid';
import { sleep } from '../scripts/utils';
import * as Progress from 'react-native-progress';
import Translation from '../datas/translation.json';
import LanguageContext from '../context/LanguageContext';
import { ItemBlock } from "../scripts/blocks/DataBlock";

interface IProps {
    navigation: any,
    route: any,
}

interface IState {
    bg0Pos: number,
    bg1Pos: number,
    playerPosY: number,
    map: any,
    itemsPos: number[],
    hasLost: boolean,
    hasWon: boolean,
    inventory: any,
    isStartAnimation: boolean,
    image: any,
    columns: number,
    rows: number,
    numSpritesInSpriteSheet: number,
    blockSchemaStatus: boolean[],
    percentLoading: number,
    animUUID: any,
    languageObj: Object,
    spriteWidth: number,
    spriteHeight: number,
}

class Game extends Component<IProps, IState> {

    static contextType = LanguageContext;
    private moveDistance: number = 0;
    private characterPos: number = 0;
    private frameCount: number = 0;
    private rateTicks: number = 1000.0 / 60.0;
    private baseTicks: number = Date.now();
    private lastTicks: number = this.baseTicks;
    private timePassed: number = 0;
    private frameDelay: number = 0;
    private speed: number = EngineConstants.CELL_SIZE * this.rateTicks / 2000;
    private actions: any;
    private endReason: string = "";
    private mounted: boolean = false;
    private winCondition: any;
    private initialPlayerPosY : number = EngineConstants.MAX_HEIGHT * 0.15;
    private images: any;
    private blockSchemaRowList: JSX.Element[] = [];
    private currActiveBlockSchemaItemIndex: number = 1;

    constructor(props: IProps) {
        super(props);

        if (props.route.params.cameraMode == CameraMode.TEST) {
            this.actions = new CharacterBlock(Characters.MrMustache, new JumpBlock(new MoveBlock(null)));
        } else {
            this.actions = props.route.params.actions;
            console.log(this.actions);
        }

        this.images = getCharacterImages(this.actions.character);

        this.state = {
            bg0Pos: 0,
            bg1Pos: EngineConstants.MAX_WIDTH,
            playerPosY: this.initialPlayerPosY,
            map: [...props.route.params.mapInfo.map],
            itemsPos: props.route.params.mapInfo.map.map((item: any, index: number) => EngineConstants.CELL_SIZE / 2 + EngineConstants.CELL_SIZE * index),
            hasLost: false,
            hasWon: false,
            inventory: {},
            isStartAnimation: false,
            image: this.images.move[0],
            columns: 9,
            rows: 7,
            numSpritesInSpriteSheet: 1,
            blockSchemaStatus: Array.from({length: props.route.params.nCard}, i => i = false),
            percentLoading: 0,
            animUUID: uuid.v4(),
            languageObj: Translation["en"].gameScreen,
            spriteWidth: 240,
            spriteHeight: 256
        };

        this.winCondition = props.route.params.mapInfo.winCondition;

        if (props.route.params.cameraMode == CameraMode.TEST) {
            this.actions = new CharacterBlock(Characters.MrMustache, new MoveBlock(new GrabBlock(new MoveBlock(new UseBlock(new ItemBlock(Items.Machete), new MoveBlock(new MoveBlock(new MoveBlock(null))))))));
        } else {
            this.actions = props.route.params.actions;
        }
    }

    async componentDidMount() {
        this.setState({languageObj: Translation[this.context.language].gameScreen})
        this.mounted = true;

        this.setState({percentLoading: 0});

        this.loadImagesKeyValue(this.props.route.params.mapInfo.theme).then(results => {

            this.setState({ percentLoading: 50 });

            let objectsImagesArray: any[] = [];
            Object.values(ItemImages).map(i => {
                objectsImagesArray.push(i.uri);
            });

            Object.values(EnvironmentImages).map(i => {
                objectsImagesArray.push(i.uri);
            }); 

            objectsImagesArray.push(this.images.move[0])
            objectsImagesArray.push(this.images.jump[0])

            this.loadImagesArray(objectsImagesArray).then(res => {
                this.setState({ percentLoading: 100 });
            })            
        });

        let start = Date.now();
        await this.actions.execute(this);

        let end = Date.now();
        console.log(end - start);

        if (this.state.map[this.characterPos] != Cells.Win && !this.state.hasLost && !this.state.hasWon) {
            this.fireEndScreen("loose", this.state.languageObj.lose)
        }
    }

    async componentWillUnmount() {
        this.mounted = false;
        console.log("unMounted");
    }

    isMounted(): boolean {
        return this.mounted;
    }

    // function that check if user can jump or not
    async preCheckState() {
        return await new Promise<void>((resolve) => {
            switch (this.state.map[this.characterPos + 1]) {
                case Cells.Win:
                    this.fireEndScreen("won");
                    break;
                case Cells.Bush:
                    this.fireEndScreen("loose", this.state.languageObj.loseBush);
                    break;
                case Cells.Door:
                    this.fireEndScreen("loose", this.state.languageObj.loseDoor);
                    break;
                default:
                    break;
            }
            resolve();
        }) 
    }

    // function that check user's win or loss
    async checkState() {
        return await new Promise<void>((resolve) => {
            switch (this.state.map[this.characterPos]) {
                case Cells.Win:

                    if (this.checkWinCondition())
                        this.fireEndScreen("won");
                    break;
                case Cells.Puddle:
                    this.fireEndScreen("loose", this.state.languageObj.losePuddle);
                    break;
                case Cells.Bush:
                    this.fireEndScreen("loose", this.state.languageObj.loseBush2);
                    break;
                case Cells.Door:
                    this.fireEndScreen("loose", this.state.languageObj.loseDoor2);
                    break;
                case Cells.Bin:
                    this.fireEndScreen("loose", this.state.languageObj.loseBin);
                    break;
                default:
                    break;
            }
            resolve();
        }) 
    }

    checkWinCondition() : boolean {
        if (this.winCondition && (!this.checkRemovedFromMap() || !this.checkIsInInventory()))
            return false;
        return true;
    }

    checkRemovedFromMap() : boolean {
        if (this.winCondition.removedFromMap) {
            for (let i = 0; i < this.winCondition.removedFromMap.length; i++) {
                const entity = this.winCondition.removedFromMap[i];
                
                for (let j = 0; j < this.state.map.length; j++) {
                    if (this.state.map[j].content && this.state.map[j].content.imageName == entity) {
                        this.fireEndScreen("loose", this.state.languageObj.removedMap1 + entity + this.state.languageObj.removedMap2);
                        return false;
                    }
                }
            }
        }
        return true;
    }

    checkIsInInventory() : boolean {
        if (this.winCondition.isInInventory) {
            let inventory = Object.entries(this.state.inventory);
            for (let i = 0; i < this.winCondition.isInInventory.length; i++) {
                const invItem = this.winCondition.isInInventory[i];
                
                let res = inventory.filter(item => item[0] == invItem.item);
                if (res.length < 1 || res[0][1] != invItem.quantity) {
                    this.fireEndScreen("loose", this.state.languageObj.checkInventory1 + invItem.item + this.state.languageObj.checkInventory2);
                    return false;
                }
            }
        }
        return true;
    }

    // Fire the loose screen with a message
    fireEndScreen(looseOrWon: string, endReason: string = this.state.languageObj.win) {
        if (looseOrWon === "loose") {
            this.endReason = endReason;
            this.setState({hasLost: true});
            this.onLose();
        } else {
            this.endReason = endReason;
            this.setState({hasWon: true});
            this.onWin();
        }
        
    }

    // Getter of hasLost state
    getStateHasLost() {
        return this.state.hasLost;
    }

    // Getter of hasWon state
    getStateHasWon() {
        return this.state.hasWon;
    }

    // Frame handling
    setFramerateDelay() {   
        this.frameCount++;

        // console.log("lastTicks :" + this.lastTicks);

        var currentTicks = Date.now();
        this.timePassed = currentTicks - this.lastTicks;
        this.lastTicks = currentTicks;
        var targetTicks = this.baseTicks + this.frameCount * this.rateTicks;

        if (currentTicks <= targetTicks) {
            this.frameDelay = targetTicks - currentTicks;
        } else {
            this.frameCount = 0;
            this.baseTicks = Date.now();
            this.frameDelay = 0;
        }

        // console.log("currentTicks :" + currentTicks);
        // console.log("timepassed :" + this.timePassed);
        // console.log("targetTicks :" + targetTicks);
        // console.log("framedelay :" + this.frameDelay);
        // console.log("sleepValue :" + this.sleepValue);

        this.speed = (EngineConstants.CELL_SIZE * (this.timePassed + this.frameDelay)) / 2000;
    }

    getNewImage() {
        const progress =  this.moveDistance / EngineConstants.CELL_SIZE;

        return Math.floor((120 * progress) % 60);
    }

    async setActiveBlockSchemaItem(index: number, mustSleep: boolean = true) {
        this.setState(prevState => {
            let blockSchemaStatus = prevState.blockSchemaStatus;
            blockSchemaStatus[this.currActiveBlockSchemaItemIndex] = false;
            blockSchemaStatus[index] = true;
            return {blockSchemaStatus};
        })
        this.currActiveBlockSchemaItemIndex = index;
        
        if (mustSleep)
            await sleep(250);
    }

    // Method to move the character (used in ActionBlock.js)
    async move() {
        this.lastTicks = Date.now();
        this.moveDistance = 0

        var self = this;

        return await new Promise<void>(resolve => {
            // Fix memory leak when quitting
            if (!self.mounted)
                resolve();

            var lastImage = -1;

            movePos();

            function movePos() {
                self.setFramerateDelay();

                if (self.moveDistance + self.speed > EngineConstants.CELL_SIZE) {
                    self.speed = EngineConstants.CELL_SIZE - self.moveDistance;
                    self.moveDistance = EngineConstants.CELL_SIZE;
                } else {
                    self.moveDistance += self.speed;
                }

                var newItemPos = self.moveItems();
                var newBgPos = self.moveBackground();

                // Fix memory leak when quitting
                if (!self.mounted)
                    resolve();

                var imageUUID = self.state.animUUID;
                var imageNum = Math.floor((self.moveDistance / EngineConstants.CELL_SIZE) * 2);
                if (imageNum > 1)
                    imageNum = 1;

                // If sprite sheet changed
                if (imageNum !== lastImage)
                {
                    imageUUID = uuid.v4();
                    lastImage = imageNum;
                }
    
                self.setState({
                    bg0Pos: newBgPos[0],
                    bg1Pos: newBgPos[1],
                    itemsPos: newItemPos,
                    image: self.images.move[0],
                    columns: 8,
                    rows: 8,
                    numSpritesInSpriteSheet: 60,
                    animUUID: imageUUID,
                    spriteWidth: 256,
                })

                if (self.moveDistance >= EngineConstants.CELL_SIZE) {
                    self.characterPos++;
                    resolve();
                }
                else {
                    setTimeout(movePos, self.frameDelay);
                }      
            }
        });
    }

    // General function to jump the character (used in ActionBlock.js)
    // num_cell is the number of cell the animation last
    async jump(numCells : number = 2) {
        loadSound("jump.mp3", false, 1);
        this.lastTicks = Date.now();

        this.moveDistance = 0;

        var self = this;

        return await new Promise<void>(resolve => {
            // Fix memory leak when quitting
            if (!self.mounted)
                resolve();

            var lastImage = -1;

            jumpPos();

            function jumpPos() {
                self.setFramerateDelay();

                if (self.moveDistance + self.speed > EngineConstants.CELL_SIZE * numCells) {
                    self.speed = EngineConstants.CELL_SIZE * numCells - self.moveDistance;
                    self.moveDistance = EngineConstants.CELL_SIZE * numCells;
                } else {
                    self.moveDistance += self.speed;
                }

                var newItemPos = self.moveItems();
                var newBgPos = self.moveBackground();
                var playerPosY = self.moveCharacUpDown();

                // Fix memory leak when quitting
                if (!self.mounted)
                    resolve();

                // Get current sprite sheet
                var imageUUID = self.state.animUUID;
                var imageNum = Math.floor((self.moveDistance / EngineConstants.CELL_SIZE) * 2);
                
                if (imageNum >= 4)
                    imageNum = 3;

                // If sprite sheet changed
                if (imageNum !== lastImage)
                {
                    imageUUID = uuid.v4();
                    lastImage = imageNum;
                }
                    
                self.setState({
                    bg0Pos: newBgPos[0],
                    bg1Pos: newBgPos[1],
                    itemsPos: newItemPos,
                    playerPosY: playerPosY,
                    image: self.images.jump[imageNum],
                    columns: 7,
                    rows: 9,
                    numSpritesInSpriteSheet: 60,
                    animUUID: imageUUID,
                    spriteWidth: 256,
                })

                if (self.moveDistance >= EngineConstants.CELL_SIZE * numCells) {
                    self.characterPos += numCells;
                    resolve();
                }
                else {
                    setTimeout(jumpPos, self.frameDelay);
                }      
            }
        });
    }

    async grab() {
        var currCell = this.state.map[this.characterPos];

        if (currCell == Cells.Empty || !isItem(currCell.content.imageName)) {
            this.fireEndScreen("loose", "Perdu, fait attention de ramasser au bon moment !")
            console.log("grab failed");
            return false;
        }
            
        // Fix memory leak when quitting
        if (!this.mounted)
            return false;


        var self = this;

        await new Promise<void>(resolve => {
            // Fix memory leak when quitting
            if (!self.mounted)
                resolve();

            var imageNum = 0;

            doGrab();

            function doGrab() {
                if (imageNum == 1) {
                    loadSound("grab.mp3", false, 1);

                    self.setState((prevState) => {
                        let inventory = prevState.inventory;  
                        inventory[currCell.content.imageName] = inventory[currCell.content.imageName] ? inventory[currCell.content.imageName] + 1 : 1;                                  
                        let map = prevState.map;
                        map[self.characterPos] = Cells.Empty
                        return {inventory, map};                                 
                    });
                }

                self.setState({
                    image: self.images.crouch[imageNum],
                    columns: 8,
                    rows: 8,
                    numSpritesInSpriteSheet: 60,
                    animUUID: uuid.v4(),
                    spriteWidth: 240,
                })

                // Fix memory leak when quitting
                if (!self.mounted)
                    resolve();

                imageNum++;

                if (imageNum < 2)
                    setTimeout(doGrab, 16.667 * 60);
                else
                    setTimeout(resolve, 16.667 * 60);    
            }
        });

        return true;
    }

    async use(item: string) {
        const usables = {
            [Items.Key]: Environments.Door,
            [Items.Machete]: Environments.Bush,
            [Items.Trash]: Environments.Bin
        };
        const sounds = {
            [Items.Key]: "open_door.mp3",
            [Items.Machete]: "cut_bush.mp3",
            [Items.Trash]: "throw_bin.mp3"
        };

        if (Object.keys(usables).filter(usableItem => usableItem === item).length === 0) {
            console.log(item);
            this.fireEndScreen("loose", "Tu ne peux pas utiliser une " + item);
            return false;
        }

        // Fix memory leak when quitting
        if (!this.mounted)
            return false;

        if (!this.possess(item))
            this.fireEndScreen("loose", "Tu dois posséder un " + item + " pour pouvoir l'utiliser");
        else if(!this.isInFront(usables[item]))
            this.fireEndScreen("loose", "Tu dois être en face d'un " + usables[item] + " pour pouvoir utiliser ton " + item);
        else {
            if (item == Items.Machete)
            {
                this.lastTicks = Date.now();

                var self = this;

                await new Promise<void>(resolve => {
                    // Fix memory leak when quitting
                    if (!self.mounted)
                        resolve();
        
                    var imageNum = 0;
        
                    useMachete();
        
                    function useMachete() {
                        if (imageNum == 1) {
                            loadSound(sounds[item], false, 1);
                            self.setState((prevState) => {
                                let inventory = prevState.inventory;
                                let map = prevState.map;
                                inventory[item] -= 1;
                                map[self.characterPos + 1] = Cells.Empty;
                                return {inventory, map}
                            })
                        }

                        self.setState({
                            image: self.images.cut[imageNum],
                            columns: 5,
                            rows: 6,
                            numSpritesInSpriteSheet: 30,
                            animUUID: uuid.v4(),
                            spriteWidth: 400,
                        })
        
                        // Fix memory leak when quitting
                        if (!self.mounted)
                            resolve();

                        imageNum++;
    
                        if (imageNum < 2)
                            setTimeout(useMachete, 16.667 * 30);
                        else
                            setTimeout(resolve, 16.667 * 30);    
                    }
                });
            }

            return true;
        }

        return false;
    }

    // Function for jump translation
    moveCharacUpDown = () => {
        if (this.moveDistance <= EngineConstants.CELL_SIZE) {
            const acc = 1 - this.moveDistance / EngineConstants.CELL_SIZE;
            return this.state.playerPosY + this.speed * 2 * acc;
        } else {
            const acc = this.moveDistance / EngineConstants.CELL_SIZE - 1;
            const nextPlayerPosY = this.state.playerPosY - this.speed * 2 * acc
            if (nextPlayerPosY < this.initialPlayerPosY)
                return this.initialPlayerPosY;
            return nextPlayerPosY;
        }
    }

    // Function for move translation of the character
    moveBackground = () => {
        let newBg0Pos = this.state.bg0Pos - this.speed;
        if (newBg0Pos + EngineConstants.MAX_WIDTH < 0)
            newBg0Pos += EngineConstants.MAX_WIDTH * 2;

        let newBg1Pos = this.state.bg1Pos - this.speed;
        if (newBg1Pos + EngineConstants.MAX_WIDTH < 0)
            newBg1Pos += EngineConstants.MAX_WIDTH * 2;

        return [newBg0Pos, newBg1Pos];
    }

    // Function for move translation of all the items in the map
    moveItems = () => {
        let newItemPos: number[] = [];
        for (let item of this.state.itemsPos)
            newItemPos.push(item - this.speed);
        
        return newItemPos;
    }

    // Function to notify loose
    onLose = async () => {
        loadSound("game_over.mp3", false, 1);
        if (this.props.route.params.levelType === 'tutorial') {
            const isDoneList : boolean[] = await getIsDoneList()
            //isDoneList[this.props.route.params.levelNumber] = true;
            await storeIsDoneList(isDoneList);
        }
        console.log('You lost');
    }

    // Function to notify win
    onWin = async () => {
        loadSound("game_win.mp3", false, 1);
        if (this.props.route.params.levelType  === 'tutorial') {
            const isDoneList : boolean[] = await getIsDoneList()
            isDoneList[this.props.route.params.levelNumber] = true;
            await storeIsDoneList(isDoneList);
        }
        console.log('You won');
    }

    // return true if character is in front of an entity(data block)
    isInFront(entity: string) : Boolean {
        return this.state.map[this.characterPos + 1].content && this.state.map[this.characterPos + 1].content.imageName == entity;
    }

    // return true if character is on an entity(data block)
    isOn(entity: string) : Boolean {
        return this.state.map[this.characterPos].content && this.state.map[this.characterPos].content.imageName == entity;
    }

    // return true if character possess an entity(data block)
    possess(entity: string) {
        return this.state.inventory[entity] && this.state.inventory[entity] > 0;
    }

    backToSelectLevels = () : void => {
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.navigate('Découverte');
    }

    backToLevelFailed = () : void => {
        this.props.navigation.pop();
        this.props.navigation.pop();
    }

    // Convert image refs into image objects with Image.resolveAssetSource
    async loadImagesKeyValue(images: any) {
        return Promise.all(Object.keys(images).map((i) => {
            let img = {
                ...Image.resolveAssetSource(images[i]),
                cache: 'force-cache'
            };
            return Image.prefetch(img.uri);
        }));
    }

    async loadImagesArray(images: any[]) { 
        return Promise.all(images.map(element => {
            let img = {
                ...Image.resolveAssetSource(element),
                cache: 'force-cache'
            };
            return Image.prefetch(img.uri);
        }));
    }

    async loadImage(image: any) {
        let img = {
            ...Image.resolveAssetSource(image),
            cache: 'force-cache'
        }
        return Image.prefetch(img.uri);
    }
    
    render() {
        if (this.props.route.params.cameraMode !== CameraMode.TEST) {//set block schema
            var blockNumber = 0;
            this.blockSchemaRowList = this.props.route.params.blockSchemaTypeList.map((typeRow: BlockType[], index: number) => ( <BlockSchemaRow key={index} itemList={typeRow.map(type => {
                blockNumber++;
                return ( <BlockSchemaItem key={blockNumber} blockType={type} active={this.state.blockSchemaStatus[blockNumber]} /> );
            })} /> ));
        }
        
        let arr = this.state.map.map((item: any, index: number) => {
            if (item != Cells.Empty) {
                return <MapItem key={index} item={item} position={[this.state.itemsPos[index], this.initialPlayerPosY ]} />                            
            }
        });

        return (
            <View style={{width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>
                <View>
                {
                    this.state.percentLoading < 100 ?
                    (<View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: MyColors.primary, height:"100%", width:"100%"}}>
                        <Progress.Circle indeterminate={true} size={200}/>
                    </View>) :
                    (
                        <View style={{position: 'relative', width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>

                            {this.state.hasWon && <Overlay cameraMode={this.props.route.params.cameraMode} hasWon={true} text={this.endReason} color="lightgreen" backToSelectLevels={this.backToSelectLevels} backToLevelFailed={this.backToLevelFailed}/>}
                            {this.state.hasLost && <Overlay cameraMode={this.props.route.params.cameraMode} hasWon={false} text={this.endReason} color={MyColors.dark_red} backToSelectLevels={this.backToSelectLevels} backToLevelFailed={this.backToLevelFailed}/>}
                            <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background1} position={[this.state.bg0Pos, 0]} />
                            <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background2} position={[this.state.bg1Pos, 0]} />
                            <Character key={this.state.animUUID} position={[0, this.state.playerPosY]} sourceImage={this.state.image} columns={this.state.columns} rows={this.state.rows} numSpritesInSpriteSheet={this.state.numSpritesInSpriteSheet} dstWidth={this.state.spriteWidth}/>
                            { arr }
                            <Inventory inventory={this.state.inventory} />
                            <BlockSchema blockList={this.blockSchemaRowList} />
                        </View>)
                }
                <StatusBar translucent backgroundColor="transparent"/>
                </View>
            </View>
        )
    }
}

export default Game;