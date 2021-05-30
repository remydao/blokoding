import React, { Component } from 'react';
import { View, StatusBar} from 'react-native';
import BackgroundGame from "../components/BackgroundGame";
import Character from "../components/Character";
import EngineConstants from '../constants/EngineConstants';
import { MoveBlock, JumpBlock, GrabBlock } from '../scripts/blocks/ActionBlock';
import { Characters, Environments, Items } from '../constants/BlockType';
import { ForBlock, IfBlock, WhileBlock } from '../scripts/blocks/InstructionBlock';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import { DataBlock } from '../scripts/blocks/DataBlock';
import MapItem from '../components/MapItem'
import Inventory from '../components/Inventory';
import { ConditionBlock } from '../scripts/blocks/MainBlocks';
import { IsInFrontBlock, IsOnBlock } from '../scripts/blocks/ConditionBlock';
import MapItems from "../constants/MapItems"
import Overlay from '../components/Overlay';
import { CameraMode } from '../constants/CameraMode';
import Cells from '../constants/Cells';
import { isItem } from '../constants/ItemImages';

interface IProps {
    navigation: any,
    route: any
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
    private actions: any

    constructor(props: IProps) {
        super(props);
        this.state = {
            bg0Pos: 0,
            bg1Pos: EngineConstants.MAX_WIDTH,
            playerPosY: EngineConstants.MAX_HEIGHT * 0.15,
            map: [...props.route.params.mapInfo.map],
            itemsPos: props.route.params.mapInfo.map.map((item: any, index: number) => EngineConstants.CELL_SIZE * index),
            hasLost: false,
            hasWon: false,
            inventory: {},
        };

        if (props.route.params.cameraMode == CameraMode.TEST) {
            // this.actions = new CharacterBlock(new MoveBlock(new MoveBlock(new MoveBlock(new MoveBlock(new JumpBlock(new MoveBlock(new MoveBlock(null))))))), Characters.Kevin);
            //this.actions = new CharacterBlock(new ForBlock(null, new MoveBlock(new IfBlock(null, new GrabBlock(null), new IsOnBlock(new DataBlock(Items.Key)))), new DataBlock(10)), Characters.Harry);
            //this.actions = new CharacterBlock(new WhileBlock(null, new MoveBlock(null), new IsInFrontBlock(new DataBlock(Environments.Bush))), Characters.Bart)
            // this.actions = new CharacterBlock(new ForBlock(null, new IfBlock(null, new MoveBlock(null), new IsInFrontBlock(new DataBlock("buisson"))), new DataBlock(20)), Characters.Bart)
            // this.actions = new CharacterBlock(new MoveBlock(new GrabBlock(new MoveBlock(new MoveBlock(new GrabBlock(new MoveBlock(new MoveBlock(null))))))), Characters.Kevin);
            this.actions = new CharacterBlock(new WhileBlock(null, new JumpBlock(null), new IsInFrontBlock(new DataBlock(Environments.Puddle))), Characters.Kevin);
            //this.actions = new CharacterBlock(new MoveBlock(new GrabBlock(new MoveBlock(new MoveBlock(new GrabBlock(new MoveBlock(new MoveBlock(null))))))), Characters.Kevin);
        } else {
            this.actions = props.route.params.actions;
            console.log(this.actions);
        }
    }

    async componentDidMount() {
        await this.actions.execute(this);

        if (this.state.map[this.characterPos] != Cells.Win) {
            console.log(this.state.map[this.characterPos])
            this.setState({hasWon: false});
            this.setState({hasLost: true});
            this.loose();
        }
    }

    // function that check user's win or loss
    async checkState() {
        return await new Promise<void>((resolve) => {
            switch (this.state.map[this.characterPos]) {
                case Cells.Win:
                    console.log("win")
                    this.setState({hasWon: true});
                    this.win();
                    break;
                case Cells.Puddle:
                    this.setState({hasLost: true});
                    this.loose();
                    break;
                default:
                    break;
            }
            resolve()
        })
        
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
            // console.log("Reset FPS ->")
        }

        this.speed = EngineConstants.MAX_WIDTH * this.timePassed * 0.0002;

