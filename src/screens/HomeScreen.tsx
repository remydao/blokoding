import React from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import FlatButton from '../components/FlatButton';
import Maps from '../constants/Maps';
import { CameraMode } from '../constants/CameraMode';

interface HomeProps {
  navigation: any,
}

const Home = ({ navigation }: HomeProps) => {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon.png")}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.button}>
          <FlatButton text="Découverte" color={Colors.red} pressColor={Colors.dark_red} onPress={() => navigation.navigate('Découverte')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Commencer" color={Colors.purple} pressColor={Colors.dark_purple} onPress={() => navigation.navigate('Take Picture')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Enigme" color={Colors.turquoise} pressColor={Colors.dark_turquoise} onPress={() => navigation.navigate('EnigmaScreen')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Options" color={Colors.orange} pressColor={Colors.dark_orange } onPress={() => navigation.navigate('Options')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Test" color={Colors.pink} pressColor={Colors.dark_pink} onPress={() => navigation.navigate('Game', {cameraMode: CameraMode.TEST, mapInfo: Maps.foret2})}/>
        </View>
        <StatusBar backgroundColor={Colors.azure}/>
      </View>
    );
  };

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

export default Home;
