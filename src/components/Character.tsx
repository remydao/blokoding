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

    private ratio: number;
    private width: number;
    private height: number;

    constructor(props: IProps) {
        super(props);

        const srcImage = Image.resolveAssetSource(this.props.image)
        this.ratio = (srcImage.height / 6) / (srcImage.width / 10);

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
        const x = this.props.position[0] + EngineConstants.CELL_SIZE / 2 - this.width / 2;
        const y = this.props.position[1];
        

        let top = this.getTop();
        let left = this.getLeft();

        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <View style={{ overflow: 'hidden', width: this.width, height: this.height}}>
                    <Image source={this.props.image} style={{ marginTop: -top, marginLeft: -left, width: this.width * 10, height: this.height * 6}}  />
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