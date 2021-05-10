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
        return Object.entries(characterImages).filter(characImg => characImg[1].imageName == character)[0][1].uri
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x}]}>
                <Image source={this.state.imageSource} style={styles.image} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 2,
        
    },
    image: {
        width: EngineConstants.CELL_SIZE, 
        resizeMode: 'contain'
    }
})