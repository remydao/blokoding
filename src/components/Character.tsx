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
    anim: string
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
        this.sprite.stop();
    }

    render() {
        const x = this.props.position[0] + EngineConstants.CELL_SIZE - this.width / 2;
        const y = this.props.position[1];

        if (this.lastAnim !== this.props.anim && this.sprite) {
            this.sprite.play({
                type: this.props.anim,
                fps: 60,
                loop: true,
                resetAfterFinish: true,
            })

            this.lastAnim = this.props.anim;
        }

        var anims = Object.entries(this.props.image).filter(anim => anim[0] === this.props.anim);
        
        if (anims.length > 0) {
            console.log(anims)
            console.log(anims[0])
            return (
            <View style={[styles.container, { bottom: y, left: x }]}>
                <SpriteSheet
                    ref={ref => (this.sprite = ref)}
                    source={anims[0][1][0]}
                    columns={9}
                    rows={7}
                    animations={{ [this.props.anim]: Array.from({ length: 60 }, (v, i) => i)}}
                    width={this.width}
                />
            </View>
            )
        }
        else
            return null;
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 2,
    },
})