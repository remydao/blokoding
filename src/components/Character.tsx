import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import FastImage from 'react-native-fast-image';
import {getCharacterImages} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"
import AutoHeightImage from 'react-native-auto-height-image';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import ImageSize from 'react-native-image-size'

interface IProps {
    position: Array<number>
    imageUri: string
    imageUriLoaded: number
    imageNum: number
    maxImages: number
    numImagesPerLine: number
}

export default class Character extends Component<IProps> {

    private ratio: number;
    private width: number;
    private height: number;

    constructor(props: IProps) {
        super(props);

        var imageWidth = 0;
        var imageHeight = 0;

        console.log(this.props.imageUri);

        const image = Image.resolveAssetSource(this.props.imageUriLoaded);
        imageWidth = image.width;
        imageHeight = image.height;
    

        console.log("w: " + imageWidth);
        console.log("h: " + imageHeight);

        this.ratio = (imageHeight / 6) / (imageWidth / 10);

        this.width = EngineConstants.CELL_SIZE * 2;
        this.height = this.width * this.ratio;

        console.log(this.width);
    }

    getTop() {
        let top = Math.floor(this.props.imageNum / this.props.numImagesPerLine) * this.height;
        // console.log("top: " + top);
        return top;
    }

    getLeft() {
        var tmp = (this.props.imageNum % this.props.numImagesPerLine) * this.width;
        // console.log("left: " + tmp)
        return tmp;
    }

    render() {
        const x = this.props.position[0] + EngineConstants.CELL_SIZE - this.width / 2;
        const y = this.props.position[1];
        
        let top = this.getTop();
        let left = this.getLeft();

        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <View style={{ overflow: 'hidden', width: this.width, height: this.height}}>
                    <FastImage source={this.props.imageUriLoaded} style={{ marginTop: -top, marginLeft: -left, width: this.width * 10, height: this.height * 6}}  />
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