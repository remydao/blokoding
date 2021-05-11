import React, {Component} from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image';
import MapItems from '../constants/BlockType';
import EngineConstants from '../constants/EngineConstants';
import EnvironmentImages from '../constants/EnvironmentImages';


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
                return EnvironmentImages.Puddle.uri;
            case 'b':
                return EnvironmentImages.Bush.uri;
        }
    }

    render() {
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x}]}>
                <AutoHeightImage source={this.state.imageSource} width={EngineConstants.CELL_SIZE} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 1,
    }
})
