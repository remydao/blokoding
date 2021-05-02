import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BackgroundGame from "../components/BackgroundGame";
import Character from "../components/Character";
import EngineConstants from '../constants/EngineConstants';
import { MoveBlock, JumpBlock } from '../scripts/blocks/ActionBlock';
import ForBlock from '../scripts/blocks/InstructionBlock';
import { Characters } from '../constants/BlockType';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import { DataBlock } from '../scripts/blocks/DataBlock';
import parseInit from '../scripts/parsing/Parser'
import MapItem from '../components/MapItem'


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg0Pos: 0,
            bg1Pos: EngineConstants.MAX_WIDTH,
            playerPosY: EngineConstants.MAX_HEIGHT * 0.15,
            character: '',
            mapBackground: props.route.params.mapInfo.background,
            mapItems: props.route.params.mapInfo.map,
            itemsPos: props.route.params.mapInfo.map.map((item, index) => EngineConstants.CELL_SIZE * index)
        };
        if (props.route.params.isTesting) {
            this.actions = new CharacterBlock(new ForBlock(new JumpBlock(null), new MoveBlock(null), new DataBlock(5)), Characters.Kevin);
        } else {
            this.actions = props.route.params.actions;
            console.log(this.actions);
        }
        this.speed = EngineConstants.MAX_WIDTH * 0.015;
    }

    componentDidMount() {
        this.actions.execute(this);
    }

    setCharacter(character) {
        this.setState({character: character});
    }

    async move() {
        this.setState({moveDistance: 0});
        return await new Promise(resolve => {
            let interval = setInterval(() => {
                this.moveItems();
                this.moveBackground();
                this.setState({moveDistance: this.state.moveDistance + this.speed})
                if (this.state.moveDistance > EngineConstants.CELL_SIZE) {
                    clearInterval(interval);
                    resolve();
                }
            }, 15)
        });
    }

    async jump() {
        this.setState({moveDistance: 0});
        return await new Promise(resolve => {
            let interval = setInterval(() => {
                this.moveItems();
                this.moveBackground();
                this.moveCharacUpDown();
                this.setState({moveDistance: this.state.moveDistance + this.speed})

                if (this.state.moveDistance > EngineConstants.CELL_SIZE * 2) {
                    clearInterval(interval);
                    resolve();
                }
            }, 15)
        });
    }

    moveCharacUpDown = () => {
        if (this.state.moveDistance <= EngineConstants.CELL_SIZE) {
            let acc = 1 - this.state.moveDistance /  EngineConstants.CELL_SIZE;
            this.setState({playerPosY: this.state.playerPosY + this.speed * 2 * acc});
        } else {
            let acc = this.state.moveDistance / EngineConstants.CELL_SIZE - 1;
            this.setState({playerPosY: this.state.playerPosY - this.speed * 2 * acc});
        }
    }

    moveBackground = () => {

        let newBg0Pos = this.state.bg0Pos - this.speed;
        if (newBg0Pos + EngineConstants.MAX_WIDTH < 0)
            newBg0Pos += EngineConstants.MAX_WIDTH * 2;

        let newBg1Pos = this.state.bg1Pos - this.speed;
        if (newBg1Pos + EngineConstants.MAX_WIDTH < 0)
            newBg1Pos += EngineConstants.MAX_WIDTH * 2;
        
        this.setState({bg0Pos: newBg0Pos, bg1Pos: newBg1Pos});
    }

    moveItems = () => {
        let newItemPos = [];
        for (let item of this.state.itemsPos)
            newItemPos.push(item - this.speed);

        this.setState({itemsPos: newItemPos});
    }

    
    render() {
        this.arr = this.state.mapItems.map((item, index) => {
            if (item !== "e") {
                return <MapItem key={index} itemName={item} position={[this.state.itemsPos[index], EngineConstants.MAX_HEIGHT * 0.15 ]} />                            
            }
        });

        return (
            <View style={{width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>
                <BackgroundGame imgBackground={this.state.mapBackground} position={[this.state.bg0Pos, 0]} />
                <BackgroundGame imgBackground={this.state.mapBackground} position={[this.state.bg1Pos, 0]} />
                <Character position={[0, this.state.playerPosY]} character={this.actions.character} />
                { this.arr }
            </View>
        )
    }
}

export default Game;