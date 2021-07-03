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

    constructor(props: IProps) {
        super(props);
        

        const srcImage = Image.resolveAssetSource(this.props.image)
        this.ratio = (srcImage.height / 6) / (srcImage.width / 10);
    }

    getTop() {
        let top = Math.floor(this.props.imageNum / this.props.numImagesPerLine) * EngineConstants.CELL_SIZE * this.ratio;

        console.log("top: " + top);

        return top;
    }

    getLeft() {
       var tmp = (this.props.imageNum % this.props.numImagesPerLine) * EngineConstants.CELL_SIZE;
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
                <View style={{ overflow: 'hidden', width: EngineConstants.CELL_SIZE, height: EngineConstants.CELL_SIZE * this.ratio}}>
                    <AutoHeightImage source={this.props.image} style={{ marginTop: -top, marginLeft: -left}} width={EngineConstants.CELL_SIZE * 10} />
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