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

        parseInit(props.route.params.visionResp).execute();
        this.engine = null;
    }

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
                    player: { position: [20, 500], isMoving: true, characterName: this.props.route.params.visionResp[0].text, renderer: <Character/> },
                }}>
                <StatusBar hidden={true} />
                </GameEngine>
            )
        }
}
