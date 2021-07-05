import React, { Component } from 'react';
import BackgroundGame from "../components/BackgroundGame";
import { View, StatusBar, Image} from 'react-native';
import Character from "../components/Character";
import EngineConstants from '../constants/EngineConstants';
import { MoveBlock, JumpBlock, GrabBlock, UseBlock } from '../scripts/blocks/ActionBlock';
import { Characters, Environments, Items } from '../constants/BlockType';
import { ForBlock, IfBlock, WhileBlock } from '../scripts/blocks/InstructionBlock';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import { DataBlock } from '../scripts/blocks/DataBlock';
import MapItem from '../components/MapItem'
import Inventory from '../components/Inventory';
import { ConditionBlock, StructureBlock } from '../scripts/blocks/MainBlocks';
import { IsInFrontBlock, IsOnBlock, PossessBlock } from '../scripts/blocks/ConditionBlock';
import Overlay from '../components/Overlay';
import { CameraMode } from '../constants/CameraMode';
import Cells from '../constants/Cells';
import { isItem } from '../constants/ItemImages';
import { getIsDoneList, storeIsDoneList } from '../scripts/storage/DiscoverLevels';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { characterImages, getCharacterImages } from '../constants/CharacterImages';
import LottieView from 'lottie-react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    imageNum: number,
    isStartAnimation: boolean
}

class Game extends Component<IProps, IState> {

    private moveDistance: number = 0;
    private characterPos: number = 0;
    private frameCount: number = 0;
    private rateTicks: number = 1000.0 / 60.0;
    private baseTicks: number = Date.now();
    private lastTicks: number = this.baseTicks;
    private timePassed: number = 0;
    private frameDelay: number = 0;
    private speed: number = EngineConstants.MAX_WIDTH * this.rateTicks * 0.0002;
    private actions: any;
    private endReason: string = "";
    private mounted: boolean = false;
    private winCondition: any;
    private initialPlayerPosY : number = EngineConstants.MAX_HEIGHT * 0.15;
    private images: any;
    private numFramesPerImage: number;
    private numFrame: number;

    constructor(props: IProps) {
        super(props);
        this.state = {
            bg0Pos: 0,
            bg1Pos: EngineConstants.MAX_WIDTH,
            playerPosY: this.initialPlayerPosY,
            map: [...props.route.params.mapInfo.map],
            itemsPos: props.route.params.mapInfo.map.map((item: any, index: number) => EngineConstants.CELL_SIZE / 2 + EngineConstants.CELL_SIZE * index),
            hasLost: false,
            hasWon: false,
            inventory: {},
            imageNum: 0,
            isStartAnimation: false
        };

        this.winCondition = props.route.params.mapInfo.winCondition;

        if (props.route.params.cameraMode == CameraMode.TEST) {
            this.actions = new CharacterBlock(new ForBlock(new DataBlock(50), 
                                    new IfBlock(new IsOnBlock(new DataBlock(Items.Flower)), new GrabBlock(null), 
                                    new IfBlock(new IsInFrontBlock(new DataBlock(Environments.Puddle)), new JumpBlock(null), 
                                    new IfBlock(null, new MoveBlock(null), null, null), null), null), null), Characters.MrMustache);
            /*this.actions = new CharacterBlock(new ForBlock(new DataBlock(50), 
                                    new IfBlock(new IsInFrontBlock(new DataBlock(Environments.Puddle)), new JumpBlock(null), 
                                    new IfBlock(null, new MoveBlock(null), null, null), null), null), Characters.Kevin);*/
            //this.actions = new CharacterBlock(new ForBlock(new DataBlock(50), new IfBlock(new IsOnBlock(new DataBlock(Items.Flower)), new GrabBlock(null), new IfBlock(new IsInFrontBlock(new DataBlock(Environments.Puddle)), new JumpBlock(null), null, null), null), new MoveBlock(null)), Characters.Kevin);
            //this.actions = new CharacterBlock(new MoveBlock(new GrabBlock(new MoveBlock(new UseBlock(new DataBlock(Items.Key), new MoveBlock(new MoveBlock(new MoveBlock(null))))))), Characters.MrMustache)
            //this.actions = new CharacterBlock(new MoveBlock(new MoveBlock(new UseBlock(new DataBlock(Items.Key), new JumpBlock(new MoveBlock(new MoveBlock(new MoveBlock(null))))))), Characters.MrMustache)
        } else {
            this.actions = props.route.params.actions;
            console.log(this.actions);
        }

        console.log(this.actions.character);

        this.images = getCharacterImages(this.actions.character);
        this.numFramesPerImage = 1;
        this.numFrame = 0;
    }


