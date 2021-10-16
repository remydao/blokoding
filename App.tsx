import React, {Fragment, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Platform, AppRegistry, TouchableOpacity, Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CustomHeader from './src/components/CustomHeader';
import {Camera, Help, Options, Discover, Game, LevelScreen, HomeScreen, HelpCardScreen} from './src/screens/Screens';
import Colors from "./src/constants/Colors";
import EnigmaScreen from './src/screens/EnigmaScreen';
import LanguageContext from './src/context/LanguageContext';
import SoundContext from './src/context/SoundContext';


import * as Sentry from '@sentry/react-native';
import UniverseScreen from './src/screens/UniverseScreen';

Sentry.init({ 
  dsn: 'https://61430177b69e43478da38120cdd6a069@o792555.ingest.sentry.io/5801070', 
});


const Stack = createStackNavigator();



function App() {

  const onChangeLanguage = (newLanguage : string) => {
    setLanguageInfos({...languageInfos, language: newLanguage});
  }

  const onChangeMainSound = (value: number) => {
    console.log("je change le son !", value)
    setSoundInfos({...soundInfos, mainSound: value});
  }

  const [languageInfos, setLanguageInfos] = React.useState({
    language: "en",
    changeLanguage: onChangeLanguage,
  })

  const [soundInfos, setSoundInfos] = React.useState({
    mainSound: 0.5,
    changeMainSound: onChangeMainSound
  })

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <LanguageContext.Provider value={languageInfos}>
      <SoundContext.Provider value={soundInfos}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen" screenOptions={{headerShown: true, headerTitleAlign:'center'}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerTitle: () => <CustomHeader title="Blokoding"/>}}/>
            <Stack.Screen name="Take Picture" component={Camera} options={{headerShown: false}}/>
            <Stack.Screen name="UniverseScreen" component={UniverseScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Help" component={Help} options={{headerTitle: () => <CustomHeader title="Aide" backgroundColor={Colors.dark_purple}/>}}/>
            <Stack.Screen name="Options" component={Options} options={{headerTitle: () => <CustomHeader title="Options" backgroundColor={Colors.dark_purple}/>}}/>
            <Stack.Screen name="Découverte" component={Discover} options={{headerTitle: () => <CustomHeader title="Découverte"/>}}/>
            <Stack.Screen name="Game" component={Game} options={{headerShown:false}}/>
            <Stack.Screen name="LevelScreen" component={LevelScreen} options={{headerShown:false}}/>
            <Stack.Screen name="EnigmaScreen" component={EnigmaScreen} options={{headerTitle: () => <CustomHeader title="Enigma" backgroundColor="purple"/>}}/>
            <Stack.Screen name="HelpCards" component={HelpCardScreen} options={{headerTitle: () => <CustomHeader title="Cartes" backgroundColor={Colors.dark_purple}/>}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SoundContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;