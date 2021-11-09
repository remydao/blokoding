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
  const [muteImg, setImg] = useState(soundContext.isMuted);

  const handleLanguageChange = (itemValue: string, itemIndex: number) => {
    languageContext.changeLanguage(itemValue)
  }

  const handleMainSoundChange = (value: number) => {
    soundContext.changeMainSound(value, soundContext.isMuted)
  }

  const handleBlockSchemaDisplayChange = (value: boolean) => {
    setBlockSchemaDisplay(value);
  }

  const switchSound = () => {
    setImg(!muteImg);
    soundContext.changeMuted(!soundContext.isMuted, soundContext.mainSound);
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

        <View style={styles.soundOptions}>
          <Slider style={{width: 200, height: 40, margin: 10}} step={0.1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            thumbTintColor={Colors.dark_orange}
            value={soundContext.mainSound}
            onValueChange={handleMainSoundChange}/>
            <TouchableOpacity
              onPress={() => {
                switchSound()
              }}>
              <View style={{display:'flex', alignItems:'center'}}>

                <Image source={ muteImg ?
                                require('../assets/mute.png') : 
                                require('../assets/volume.png')}
                  resizeMode="stretch"
                  style={{width: EngineConstants.MAX_HEIGHT / 12, height: EngineConstants.MAX_HEIGHT / 12}}
                />
                <Text style={{paddingTop: 10, fontWeight: '900'}}>{muteImg ? "OFF" : "ON"}</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
      
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Switch value={blockSchemaDisplay} trackColor={{false: '#FC5958', true: Colors.dark_orange}} thumbColor={'#eee'} onValueChange={handleBlockSchemaDisplayChange} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}} />
        <Text style={{marginLeft: 20, fontFamily: 'Pangolin-Regular', fontSize: 18}}>Afficher le schema des blocs</Text>
      </View>
      <Image style={styles.image} source={characterImages.Harry.uri}></Image>
      <StatusBar backgroundColor={Colors.dark_orange}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(244, 149, 87, 0.3)'
  },
  picker: {
    marginTop: 50,
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.dark_orange
  },
  image: {
  },
  soundWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  soundText: {
    fontFamily: 'Pangolin-Regular',
    fontSize: 20,
    backgroundColor: Colors.dark_orange,
    padding: 10,
    borderRadius: 10
  },
  soundOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})


export default Options;
