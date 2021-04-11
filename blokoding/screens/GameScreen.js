import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Character from "../components/Character";
import BackgroundGame from "../components/BackgroundGame";

export default class Game extends Component {

    constructor(props) {
        super(props);
    
        console.log(this.props.route.params.visionResp[0].text)
    }

    render(){
        return (
            <GameEngine
                style={{flex:1}}
                systems={[]}
                entities={{
                    1: { position: [0,0], renderer: <BackgroundGame/> },
                    2: { position: [0, 500], characterName:this.props.route.params.visionResp[0].text, renderer: <Character/> },
                }}>
            <StatusBar hidden={true} />
            </GameEngine>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})