import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BackgroundGame from "../components/BackgroundGame";
import Character from "../components/Character";
import EngineConstants from '../constants/EngineConstants';
import { MoveBlock, JumpBlock } from '../scripts/blocks/ActionBlock';
import { Characters, Items } from '../constants/BlockType';
import { ForBlock, IfBlock } from '../scripts/blocks/InstructionBlock';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import { DataBlock } from '../scripts/blocks/DataBlock';
import parseInit from '../scripts/parsing/Parser'
import MapItem from '../components/MapItem'
import Inventory from '../components/Inventory';
import { ConditionBlock } from '../scripts/blocks/MainBlocks';
import { IsInFrontBlock, IsOnBlock } from '../scripts/blocks/ConditionBlock';
import MapItems from "../constants/MapItems";
import Overlay from '../components/Overlay';


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg0Pos: 0,
            bg1Pos: EngineConstants.MAX_WIDTH,
            playerPosY: EngineConstants.MAX_HEIGHT * 0.15,
            mapItems: props.route.params.mapInfo.map,
            itemsPos: props.route.params.mapInfo.map.map((item, index) => EngineConstants.CELL_SIZE * index),
            characterPos: 0,
            hasLost: false,
            hasWon: false,
            inventory: {[Items.Key]: 1, [Items.Flower]: 1},
        };
        if (props.route.params.isTesting) {
            //this.actions = new CharacterBlock(new MoveBlock(new MoveBlock(new MoveBlock(new MoveBlock(new JumpBlock(new MoveBlock(new MoveBlock(null))))))), Characters.Kevin);
            this.actions = new CharacterBlock(new ForBlock(null, new MoveBlock(null), new DataBlock(10)), Characters.Kevin);
            //this.actions = new CharacterBlock(new ForBlock(null, new IfBlock(null, new MoveBlock(null), new IsOnBlock(new DataBlock("buisson"))), new DataBlock(20)), Characters.Bart)
            //this.actions = new CharacterBlock(new MoveBlock(new MoveBlock(new MoveBlock(new MoveBlock(new JumpBlock(new MoveBlock(new MoveBlock(null))))))), Characters.Kevin);
        } else {
            this.actions = props.route.params.actions;
            console.log(this.actions);
        }
        this.speed = EngineConstants.MAX_WIDTH * 0.008;
        this.lastTicks = Date.now();
    }

    componentDidMount() {
        this.actions.execute(this);
    }

    // function that check user's win or loss
    // return -1 if lose, 0 if nothing, 1 if win
    checkState() {
        switch (this.state.mapItems[this.state.characterPos]) {
            case 'W':
                this.setState({hasWon: true});
                this.win();
                break;
            case 'w':
                this.setState({hasLost: true});
                this.loose();
                break;
            default:
                break;
        }
    }

    // Getter of hasLost state
    getStateHasLost(){
        return this.state.hasLost;
    }

    // Getter of hasWon state
    getStateHasWon(){
        return this.state.hasWon;
    }

    // General function to move the character (used in ActionBlock.js)
    async move() {
        this.setState({moveDistance: 0});

        var tmp = this.lastTicks;
        this.lastTicks = Date.now();

        return await new Promise(resolve => {
            let interval = setInterval(() => {
                this.moveItems();
                this.moveBackground();
                this.setState({moveDistance: this.state.moveDistance + this.speed})
                if (this.state.moveDistance > EngineConstants.CELL_SIZE) {
                    clearInterval(interval);
                    this.setState({characterPos: this.state.characterPos + 1});
                    resolve();
                }
            },  16 - (this.lastTicks - tmp))
        });
    }

    // General function to jump the character (used in ActionBlock.js)
    async jump() {
        this.setState({moveDistance: 0});

        var tmp = this.lastTicks;
        this.lastTicks = Date.now();

        return await new Promise(resolve => {
            let interval = setInterval(() => {
                this.moveItems();
                this.moveBackground();
                this.moveCharacUpDown();
                this.setState({moveDistance: this.state.moveDistance + this.speed})

                if (this.state.moveDistance > EngineConstants.CELL_SIZE * 2) {
                    clearInterval(interval);
                    this.setState({characterPos: this.state.characterPos + 2});
                    resolve();
                }
            }, 16 - (this.lastTicks - tmp))
        });
    }

    grab(item) {
        this.setState(prevState => {
            let inventory = Object.assign({}, prevState.inventory);  
            inventory[item] += 1;                                  
            return { inventory };                                 
        });
    }

    // Function for jump translation
    moveCharacUpDown = () => {
        if (this.state.moveDistance <= EngineConstants.CELL_SIZE) {
            let acc = 1 - this.state.moveDistance /  EngineConstants.CELL_SIZE;
            this.setState({playerPosY: this.state.playerPosY + this.speed * 2 * acc});
        } else {
            let acc = this.state.moveDistance / EngineConstants.CELL_SIZE - 1;
            this.setState({playerPosY: this.state.playerPosY - this.speed * 2 * acc});
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
        
        this.setState({bg0Pos: newBg0Pos, bg1Pos: newBg1Pos});
    }

    // Function for move translation of all the items in the map
    moveItems = () => {
        let newItemPos = [];
        for (let item of this.state.itemsPos)
            newItemPos.push(item - this.speed);

        this.setState({itemsPos: newItemPos});
    }

    // Function to notify loose
    loose() {
        console.log('You have lost');
    }

    // Function to notify win
    win() {
        console.log('You have won');
    }

    // return true if character is in front of an entity(data block)
    isInFrontOf(entity) {
        let res = Object.entries(MapItems).filter(mapItem => mapItem[0] == entity);
        return res && res[0] && this.state.mapItems[this.state.characterPos + 1] === res[0][1];
    }

    // return true if character is on an entity(data block)
    isOn(entity) {
        let res = Object.entries(MapItems).filter(mapItem => mapItem[0] == entity);
        return res && res[0] && this.state.mapItems[this.state.characterPos] === res[0][1];
    }
    
    render() {
        this.arr = this.state.mapItems.map((item, index) => {
            if (item == "w" || item == "b" || item == "W") {
                return <MapItem key={index} itemName={item} position={[this.state.itemsPos[index], EngineConstants.MAX_HEIGHT * 0.15 ]} />                            
            }
        });

        return (
            <View style={{width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>
                { this.state.hasLost && <Overlay text="You have lost" color="red"/>}
                { this.state.hasWon && <Overlay text="You have won" color="white"/>}
                <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background1} position={[this.state.bg0Pos, 0]} />
                <BackgroundGame imgBackground={this.props.route.params.mapInfo.theme.background2} position={[this.state.bg1Pos, 0]} />
                <Character position={[0, this.state.playerPosY]} character={this.actions.character} />
                { this.arr }
                <Inventory inventory={this.state.inventory} />
            </View>
        )
    }
}

export default Game;