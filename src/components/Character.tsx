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
    imageNum: number
    maxImages: number
    numImagesPerLine: number
    srcWidth: number
    srcHeight: number
}

export default class Character extends Component<IProps> {

    // private ratio: number;

    constructor(props: IProps) {
        super(props);

        // this.ratio = this.props.srcSize / EngineConstants.CELL_SIZE;
    }

    getTop() {
        let top = Math.floor(this.props.imageNum / this.props.numImagesPerLine) * this.props.srcHeight;

        console.log("top: " + top);

        return top;
    }

    getLeft() {
       var tmp = (this.props.imageNum % this.props.numImagesPerLine) * this.props.srcWidth;
       console.log("left: " + tmp)
       return tmp;
    }

    render() {
        var x = this.props.position[0];
        const y = this.props.position[1];
        
        x = 0; // x + this.defaultWidth / 2 - (width / this.ratio) / 2;

        let top = this.getTop();
        let left = this.getLeft();

        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <View style={{ overflow: 'hidden', width: this.props.srcWidth, height: this.props.srcHeight}}>
                    <Image source={this.props.image} style={{ marginTop: -top, marginLeft: -left}} />
                </View>
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