import React from 'react';
import {View, Image, Button, StatusBar} from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';
import FlatButton from '../components/FlatButton';

const Home = ({ navigation }) => {
    return (
      <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'purple',
        marginTop:-1,}}>
        <Image
          source={require("../assets/icon.png")}
          style={{ width: 200, height: 200}}
          resizeMode="stretch"
          style={{
            marginBottom:115,}}
          />
            <View style={styles.button}>
              <FlatButton text="SELECT LEVEL" color={Colors.red} onPress={() => navigation.navigate('Level Select')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="START" color={Colors.purpleBlue} onPress={() => navigation.navigate('Take Picture')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="HELP" color={Colors.turquoise} onPress={() => navigation.navigate('Help')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="OPTIONS" color={Colors.yellow} onPress={() => navigation.navigate('Options')}/>
            </View>
            <View style={styles.button}>
              <FlatButton text="QUITTER" color={Colors.palePink} onPress={() => {}}/>
            </View>
        <StatusBar backgroundColor={Colors.azure}/>
      </View>
    );
  };

const styles = StyleSheet.create({
  button:{
    width:"100%",
    backgroundColor: Colors.red
  }
})

export default Home;
