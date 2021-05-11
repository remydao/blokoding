import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';

export default class Overlay extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style= {[styles.overlay_container]}>
                <Text style={[styles.textStyle, {color: this.props.color}]}>{this.props.text}</Text>
                <View style={[styles.overlay]}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
        zIndex: 3,
        justifyContent: 'center'
    },
    overlay_container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
        zIndex: 4,
        justifyContent: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        opacity: 10,
        zIndex: 4,
    }
})