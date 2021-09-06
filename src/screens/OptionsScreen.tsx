import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../constants/Colors';
import {characterImages} from "../constants/CharacterImages";
import LanguageContext from '../context/LanguageContext';
import SoundContext from '../context/SoundContext';
import Slider from '@react-native-community/slider';


const Options = ({}) => {

  const languageContext = React.useContext(LanguageContext);
  const soundContext = React.useContext(SoundContext)

  const handleLanguageChange = (itemValue: string, itemIndex: number) => {
    languageContext.changeLanguage(itemValue)
  }

  const handleMainSoundChange = (value: number) => {
    soundContext.changeMainSound(value)
    console.log(soundContext)
  }

  return (
    <View style={styles.container}>
      <View style={styles.picker}>
        <Picker itemStyle={{height: 50}}
          selectedValue={languageContext.language}
          onValueChange={handleLanguageChange}
          dropdownIconColor="#eee">
          <Picker.Item label="English" value="en"/>
          <Picker.Item label="Français" value="fr"/>
        </Picker>
      </View>
      <View style={styles.soundWrapper}>
        <Text style={styles.soundText}>Volume</Text>
        <Slider style={{width: 200, height: 40}} step={0.1}
          value={soundContext.mainSound}
          onValueChange={handleMainSoundChange}/>
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
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.dark_purple
  },
  image: {
    top: 150
  },
  soundWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: 30,
  },
  soundText: {
    fontFamily: 'Pangolin-Regular',
    fontSize: 20,
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5
  }
})


export default Options;
