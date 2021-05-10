import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import EngineConstants from '../constants/EngineConstants';

const FlatButton = ({text, onPress, color, pressColor}) => {

    const [currentColor, setCurrentColor] = useState(color)
    const [isPressed, setIsPressed] = useState(false)

    var buttonProps = {
        onPressIn: () => {
            setCurrentColor(pressColor)
            setIsPressed(true)
        },
        onPressOut: () => {
            setCurrentColor(color)
            setIsPressed(false)
        },
        style: styles.button
    }

    return (
        <Pressable onPress={onPress} {...buttonProps} backgroundColor={currentColor}>
            <View>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:EngineConstants.MAX_HEIGHT / 35
    },
    textStyle: {
        fontWeight:"700",
        color:"white",
        fontSize:40,
        fontFamily: 'Montserrat'
    }
})

export default FlatButton;