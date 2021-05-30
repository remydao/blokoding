import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import EngineConstants from '../constants/EngineConstants';

interface IProps {
    text: string,
    onPress: any,
    color: string,
    pressColor: any
}


const FlatButton = ({text, onPress, color, pressColor} : IProps) => {

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
        style: {...styles.button, backgroundColor:currentColor}
    }

    return (
        <Pressable onPress={onPress} {...buttonProps} >
            <View>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: EngineConstants.MAX_HEIGHT * 0.03
    },
    textStyle: {
        color: 'white',
        fontSize: EngineConstants.MAX_HEIGHT * 0.05,
        fontFamily:"Pangolin-Regular",
    }
})

export default FlatButton;