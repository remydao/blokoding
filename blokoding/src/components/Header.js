import React from 'react'
import { Platform } from 'react-native'
import {View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Colors from '../constants/Colors'


const Header = (props) => {
    return (
        <View style={styles(props).header}>
            {
                Platform.OS === 'ios' ?
                (<View style={styles(props).statusBarIOS}></View>)
                : <View></View>
            }
            <View>
                <Text style={styles(props).backBtn}>lol</Text>
            </View>
            <Image
                source={require("../assets/icon.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="stretch"/>
            <Text style={styles(props).headerTitle}>{props.title}</Text>
        </View>
    )
}

const STATUSBAR_HEIGHT = getStatusBarHeight();

const styles = (props) => StyleSheet.create({
    statusBarIOS:{
        position: 'absolute',
        top: -STATUSBAR_HEIGHT,
        height: STATUSBAR_HEIGHT,
        width:1500,
        backgroundColor: props.backgroundColor || Colors.azure,
    },
    backBtn:{
        position:'absolute',
        left: 10,
    },
    header:{
        width:1500,
        height: 57,
        flexDirection:'row',
        backgroundColor: props.backgroundColor || Colors.azure,
        alignItems: 'center',
        justifyContent:'center',
    },
    headerTitle:{
        color:'black',
        fontSize:18,
        paddingHorizontal:5,
        fontWeight:'bold'
    },
})

export default Header;