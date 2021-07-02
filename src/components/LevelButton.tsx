import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Pressable, Animated, Image} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import Colors from '../constants/Colors';
import AutoHeightImage from 'react-native-auto-height-image';
import { getIsDoneList } from '../scripts/storage/DiscoverLevels';
import { CommonActions } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


const HEIGHT = EngineConstants.MAX_HEIGHT - 64;
const BUTTON_PADDING = EngineConstants.MAX_HEIGHT * 0.02;
const BUTTON_HEIGHT = 100 + BUTTON_PADDING * 2;


interface IProps {
    text: string,
    onPress: () => void,
    pressColor: any,
    index: number,
    y: any,
    bgColor: string,
}

const LevelButton = ({text, onPress, pressColor, ...props}: IProps) => {

    const [isPressed, setIsPressed] = useState(false)
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        (async () => {
            const isDoneList = await getIsDoneList();
            console.log("isDoneList Mount : ", isDoneList)
            setIsDone(isDoneList[props.index]);
        })()
    }, [])

    const handlePressIn = () => {
        setIsPressed(true)
    }
    const handlePressOut = () => {
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
    //<Image source={require('../assets/check.png')} style={{width: 30, height:30}}></Image>
    
    return (
        <Animated.View style={{transform:[{translateY}, {scale},],
                                backgroundColor: props.bgColor,
                                ...styles.view,
                                opacity: (isPressed ? 0.6 : opacity)
                                }}>
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={styles.button}>
                <View style={styles.cellContent}>
                    {isDone ?
                    <View style={styles.checked}>
                        <LottieView
                            style={{width: 50, height:50}}
                            source={require('../assets/lotties/check-animation.json')}
                            autoPlay
                            loop={false}
                        />
                    </View> :
                    <View style={styles.checked}>
                        <Image source={require('../assets/circle.png')} style={{width: 30, height:30}}></Image>
                     </View> 
                    }
                    <View style={styles.textStyleWrapper}>
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
        fontSize: EngineConstants.MAX_HEIGHT * 0.045,
        fontFamily:"Pangolin-Regular",
    },
    textStyleWrapper: {
        paddingBottom: EngineConstants.MAX_HEIGHT * 0.012,
    },
    checked:{
    },
    cellContent:{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})

export default LevelButton;