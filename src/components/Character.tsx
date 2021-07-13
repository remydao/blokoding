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
    image: any
    spriteSheet: SpriteSheet
}

export default class Character extends Component<IProps> {

    private width: number;
    private sprite: any;
    private lastAnim: string;

    constructor(props: IProps) {
        super(props);

        this.width = EngineConstants.CELL_SIZE * 2;
        this.lastAnim = "";
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // this.sprite.stop();
    }

    render() {
        const x = this.props.position[0] + EngineConstants.CELL_SIZE - this.width / 2;
        const y = this.props.position[1];

        
        
        return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                { this.props.spriteSheet }
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