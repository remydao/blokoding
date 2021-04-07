import React from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import {characterImages} from "../constants/CharacterImages";
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine"

class Game extends Component {
    render(){
        
        let imageSource = "";
        function findCharacter(name){
            switch(name){
                case 'Bart':
                    imageSource = characterImages.Bart.uri;
                    break;
                case 'Charlie':
                    imageSource = characterImages.Charlie.uri;
                    break;
                case 'Cyclops':
                    imageSource = characterImages.Cyclops.uri;
                    break;
                case 'Dinny':
                    imageSource = characterImages.Dinny.uri;
                    break;
                case 'Harry':
                    imageSource = characterImages.Harry.uri;
                    break;
                case 'Kevin':
                    imageSource = characterImages.Kevin.uri;
                    break;
            }
        }
        findCharacter(this.props.route.params.visionResp[0].text);

        
        return (
            <GameEngine style={{ width: 800, height: 600, backgroundColor: "blue" }}
                entities={{
                    initialBox: {
                        body: initialBox, 
                        size: [200, 200], 
                    }
                }}>
            <StatusBar hidden={true} />
            </GameEngine>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
})

export default Game;