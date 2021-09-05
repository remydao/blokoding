import React, { Component } from 'react';
import {View, Image, StatusBar, AppState} from 'react-native';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import FlatButton from '../components/FlatButton';
import Maps from '../constants/Maps';
import { CameraMode } from '../constants/CameraMode';
import EngineConstants from '../constants/EngineConstants';
import {useLanguage} from '../datas/GetLanguage';
import { useFocusEffect } from '@react-navigation/native';

import {loadSound} from '../scripts/sound/sound'
import Sound from 'react-native-sound';

interface IProps {
  navigation: any,
}

const HomeScreen = ({ navigation }: IProps) => {

  const soundRef = React.useRef<Sound>()
  const language = useLanguage();


  const _handleAppStateChange = (currentAppState: any) => {
    if(currentAppState == "background") {
      console.log("Stop sound");
      soundRef.current?.stop();
      soundRef.current?.release();
    } 
    if(currentAppState == "active") {
      if (soundRef.current?.isPlaying())
        return;
      
      console.log("Play sound");
      soundRef.current?.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  }

  React.useEffect(() => {
    if (soundRef.current == undefined) {
      console.log("loadSound: 50");
      soundRef.current = loadSound("homescreen_sound.mp3", true);
    }
    AppState.addEventListener('change', (state) => _handleAppStateChange(state));
    return () => AppState.removeEventListener('change', (state) => {_handleAppStateChange(state)});
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (soundRef.current == undefined) {
        soundRef.current = loadSound("homescreen_sound.mp3", true);
      }
      soundRef.current.play()
  }, []))


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
            soundRef.current?.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.start} color={Colors.purple} pressColor={Colors.dark_purple} onPress={() => {
            navigation.navigate('Take Picture', {music: soundRef.current});
            soundRef.current?.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.enigma} color={Colors.turquoise} pressColor={Colors.dark_turquoise} onPress={() => {
            navigation.navigate('EnigmaScreen');
            soundRef.current?.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.options} color={Colors.orange} pressColor={Colors.dark_orange } onPress={() => {
            navigation.navigate('Options');
            soundRef.current?.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text={language.help} color={Colors.turquoise} pressColor={Colors.dark_orange } onPress={() => {
            navigation.navigate('Help');
            soundRef.current?.stop();
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
