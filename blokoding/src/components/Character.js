import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {characterImages, getCharacterUri} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"
import AutoHeightImage from 'react-native-auto-height-image';

export default class Character extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSource: getCharacterUri(props.character)
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x}]}>
                <AutoHeightImage source={this.state.imageSource} width={EngineConstants.CELL_SIZE} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 2,
    }
})