        // console.log("this.timePassed: " + this.timePassed + "  currTicks: " + currentTicks + "  targetTicks: " + targetTicks, "  this.frameDelay: " + this.frameDelay);
    }

    // Method to move the character (used in ActionBlock.js)
    async move() {
        this.moveDistance =  0
        
        var self = this;

        return await new Promise<void>(resolve => {
            movePos();

            function movePos() {
                self.setFramerateDelay();

                var newItemPos = self.moveItems();
                var newBgPos = self.moveBackground();

                self.moveDistance += self.speed;

                self.setState({
                    bg0Pos: newBgPos[0],
                    bg1Pos: newBgPos[1],
                    itemsPos: newItemPos,
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
    async jump() {
        this.moveDistance = 0;

        var self = this;

        return await new Promise<void>(resolve => {
            jumpPos();

            function jumpPos() {
                self.setFramerateDelay();

                var newItemPos = self.moveItems();
                var newBgPos = self.moveBackground();
                var playerPosY = self.moveCharacUpDown();

                self.moveDistance += self.speed;

                self.setState({
                    bg0Pos: newBgPos[0],
                    bg1Pos: newBgPos[1],
                    itemsPos: newItemPos,
                    playerPosY: playerPosY,
                })

                if (self.moveDistance >= EngineConstants.CELL_SIZE * 2) {
                    self.characterPos += 2;
                    resolve();
                }
                else {
                    setTimeout(jumpPos, self.frameDelay);
                }      
            }
        });
    }

    grab() {
        var currCell = this.state.map[this.characterPos];

        if (currCell == Cells.Empty || !isItem(currCell.content.imageName)) {
            this.setState({
                hasLost: true
            });
            console.log("grab failed");
            return false;
        }
            

        this.setState((prevState) => {
            let inventory = Object.assign({}, prevState.inventory);  
            inventory[currCell.content.imageName] = inventory[currCell.content.imageName] ? inventory[currCell.content.imageName] + 1 : 1;                                  
            let newMap = prevState.map;
            newMap[this.characterPos] = Cells.Empty
            return {...prevState, inventory, newMap };                                 
        });

        return true;
    }

    // Function for jump translation
    moveCharacUpDown = () => {
        if (this.moveDistance <= EngineConstants.CELL_SIZE) {
            let acc = 1 - this.moveDistance / EngineConstants.CELL_SIZE;
            return this.state.playerPosY + this.speed * 2 * acc;
        } else {
            let acc = this.moveDistance / EngineConstants.CELL_SIZE - 1;
            return this.state.playerPosY - this.speed * 2 * acc;
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
    loose() {
        console.log('You lost');
    }

    // Function to notify win
    win() {
        console.log('You won');
    }

    // return true if character is in front of an entity(data block)
    isInFrontOf(entity: string) {
        let res = Object.entries(Environments).filter(env => env[1] == entity);
        return res && res[0] && this.state.map[this.characterPos + 1].content && this.state.map[this.characterPos + 1].content.imageName == res[0][1];
    }

    // return true if character is on an entity(data block)
    isOn(entity: string) {
        let res = Object.entries(Items).filter(item => item[1] == entity);
        return res && res[0] && this.state.map[this.characterPos].content && this.state.map[this.characterPos].content.imageName == res[0][1];
    }

    backToSelectLevels = () : void => {
        this.props.navigation.pop();
        this.props.navigation.pop();
        this.props.navigation.pop();
    }

    backToLevelFailed = () : void => {
        this.props.navigation.pop();
        this.props.navigation.pop();
    }
    
    render() {
        let arr = this.state.map.map((item: any, index: number) => {
            if (item != Cells.Empty) {
                return <MapItem key={index} item={item} position={[this.state.itemsPos[index], EngineConstants.MAX_HEIGHT * 0.15 ]} />                            
            }
        });

        return (
            <View style={{width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>
                { this.state.hasWon && <Overlay cameraMode={this.props.route.params.cameraMode} hasWon={true} text="Niveau réussi, Bravo !" color="green" backToSelectLevels={this.backToSelectLevels} backToLevelFailed={this.backToLevelFailed}/> }
                { this.state.hasLost && <Overlay cameraMode={this.props.route.params.cameraMode} hasWon={false} text="Perdu, tu n'as pas atteint la ligne d'arrivée" color="red" backToSelectLevels={this.backToSelectLevels} backToLevelFailed={this.backToLevelFailed}/> }
                <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background1} position={[this.state.bg0Pos, 0]} />
                <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background2} position={[this.state.bg1Pos, 0]} />
                <Character position={[0, this.state.playerPosY]} character={this.actions.character} />
                { arr }
                <Inventory inventory={this.state.inventory} />
                <StatusBar translucent backgroundColor="transparent"/>
            </View>
        )
    }
}

export default Game;