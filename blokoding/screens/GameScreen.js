import React, {Component, useRef } from 'react';
import {View, Image, Button, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Character from "../components/Character";
import BackgroundGame from "../components/BackgroundGame";
import parseInit from "../scripts/parsing/Parser";

import EngineConstants from '../constants/EngineConstants';
import { GameLoop } from '../components/GameLoop';



export default class Game extends Component {

    constructor(props) {
        super(props);

        this.engine = null;
        //this.setMove = this.setMove.bind(this);
        //this.getMove = this.getMove.bind(this);

        this.actions = parseInit(props.route.params.visionResp);
    }

  /*  setMove(i) {
        console.log(this.engine);
        //player.movePixel = i * EngineConstants.CELL_SIZE;
    }

    getMove() {
        return this.engine.player.movePixel;
    }*/

    render() {
        console.log(this.props.route.params.visionResp[0].text)
            return (
                <GameEngine
                ref={(ref) => { this.engine = ref }}
                style={{width: this.width, height: this.height, flex: 1}}
                systems={[ GameLoop ]}
                entities={{
                    background0: { position: [0, 0], renderer: <BackgroundGame/> },
                    background1: { position: [EngineConstants.MAX_WIDTH, 0], renderer: <BackgroundGame/> },
                    player: { position: [20, 500], actions: this.actions, executed: false, movePixel: 0, characterName: this.props.route.params.visionResp[0].text, renderer: <Character/> },
                }}>
                <StatusBar hidden={true} />
                </GameEngine>
            )
        }
}
