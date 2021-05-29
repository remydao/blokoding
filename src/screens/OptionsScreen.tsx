import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../constants/Colors';
import {characterImages} from "../constants/CharacterImages";


const Options = ({}) => {
    return (
      <View style={styles.container}>
        <View style={styles.picker}>
          <Picker
            dropdownIconColor="black">
            <Picker.Item label="Français" value="fr"/>
            <Picker.Item label="English" value="en"/>
          </Picker>
        </View>
        <Image style={styles.image} source={characterImages.Harry.uri}></Image>
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
    picker: {
      marginTop: 50,
      height: 50,
      width: 150,
      borderRadius: 10,
      backgroundColor: Colors.dark_purple
    },
    image: {
      top: 150
    }
  })


export default Options;
