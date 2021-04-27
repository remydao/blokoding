import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {characterImages} from "../constants/CharacterImages";

export default class Character extends Component {
    constructor(props){
        super(props);
        this.state= {
            imageSource:""
        }
        console.log(props.characterName)
    }

    componentDidMount(){
        this.findCharacter(this.props.characterName);
    }

    findCharacter(name){
        switch(name){
            case 'Bart':
                this.setState({imageSource:characterImages.Bart.uri});
                break;
            case 'Charlie':
                this.setState({imageSource:characterImages.Charlie.uri});
                break;
            case 'Cyclops':
                this.setState({imageSource:characterImages.Cyclops.uri});
                break;
            case 'Dinny':
                this.setState({imageSource:characterImages.Dinny.uri});
                break;
            case 'Harry':
                this.setState({imageSource:characterImages.Harry.uri});
                break;
            case 'Kevin':
                this.setState({imageSource:characterImages.Kevin.uri});
                break;
            default:
                break;
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        return (
            <View style={[styles.container, {bottom: y}]}>
                <Image source={this.state.imageSource} style={{width: EngineConstants.CELL_SIZE, resizeMode: 'contain'}} />
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