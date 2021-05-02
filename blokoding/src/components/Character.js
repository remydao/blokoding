import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {characterImages} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"

export default class Character extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSource: this.findCharacter(props.character)
        }
    }

    findCharacter(character){
        switch(character){
            case Characters.Bart:
                return characterImages.Bart.uri;
            case Characters.Charlie:
                return characterImages.Charlie.uri;
            case Characters.Cyclops:
                return characterImages.Cyclops.uri;
            case Characters.Dinny:
                return characterImages.Dinny.uri;
            case Characters.Harry:
                return characterImages.Harry.uri;
            case Characters.Kevin:
                return characterImages.Kevin.uri;
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y}]}>
                <Image source={this.state.imageSource} style={{width: EngineConstants.CELL_SIZE, resizeMode: 'contain'}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 2,
        
    },
})