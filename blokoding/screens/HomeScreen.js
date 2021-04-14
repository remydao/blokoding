import React, { BackHandler } from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import FlatButton from '../components/FlatButton';

const Home = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/icon.png")}
          resizeMode="stretch"
          style={{margin:35}}
          />
            <View style={styles.button}>
              <FlatButton text="Découverte" color={Colors.red} onPress={() => navigation.navigate('Level Select')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="Commencer" color={Colors.purpleBlue} onPress={() => navigation.navigate('Take Picture', {isSelectCharacter:false})}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="Aide" color={Colors.turquoise} onPress={() => navigation.navigate('Help')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="Options" color={Colors.yellow} onPress={() => navigation.navigate('Options')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="Créer Personnage" color={Colors.palePink} onPress={() => navigation.navigate('Take Picture', {isSelectCharacter:true})}/>
            </View>
        <StatusBar backgroundColor={Colors.azure}/>
      </View>
    );
  };

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#cbcef8',
    marginTop:-1,
  },
  button:{
    width:"100%",
  }
})

export default Home;
