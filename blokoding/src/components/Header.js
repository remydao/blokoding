import React from 'react'
import { Platform } from 'react-native'
import {View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import Colors from '../constants/Colors'


const Header = (props) => {
    return (
        <View style={styles(props).header}>
            {
                Platform.OS === 'ios' ?
                (<View style={styles(props).statusBarIOS}></View>)
                : <View></View>
            }
            <Image
                source={require("../assets/icon.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="stretch"/>
            <Text style={styles(props).headerTitle}>{props.title}</Text>
        </View>
    )
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
 

const styles = (props) => StyleSheet.create({
    statusBarIOS:{
        position: 'absolute',
        top:-14,
        height: 15,
        width:1500,
        backgroundColor: props.backgroundColor || Colors.azure,
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