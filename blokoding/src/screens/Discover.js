import React from 'react';
import {Text, View, StatusBar, StyleSheet, FlatList, Pressable} from 'react-native';
import {default as UUID} from "uuid"; 
import Card from '../components/Card';
import Colors from '../constants/Colors';
import FlatButton from '../components/FlatButton';
import { numberOfLevels } from '../constants/LevelsDetails';

const DiscoverColors = [
  Colors.dark_pink,
  Colors.azure,
  Colors.turquoise
]

const Discover = ({ navigation }) => {

    var buttons = []
    for (let i = 0; i < numberOfLevels; i++)
    {
        const levelTitle = "Level " + (i + 1)
        buttons.push({id:UUID.v4(), value:levelTitle})
    }

    const onPress = (index) => {
      navigation.navigate('LevelScreen', {
        levelNumber: index
      })
    }

    const selectBgColor = (index) => {
      return DiscoverColors[index % DiscoverColors.length];
    }

    return (
      <View style={styles.container}>
          <View>
            <FlatList
                data={buttons}
                renderItem={({item, index}) => 
                   (  
                     <View style={{backgroundColor: selectBgColor(index)}}>
                       <FlatButton text={item.value} onPress={() => onPress(index)} pressColor={'red'}>
                      </FlatButton>
                      </View>
                    
                    )}
                keyExtractor={item => item.id}
            />
          </View>
          <StatusBar backgroundColor={Colors.azure}/>
      </View>
    );
  };

export default Discover;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
})
