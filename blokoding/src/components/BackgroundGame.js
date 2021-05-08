import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';

export default class BackgroundGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageSource: this.props.imgBackground,
        }
    }

    // componentDidMount() {
    //     this.setState({ imageSource: require("../assets/images/background1.jpg") })
    // }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        return (
            <View>
                <Image source={this.state.imageSource}  style={[styles.bg, {left: x, top: y, width: EngineConstants.MAX_WIDTH, height: EngineConstants.MAX_HEIGHT }]}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        position: 'absolute',
        resizeMode: 'stretch',
        zIndex: 0
    }
})