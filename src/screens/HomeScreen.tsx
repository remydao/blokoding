import React, { Component } from 'react';
import {View, Image, StatusBar, AppState} from 'react-native';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import FlatButton from '../components/FlatButton';
import Maps from '../constants/Maps';
import { CameraMode } from '../constants/CameraMode';
import EngineConstants from '../constants/EngineConstants';
import {useLanguage} from '../datas/GetLanguage';
import LanguageContext from '../context/ContextLanguage';

import {loadSound} from '../scripts/sound/sound'
import Sound from 'react-native-sound';

interface IProps {
  navigation: any,
}

const HomeScreen = ({ navigation }: IProps) => {

  let sound: Sound;

  const language = useLanguage();


  const _handleAppStateChange = (currentAppState: any) => {
    if(currentAppState == "background") {
      console.log("Stop sound");
      sound.stop();
      sound.release();
    } 
    if(currentAppState == "active") {
    
      if (sound.isPlaying())
        return;
      
      console.log("Play sound");
      sound.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  }

  React.useEffect(() => {
    if (sound == undefined) {
      console.log("loadSound: 50");
      sound = loadSound("homescreen_sound.mp3", true);
    }
    AppState.addEventListener('change', (state) => _handleAppStateChange(state));
    return () => AppState.removeEventListener('change', (state) => _handleAppStateChange(state));
  }, [])

    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon.png")}
            resizeMode="stretch"
            style={{width: EngineConstants.MAX_HEIGHT / 8, height: EngineConstants.MAX_HEIGHT / 8}}
          />
        </View>
        <View style={styles.button}>
          <FlatButton text={language.discover} color={Colors.red} pressColor={Colors.dark_red} onPress={() => {
            navigation.navigate('Découverte');
            sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.start} color={Colors.purple} pressColor={Colors.dark_purple} onPress={() => {
            navigation.navigate('Take Picture', {music: sound});
            sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.enigma} color={Colors.turquoise} pressColor={Colors.dark_turquoise} onPress={() => {
            navigation.navigate('EnigmaScreen');
            sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.options} color={Colors.orange} pressColor={Colors.dark_orange } onPress={() => {
            navigation.navigate('Options');
            sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.help} color={Colors.turquoise} pressColor={Colors.dark_orange } onPress={() => {
            navigation.navigate('Help');
            sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.test} color={Colors.pink} pressColor={Colors.dark_pink} onPress={() => navigation.navigate('Game', {cameraMode: CameraMode.TEST, mapInfo: Maps.foret2})}/>
        </View>
        <StatusBar backgroundColor={Colors.azure}/>
      </View>
    );
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:'#cbcef8',
    marginTop:-1,
  },
  button:{
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HomeScreen;
