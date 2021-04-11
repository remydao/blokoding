import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const FlatButton = ({text, onPress, color}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.button, {backgroundColor:color}]}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:22,
    },
    textStyle:{
        fontWeight:"700",
        color:"white",
        fontSize:40,
        fontFamily: 'Montserrat'
    }
})

export default FlatButton;