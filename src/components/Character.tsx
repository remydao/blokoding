import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {getCharacterImages} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"
import AutoHeightImage from 'react-native-auto-height-image';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

interface IProps {
    position: Array<number>
    image: number
    defaultImage: number
}

export default class Character extends Component<IProps> {

    private ratio: number;
    private defaultWidth: number;

    constructor(props: IProps) {
        super(props);

        this.defaultWidth = Image.resolveAssetSource(this.props.defaultImage).width;

        this.ratio = this.defaultWidth / EngineConstants.CELL_SIZE;
    }

    render() {
        var x = this.props.position[0];
        const y = this.props.position[1];

        const width = Image.resolveAssetSource(this.props.image).width;

        console.log(this.props.image);

        x = 0; // x + this.defaultWidth / 2 - (width / this.ratio) / 2;

        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <AutoHeightImage source={this.props.image} width={width / this.ratio}/>
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