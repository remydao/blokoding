import React, { BackHandler } from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import FlatButton from '../components/FlatButton';
import Maps from '../constants/Maps';

const Home = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon.png")}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.button}>
          <FlatButton text="Découverte" color={Colors.red} pressColor={Colors.dark_red} onPress={() => navigation.navigate('Level Select')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Commencer" color={Colors.purple} pressColor={Colors.dark_purple} onPress={() => navigation.navigate('Take Picture')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Aide" color={Colors.turquoise} pressColor={Colors.dark_turquoise} onPress={() => navigation.navigate('Help')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Options" color={Colors.orange} pressColor={Colors.dark_orange } onPress={() => navigation.navigate('Options')}/>
        </View>
        <View style={styles.button}>
          <FlatButton text="Test" color={Colors.pink} pressColor={Colors.dark_pink} onPress={() => navigation.navigate('Game', {isTesting: true, mapInfo: Maps.foret1})}/>
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
    width:"100%",
  },
  logoContainer: {
    flex: 1,
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home;
