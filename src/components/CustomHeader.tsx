import React from 'react'
import { Platform, Pressable } from 'react-native'
import {View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from '../constants/Colors'
import EngineConstants from '../constants/EngineConstants';

interface IProps {
    isLogo? : boolean,
    style?: any,
    textStyle?: any,
    title: String,
    backgroundColor?: string,
    goBack?: any
}

const CustomHeader = (props : IProps) => {

    const isLogo = props.isLogo == false ? false : true;

    return (
        <View style={{...styles(props).header, ...props.style}}>
            {props.goBack ? <Pressable onPress={() => props.goBack()} style={{position:'absolute', left: 10}}>
                <Image  style={{ width: 25, height: 25 }} source={require("../assets/back.png")}/>
            </Pressable> : null}
            {
                Platform.OS === 'ios' ?
                (<View style={styles(props).statusBarIOS}></View>)
                : <View></View>
            }
            {/* <View>
                <Text style={styles(props).backBtn}>lol</Text>
            </View> */}
            {isLogo &&
                <Image
                source={require("../assets/icon_secondary.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="stretch"/>
            }
            
            <Text style={{...styles(props).headerTitle, ...props.textStyle}}>{props.title}</Text>
        </View>
    )
}

const STATUSBAR_HEIGHT = getStatusBarHeight();

const styles = (props: IProps) => StyleSheet.create({
    statusBarIOS:{
        position: 'absolute',
        top: -STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT,
        width: EngineConstants.MAX_WIDTH,
        backgroundColor: props.backgroundColor || Colors.azure,
    },
    backBtn:{
        position:'absolute',
        left: 10,
    },
    header:{
        alignSelf: 'stretch',
        width: EngineConstants.MAX_WIDTH,
        height: 57,
        flexDirection:'row',
        backgroundColor: props.backgroundColor || Colors.azure,
        alignItems: 'center',
        justifyContent:'center',
    },
    headerTitle:{
        color:'black',
        paddingHorizontal:5,
        fontFamily:"Pangolin-Regular",
        fontSize: 20
    },
})

export default CustomHeader;