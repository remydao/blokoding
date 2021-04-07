import React from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import {characterImages} from "../constants/CharacterImages";

const SelectCharacter = ({navigation, route}) => {

    let imageSource = "";
    function findCharacter(name){
        switch(name){
            case 'Bart':
                imageSource = characterImages.Bart.uri;
                break;
            case 'Charlie':
                imageSource = characterImages.Charlie.uri;
                break;
            case 'Cyclops':
                imageSource = characterImages.Cyclops.uri;
                break;
            case 'Dinny':
                imageSource = characterImages.Dinny.uri;
                break;
            case 'Harry':
                imageSource = characterImages.Harry.uri;
                break;
            case 'Kevin':
                imageSource = characterImages.Kevin.uri;
                break;
        }
    }
    findCharacter(route.params.visionResp[0].text);

    
    return (
        <View style={styles.container}>
        <Image source={imageSource} />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    }
})

export default SelectCharacter;