import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native'
import Colors from '../constants/Colors'

const Header = ({title}) => {
    return (
        <View style={styles.header}>
            <Image
          source={require("../assets/icon.png")}
          style={{ width: 20, height: 20 }}
          resizeMode="stretch"/>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:1500,
        height:57,
        flexDirection:'row',
        backgroundColor: Colors.azure,
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth:0.5,
        borderBottomColor:'gray'
    },
    headerTitle:{
        color:'black',
        fontSize:18,
    },
})

export default Header;