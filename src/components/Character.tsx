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
    image: number
}

export default class Character extends Component<IProps> {

    private width: number;
    private sprite: any;
    private play: any;

    constructor(props: IProps) {
        super(props);

        this.width = EngineConstants.CELL_SIZE * 2;
    }

    componentDidMount() {
        this.sprite.play({
            type: "jump",
            fps: 60,
            loop: true,
            resetAfterFinish: true,
        })
    }

    componentWillUnmount() {
        this.sprite.stop();
    }

    render() {
        const x = this.props.position[0] + EngineConstants.CELL_SIZE - this.width / 2;
        const y = this.props.position[1];

        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <SpriteSheet
                    ref={ref => (this.sprite = ref)}
                    source={this.props.image}
                    columns={10}
                    rows={6}
                    animations={{jump: Array.from({ length: 60 }, (v, i) => i)}}
                    width={this.width}
                />
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