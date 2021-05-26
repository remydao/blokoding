import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable, Animated} from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import EngineConstants from '../constants/EngineConstants';
import Colors from '../constants/Colors';

const HEIGHT = EngineConstants.MAX_HEIGHT - 64;
const BUTTON_PADDING = EngineConstants.MAX_HEIGHT * 0.02;
const BUTTON_HEIGHT = 100 + BUTTON_PADDING * 2;

const LevelButton = ({text, onPress, color, pressColor, ...props}) => {

    const [currentColor, setCurrentColor] = useState(color)
    const [isPressed, setIsPressed] = useState(false)

    handlePressIn = () => {
        setIsPressed(true)
    }
    handlePressOut = () => {
        setIsPressed(false)
    }

    const y = props.y;
    const position = Animated.subtract(props.index * BUTTON_HEIGHT, y);
    const isDisappearing = -BUTTON_HEIGHT;
    const isTop = 0;
    const isBottom = HEIGHT - BUTTON_HEIGHT;
    const isAppearing = HEIGHT;
    const translateY = Animated.add(
        y,
        y.interpolate({
            inputRange: [0, 0.00001 + props.index * BUTTON_HEIGHT],
            outputRange: [0, -props.index * BUTTON_HEIGHT],
            extrapolateRight: "clamp"
        }),
        position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -BUTTON_HEIGHT / 4],
            extrapolate: "clamp"
        })
    )
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp"
    })

    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    })


    return (
        
        <Animated.View style={{opacity, transform:[{translateY}, {scale},],
                                backgroundColor: props.bgColor,
                                ...styles.view,
                                opacity: (isPressed ? 0.6 : 1)
                                }}>
                                    {console.log("is  pressed " + isPressed)}
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={styles.button}>
                <View >
                    <View>
                        <Text style={styles.textStyle}>{text}</Text>
                    </View>
                </View>
        </Pressable>

            </Animated.View>

    )
}

const styles = StyleSheet.create({
    view:{
        height:100,
        marginVertical: BUTTON_PADDING,
        marginHorizontal: EngineConstants.MAX_WIDTH * 0.03,
        borderRadius: 50,
    },
    button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center'
    },
    textStyle: {
        color: 'black',
        fontSize: EngineConstants.MAX_HEIGHT * 0.05,
        fontFamily:"Pangolin-Regular",
        fontSize: 35,
    }
})

export default LevelButton;