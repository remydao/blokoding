import React from 'react'
import {View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import Colors from '../constants/Colors'

const ErrorScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.error}>
                <Text style={styles.text}>Erreur lors du scan</Text>
            </View>
            <StatusBar backgroundColor={Colors.azure}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.turquoise,
    },
    error:{
        backgroundColor:'red',
        padding:10,
        borderRadius:10,
        top: -30
    },
    text:{
        fontSize:20
    }
})

export default ErrorScreen;