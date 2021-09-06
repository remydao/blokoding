import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {getCharacterImages} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"
import AutoHeightImage from 'react-native-auto-height-image';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import SpriteSheet from 'rn-sprite-sheet';


interface IProps {
    position: Array<number>
    sourceImage: any
    columns: number
    rows: number
    numSpritesInSpriteSheet: number
}

export default class Character extends Component<IProps> {

    private width: number;
    private spriteSheet: SpriteSheet;
    constructor(props: IProps) {
        super(props);

        this.width = EngineConstants.CELL_SIZE * 2;
    }

    componentDidMount() {
        this.spriteSheet.play({
            type: "anim",
            fps: 60,
            loop: true,
            resetAfterFinish: false,
        });
    }

    componentWillUnmount() {
        this.spriteSheet.stop();
    }

    render() {
        const x = this.props.position[0] + EngineConstants.CELL_SIZE - this.width / 2;
        const y = this.props.position[1];

        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <SpriteSheet
                    ref={ref => {this.spriteSheet = ref}}
                    source={this.props.sourceImage}
                    columns={this.props.columns}
                    rows={this.props.rows}
                    animations={{ "anim": Array.from({ length: this.props.numSpritesInSpriteSheet }, (v, i) => i)}}
                    width={EngineConstants.CELL_SIZE * 2}/>
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