import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BackgroundGame from "../components/BackgroundGame";
import Character from "../components/Character";
import EngineConstants from '../constants/EngineConstants';
import { MoveBlock, JumpBlock } from '../scripts/blocks/ActionBlock';
import ForBlock from '../scripts/blocks/InstructionBlock';
import { Characters } from '../constants/BlockType';
import CharacterBlock from '../scripts/blocks/CharacterBlock';
import { DataBlock } from '../scripts/blocks/DataBlock';
import parseInit from '../scripts/parsing/Parser'


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bg0Pos: 0,
            bg1Pos: EngineConstants.MAX_WIDTH,
            playerPosY: EngineConstants.MAX_HEIGHT * 0.15
        };
        if (props.route.params.isTesting) {
            this.actions = new CharacterBlock(new ForBlock(new JumpBlock(null), new MoveBlock(null), new DataBlock(5)), Characters.Kevin);
        } else {
            this.actions = parseInit(props.route.params.visionResp);
        }
        this.speed = EngineConstants.MAX_WIDTH * 0.01;
    }

    componentDidMount() {
        console.log(EngineConstants.MAX_WIDTH);
        this.actions.execute(this);
    }

    async move(nextBlock) {
        this.setState({moveDistance: 0});
        
        let interval = setInterval(() => {
            this.moveBackground()
            this.setState({moveDistance: this.state.moveDistance + this.speed})
            if (this.state.moveDistance > EngineConstants.CELL_SIZE) {
                clearInterval(interval);
            }
        }, 15);

        return await new Promise(resolve => setTimeout(resolve, 15 * (EngineConstants.CELL_SIZE / this.speed + 10)));
    }

    async jump(nextBlock) {
        this.setState({moveDistance: 0});
        let interval = setInterval(() => {
            this.moveBackground();
            if (this.state.moveDistance <= EngineConstants.CELL_SIZE / 2) {
                let acc = 1 - this.state.moveDistance / (EngineConstants.CELL_SIZE / 2);
                this.setState({playerPosY: this.state.playerPosY + this.speed + this.speed * acc});
            } else {
                let acc = this.state.moveDistance / (EngineConstants.CELL_SIZE / 2) - 1;
                this.setState({playerPosY: this.state.playerPosY - this.speed - this.speed * acc});
            }

            this.setState({moveDistance: this.state.moveDistance + this.speed})

            if (this.state.moveDistance > EngineConstants.CELL_SIZE) {
                clearInterval(interval);
            }
        }, 15);


        return await new Promise(resolve => setTimeout(resolve, 15 * (EngineConstants.CELL_SIZE / this.speed + 10)));
    }

    moveBackground = () => {

        let newBg0Pos = this.state.bg0Pos - this.speed;
        if (newBg0Pos + EngineConstants.MAX_WIDTH < 0)
            newBg0Pos += EngineConstants.MAX_WIDTH * 2;

        let newBg1Pos = this.state.bg1Pos - this.speed;
        if (newBg1Pos + EngineConstants.MAX_WIDTH < 0)
            newBg1Pos += EngineConstants.MAX_WIDTH * 2;
        
        this.setState({bg0Pos: newBg0Pos, bg1Pos: newBg1Pos})
    }

    render() {
        return (
            <View style={{width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT}}>
                <BackgroundGame position={[this.state.bg0Pos, 0]} />
                <BackgroundGame position={[this.state.bg1Pos, 0]} />
                <Character position={[0, this.state.playerPosY]} characterName='Bart' />
            </View>
        )
    }
}

export default Game;