import React, { Component } from 'react';
import {View, Image, StatusBar, AppState} from 'react-native';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import FlatButton from '../components/FlatButton';
import Maps from '../constants/Maps';
import { CameraMode } from '../constants/CameraMode';
import EngineConstants from '../constants/EngineConstants';
import {loadSound} from '../scripts/sound/sound'
import Sound from 'react-native-sound';

interface IState {
}

interface IProps {
  navigation: any,
}

class HomeScreen extends Component<IProps, IState> {

  private sound: Sound;

  constructor(props: IProps) {
    super(props);
    console.log("constructor");
  }


  _handleAppStateChange = (currentAppState: any) => {
    if(currentAppState == "background") {
      console.log("Stop sound");
      this.sound.stop();
      this.sound.release();
    } 
    if(currentAppState == "active") {
    
      if (this.sound.isPlaying())
        return;
      
      console.log("Play sound");
      this.sound.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  }

  componentDidMount() {
    console.log("ComponentDidMount");

    if (this.sound == undefined) {
      console.log("loadSound: 50");
      this.sound = loadSound("homescreen_sound.mp3", true);
    }
    
    AppState.addEventListener('change', (state) => this._handleAppStateChange(state));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', (state) => this._handleAppStateChange(state));
  }

  render() {
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
          <FlatButton text="Découverte" color={Colors.red} pressColor={Colors.dark_red} onPress={() => {
            this.props.navigation.navigate('Découverte');
            this.sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Commencer" color={Colors.purple} pressColor={Colors.dark_purple} onPress={() => {
            this.props.navigation.navigate('Take Picture', {music: this.sound});
            this.sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Enigme" color={Colors.turquoise} pressColor={Colors.dark_turquoise} onPress={() => {
            this.props.navigation.navigate('EnigmaScreen');
            this.sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Options" color={Colors.orange} pressColor={Colors.dark_orange } onPress={() => {
            this.props.navigation.navigate('Options');
            this.sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Aide" color={Colors.turquoise} pressColor={Colors.dark_orange } onPress={() => {
            this.props.navigation.navigate('Help');
            this.sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Test" color={Colors.pink} pressColor={Colors.dark_pink} onPress={() => {
            this.props.navigation.navigate('Loading', {cameraMode: CameraMode.TEST, mapInfo: Maps.foret2})
            this.sound.stop();
            loadSound("buttonclick.mp3", false);
          }}/>
        </View>
        <StatusBar backgroundColor={Colors.azure}/>
      </View>
    );
  }

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
