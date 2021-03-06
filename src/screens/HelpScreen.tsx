import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import {characterImages} from "../constants/CharacterImages";
import { Characters } from '../constants/BlockType';

interface IProps {
  navigation: any
}

const Help = ({ navigation }: IProps) => {
  return (
    <View style={styles.container}>
      <View>
      </View>
      <Image style={styles.image} source={characterImages.MrMustache.uri}></Image>
      
      <StatusBar backgroundColor={Colors.dark_purple}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.turquoise 
  },
  image: {
    top: 150
  }

})

export default Help;
