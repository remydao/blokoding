import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {characterImages, getCharacterUri} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"
import AutoHeightImage from 'react-native-auto-height-image';

export default class Character extends Component {
    constructor(props) {
        super(props);
        this.coef = 1;
        this.state = {
            imageSource: getCharacterUri(props.character),
            rotationAngle: 0,
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps != this.props){
            if (this.state.rotationAngle == 10){
                this.coef = -1;
            }
            else if (this.state.rotationAngle == -10){
                this.coef = 1;
            }
            this.setState({
                rotationAngle: this.state.rotationAngle + this.coef
            })
            
        }
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x, transform: [{ rotate: `${this.state.rotationAngle.toString()}deg` }]}]}>
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