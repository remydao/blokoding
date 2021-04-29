import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import MapItems from '../constants/BlockType';
import EngineConstants from '../constants/EngineConstants';


export default class MapItem extends Component {

    constructor(props){
        super(props);
        this.state= {
            imageSource:""
        }
    }

    componentDidMount(){
        this.findItem(this.props.itemName);
    }

    findItem(item){
        switch(item){
            case 'w':
                this.setState({imageSource: "../assets/MapItems/water.png"});
                break;
            default:
                break;
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];

        return (
            <View style={[styles.container, {bottom: y, left: x}]}>
                <Image source={this.state.imageSource} style={{width: EngineConstants.CELL_SIZE, resizeMode: 'contain'}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 3,
    },
})
