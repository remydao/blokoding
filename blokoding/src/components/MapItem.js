import React, {Component} from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import MapItems from '../constants/BlockType';
import EngineConstants from '../constants/EngineConstants';


export default class MapItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSource: this.findItem(props.itemName)
        }
    }

    findItem(item) {
        switch(item) {
            case 'w':
                return require("../assets/MapItems/water.png");
            case 'b':
                return require("../assets/MapItems/buisson.png");
        }
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x}]}>
                <Image source={this.state.imageSource} style={styles.image} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1,
    },
    image: {
        width: EngineConstants.CELL_SIZE, 
        resizeMode: 'contain'
    }
})
