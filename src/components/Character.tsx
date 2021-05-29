import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {characterImages, getCharacterUri} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"
import AutoHeightImage from 'react-native-auto-height-image';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

interface Props {
    position: Array<number>
    character: JSX.Element
}

interface State {
    imageSource: any,
    rotationAngle: number
}

export default class Character extends Component<Props, State> {

    private coef = 1;
    constructor(props) {
        super(props);
        this.state = {
            imageSource: getCharacterUri(this.props.character),
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