import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Environments } from "../constants/BlockType";
import EngineConstants from "../constants/EngineConstants";

const Inventory = ({inventory}) => {
    inventory= { cyclop: 1, bart: 1}

    let inventoryList = Object.entries(inventory).map((item, index) => {
        let imageSource = ''
        if (item[0] == 'cyclop')
            imageSource = require('../assets/characters/Cyclops/1x/Cyclops.png')
        else
            imageSource = require('../assets/characters/Bart/1x/Bart.png')

        return (
            <View key={index} style={styles.inventory_row}>
                <Image source={imageSource} style={styles.image} />
                <Text style={styles.inventory_txt}>{item[1]}</Text>
            </View>
        )
    })

    return (
        <View style={styles.container}>
            { inventoryList }
        </View>
    )
}

const styles = StyleSheet.create({

    inventory_row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: EngineConstants.MAX_HEIGHT * 0.0075
    },
    inventory_txt: {
        color: 'white',
        fontWeight: '700',
        fontSize: EngineConstants.MAX_HEIGHT * 0.04 
    },  
    container: {
        position: 'absolute',
        top: EngineConstants.MAX_HEIGHT * 0.02,
        right: EngineConstants.MAX_HEIGHT * 0.02,
        width: EngineConstants.CELL_SIZE * 0.75,
        zIndex: 1,
    },
    image: {
        width: EngineConstants.CELL_SIZE / 3,
        height: EngineConstants.CELL_SIZE / 3,
    }
})

export default Inventory;