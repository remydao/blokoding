import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';

interface Props {
    imgBackground: any,
    position: object,
}

interface State {
    imageSource: any
}

export default class BackgroundGame extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            imageSource: this.props.imgBackground,
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        return (
            <View>
                <Image source={this.state.imageSource}  style={[styles.bg, {left: x, top: y}]}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        resizeMode: 'stretch',
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
        zIndex: 0
    }
})