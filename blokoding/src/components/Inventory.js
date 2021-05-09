import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Environments } from "../constants/BlockType";
import EngineConstants from "../constants/EngineConstants";

export default class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSource: require('../assets/characters/Cyclops/1x/Cyclops.png')
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Image source={this.state.imageSource} style={styles.image} />
                <Image source={this.state.imageSource} style={styles.image} />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        position: 'absolute',
        top: 0,
        right: 0,
        width: EngineConstants.CELL_SIZE / 2,
        zIndex: 1,
    },
    image: {
        width: EngineConstants.CELL_SIZE / 4,
        height: EngineConstants.CELL_SIZE / 4,
        //resizeMode: 'contain'
    }
})