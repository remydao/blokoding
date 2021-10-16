import React from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Cards from '../constants/Cards';
import EngineConstants from '../constants/EngineConstants';

const bgColors = ["rgba(251,241,144, 0.3)",
    "rgba(255,107,107,0.3)",
    "rgba(255,149,87,0.3)", 
    "rgba(57,224,132,0.3)", 
    "rgba(25,218,187,0.3)", 
    "rgba(109,99,255,0.3)", 
    "rgba(255,156,156,0.3)"]

function ActionCards() {
    return (
        <View>
            <View>
                {Cards.map((card, index) => {
                    console.log(card)
                    return (<View style={{...styles.imageContent, backgroundColor:bgColors[index]}} key={index}>
                        <View style={{marginLeft: 100}}></View>
                        {card.map((c, i) => {
                        return <Image source={c} key={i} style={styles.images}/>
                    })}</View>)
                })}
            </View>
        </View>
    )
}


function HelpCardScreen() {
    return (
        <ScrollView>
            <ActionCards/>
        </ScrollView>
    )
}

export default HelpCardScreen

const styles = StyleSheet.create({
    imageContent: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    images:{
        width: EngineConstants.MAX_WIDTH / 2,
        height: EngineConstants.MAX_HEIGHT / 4
    }
  })