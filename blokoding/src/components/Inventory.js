import React, { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import AutoHeightImage from "react-native-auto-height-image";
import { Environments } from "../constants/BlockType";
import EngineConstants from "../constants/EngineConstants";
import ItemImages, { getItemUri } from "../constants/ItemImages";

const Inventory = ({inventory}) => {

    let inventoryList = Object.entries(inventory).map((item, index) => {
        let imageSource = getItemUri(item[0]);

        return (
            <View key={index} style={styles.inventory_row}>
                <AutoHeightImage source={imageSource} width={EngineConstants.CELL_SIZE / 3}/>
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
    }
})

export default Inventory;