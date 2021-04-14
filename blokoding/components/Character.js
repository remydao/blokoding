import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import {characterImages} from "../constants/CharacterImages";

export default class Character extends Component {
    constructor(props){
        super(props);
        this.state= {
            imageSource:""
        }
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
        }
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        return (
            <View style={[styles.container, {left: x, top: y}]}>
                <Image source={this.state.imageSource} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        position:"absolute",
        height: 120,
        width: 100,
        zIndex:2,
    },
    background:{
        flex:1,
        resizeMode:'cover',
        backgroundColor:"red"
    }
})