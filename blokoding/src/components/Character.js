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
        return characterImages.filter(characImg => characImg.imageName == character)[0].uri
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x}]}>
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