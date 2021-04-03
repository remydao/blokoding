import React from 'react';
import {StyleSheet, StatusBar, Button, ScrollView, SafeAreaView} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';


const LevelSelect = ({ navigation }) => {

    var buttons = []

    for (let i = 0; i < 30; i++)
    {
        const levelTitle = "Level " + (i + 1)

        buttons.push(
            <Button  key={i} title={levelTitle} color={Colors.secondary}></Button>
        )
    }

    return (
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
            
            {buttons}

          <StatusBar backgroundColor={Colors.secondary}/>
        </ScrollView>
      </SafeAreaView>
    );
  };

export default LevelSelect;

const styles = StyleSheet.create({
    contentContainer: {
        flex:1,
    },
    scrollView: {
        backgroundColor: 'beige',
        marginVertical: 20,
      },
})
