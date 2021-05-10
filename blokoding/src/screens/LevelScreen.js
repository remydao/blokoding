import React from 'react';
import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import {levelsTexts} from '../constants/LevelsDetails';
import Colors from '../constants/Colors';

const LevelScreen = ({route, navigation}) => {
    
    const levelNumber = route.params.levelNumber;
    const levelInfo = levelsTexts[levelNumber];
    const title = levelInfo.title;
    const tutorial = levelInfo.tutorial;
    const congratulations = levelInfo.congratulations;
    const map = levelInfo.map
    const expectedCards = levelInfo.expectedCards

    const openCamera = () => {
        navigation.navigate('Take Picture', {
            map,
            expectedCards,
        })
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.tutorial}>{tutorial}</Text>
            </View>
            <Button title="Ouvrir la Camera" onPress={openCamera}></Button>
            <Text>{congratulations}</Text>
            <StatusBar translucent backgroundColor="transparent"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
    },
    title: {
        padding:15,
        paddingTop:30,
        fontSize:30,
        textAlign:'center',
        backgroundColor:Colors.turquoise
    },
    tutorial: {
        padding:10,
        fontSize:16,
        textAlign:'left',
        backgroundColor:Colors.purple
    },
})

export default LevelScreen;