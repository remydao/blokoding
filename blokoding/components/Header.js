import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import Colors from '../constants/Colors'

const Header = (props) => {
    return (
        <View style={styles(props).header}>
            <Image
                source={require("../assets/icon.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="stretch"/>
            <Text style={styles(props).headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = (props) => StyleSheet.create({
    header:{
        width:1500,
        height:57,
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