    async componentDidMount() {
        this.mounted = true;
        await setTimeout(() => {
            this.setState({isStartAnimation: !this.state.isStartAnimation})
        }, 2400)

        await this.actions.execute(this);

        if (this.state.map[this.characterPos] != Cells.Win && !this.state.hasLost && !this.state.hasWon) {
            this.fireEndScreen("loose", "Perdu, tu n'as pas atteint la ligne d'arrivée")
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
                    this.fireEndScreen("loose", "Tu ne peux pas sauter par dessus un buisson ! Utilise la machette pour le tuer");
                    break;
                case Cells.Door:
                    this.fireEndScreen("loose", "Tu ne peux pas sauter par dessus une porte ! Utilise la clé pour l'ourvrir");
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
                    this.fireEndScreen("loose", "Perdu, fais attention aux flaques d'eau");
                    break;
                case Cells.Bush:
                    this.fireEndScreen("loose", "Perdu, utilise la machette quand tu es devant le buisson pour le couper");
                    break;
                case Cells.Door:
                    this.fireEndScreen("loose", "Perdu, utilise la clé quand tu es devant la porte pour l'ouvrir");
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
                const itemName = this.winCondition.removedFromMap[i];
                
                for (let j = 0; j < this.state.map.length; j++) {
                    if (this.state.map[j].content && this.state.map[j].content.imageName == itemName) {
                        this.fireEndScreen("loose", "Perdu, il reste des " + itemName + " sur le terrain");
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
                    this.fireEndScreen("loose", "Perdu, tu n'as pas le bon nombre de " + invItem.item + " dans ton inventaire   ");
                    return false;
                }
            }
        }
        return true;
    }

    // Fire the loose screen with a message
    fireEndScreen(looseOrWon: string, endReason: string = "Bravo, tu as réussi !") {
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

        this.speed = EngineConstants.MAX_WIDTH * this.timePassed * 0.0002;
    }

    getNewImage() {
        var currentImageNum = this.state.imageNum;

        if (this.numFrame % this.numFramesPerImage == 0)
        {
            currentImageNum++;
            if (currentImageNum >= 60)
                currentImageNum = 0;
        }

        this.numFrame++;

        return currentImageNum;
    }

    // Method to move the character (used in ActionBlock.js)
    async move() {
        this.moveDistance = 0
        
        var self = this;

        return await new Promise<void>(resolve => {                
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

                let currentImageNum = self.getNewImage()

                self.setState({
                    bg0Pos: newBgPos[0],
                    bg1Pos: newBgPos[1],
                    itemsPos: newItemPos,
                    imageNum: currentImageNum,
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
        this.moveDistance = 0;

        var self = this;

        return await new Promise<void>(resolve => {
            // Fix memory leak when quitting
            if (!self.mounted)
                resolve();

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

                let currentImageNum = self.getNewImage()


                self.setState({
                    bg0Pos: newBgPos[0],
                    bg1Pos: newBgPos[1],
                    itemsPos: newItemPos,
                    playerPosY: playerPosY,
                    imageNum: currentImageNum,
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

        this.setState((prevState) => {
            let inventory = prevState.inventory;  
            inventory[currCell.content.imageName] = inventory[currCell.content.imageName] ? inventory[currCell.content.imageName] + 1 : 1;                                  
            let map = prevState.map;
            map[this.characterPos] = Cells.Empty
            return {inventory, map };                                 
        });

        return true;
    }

    async use(item: string) {
        const usables = {[Items.Key]: Environments.Door, [Items.Machete]: Environments.Bush, [Items.Trash]: Environments.Bin};
        if (Object.keys(usables).filter(usableItem => usableItem === item).length === 0) {
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
            this.setState((prevState) => {
                let inventory = prevState.inventory;
                let map = prevState.map;
                inventory[item] -= 1;
                map[this.characterPos + 1] = Cells.Empty;
                return {inventory, map}
            })
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
        if (this.props.route.params === 'tutorial') {
            const isDoneList : boolean[] = await getIsDoneList()
            isDoneList[this.props.route.params.levelNumber] = false;
            await storeIsDoneList(isDoneList);
        }
        console.log('You lost');
    }

    // Function to notify win
    onWin = async () => {
        if (this.props.route.params === 'tutorial') {
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
    
    render() {
        let arr = this.state.map.map((item: any, index: number) => {
            if (item != Cells.Empty) {
                return <MapItem key={index} item={item} position={[this.state.itemsPos[index], this.initialPlayerPosY ]} />                            
            }
        });

        return (
            <View>
                {!this.state.isStartAnimation ?
                    (<View style={{backgroundColor: "", height:"100%", width:"100%"}}>
                        <LottieView
                            source={require('../assets/lotties/loading.json')}
                            autoPlay
                            loop={true}
                        />
                    </View>) :
                    (
                        <View style={{width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>
                            {this.state.hasWon && <Overlay cameraMode={this.props.route.params.cameraMode} hasWon={true} text={this.endReason} color="green" backToSelectLevels={this.backToSelectLevels} backToLevelFailed={this.backToLevelFailed}/>}
                            {this.state.hasLost && <Overlay cameraMode={this.props.route.params.cameraMode} hasWon={false} text={this.endReason} color="red" backToSelectLevels={this.backToSelectLevels} backToLevelFailed={this.backToLevelFailed}/>}
                            <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background1} position={[this.state.bg0Pos, 0]} />
                            <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background2} position={[this.state.bg1Pos, 0]} />
                            <Character position={[0, this.state.playerPosY]} numImagesPerLine={10} image={this.images} imageNum={this.state.imageNum} maxImages={60} srcWidth={218} srcHeight={258} />
                            { arr }
                            <Inventory inventory={this.state.inventory} />
                        </View>)
                }
                <StatusBar translucent backgroundColor="transparent"/>
            </View>
        )
    }
}

export default Game;