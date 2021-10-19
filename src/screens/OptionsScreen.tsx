import React , { useState } from 'react';
import {Text, View, StatusBar, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Colors from '../constants/Colors';
import {characterImages} from "../constants/CharacterImages";
import LanguageContext from '../context/LanguageContext';
import SoundContext from '../context/SoundContext';
import Slider from '@react-native-community/slider';
import EngineConstants from '../constants/EngineConstants';
import BlockSchemaContext from '../context/BlockSchemaContext';
import { Switch } from 'react-native-gesture-handler';


const Options = ({}) => {

  const languageContext = React.useContext(LanguageContext);
  const soundContext = React.useContext(SoundContext);
  const [blockSchemaDisplay, setBlockSchemaDisplay] = React.useContext(BlockSchemaContext); 
  const [soundImg, setImg] = useState(soundContext.mainSound === 0 ? false : true);

  const handleLanguageChange = (itemValue: string, itemIndex: number) => {
    languageContext.changeLanguage(itemValue)
  }

  const handleMainSoundChange = (value: number) => {
    soundContext.changeMainSound(value)
    console.log(soundContext)
  }

  const handleBlockSchemaDisplayChange = (value: boolean) => {
    setBlockSchemaDisplay(value);
  }

  const switchSound = (soundState: boolean) => {
    setImg(!soundImg);
    console.log(SoundContext);
    soundContext.changeMainSound(soundImg ? 0 : 1);
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
        // ici il set le slider au mainSound du coup c pas bon
          value={soundContext.mainSound}
          onValueChange={handleMainSoundChange}/>
      </View>
      <TouchableOpacity
            onPress={() => {
              switchSound(soundImg)
            }}>
          <Image source={ soundImg === true ?                  
                          require('../assets/volume.png') : 
                          require('../assets/mute.png')}
            resizeMode="stretch"
            style={{width: EngineConstants.MAX_HEIGHT / 8, height: EngineConstants.MAX_HEIGHT / 8}}
          />
      </TouchableOpacity>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Switch value={blockSchemaDisplay} trackColor={{false: '#FC5958', true: '#39E083'}} onValueChange={handleBlockSchemaDisplayChange} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
        <Text>afficher le schema des blocs</Text>
      </View>
      <Image style={styles.image} source={characterImages.Harry.uri}></Image>
      <StatusBar backgroundColor={Colors.dark_purple}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
    top: 50
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
