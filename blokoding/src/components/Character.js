import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import {characterImages} from "../constants/CharacterImages";
import { Characters } from "../constants/BlockType"

export default class Character extends Component {
    constructor(props){
        super(props);
        this.state= {
            imageSource: ''
        }
        console.log(props.character)
        
    }

    componentDidMount() {
        this.findCharacter(this.props.character)
    }

    findCharacter(character){
        switch(character){
            case Characters.Bart:
                this.setState({imageSource:characterImages.Bart.uri});
                break;
            case Characters.Charlie:
                this.setState({imageSource:characterImages.Charlie.uri});
                break;
            case Characters.Cyclops:
                this.setState({imageSource:characterImages.Cyclops.uri});
                break;
            case Characters.Dinny:
                this.setState({imageSource:characterImages.Dinny.uri});
                break;
            case Characters.Harry:
                this.setState({imageSource:characterImages.Harry.uri});
                break;
            case Characters.Kevin:
                this.setState({imageSource:characterImages.Kevin.uri});
                break;
            default:
                break;
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        // if (this.state.imageSource == '')
        //     this.findCharacter(this.props.character);

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