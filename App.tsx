import React, {Fragment, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets} from '@react-navigation/stack';
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
import BlockSchemaContext from './src/context/BlockSchemaContext';

Sentry.init({ 
  dsn: 'https://61430177b69e43478da38120cdd6a069@o792555.ingest.sentry.io/5801070', 
});


const Stack = createStackNavigator();

const horizontalAnimation: any = {
  headerShown: true,
  headerTitleAlign:'center',
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts } : any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  }
}

function App() {

  const onChangeLanguage = (newLanguage : string) => {
    setLanguageInfos({...languageInfos, language: newLanguage});
  }

  const onChangeMainSound = (value: number) => {
    console.log("je change le son !", value)
    setSoundInfos({...soundInfos, mainSound: value});
  }

  const [languageInfos, setLanguageInfos] = React.useState({
    language: "fr",
    changeLanguage: onChangeLanguage,
  })

  const [soundInfos, setSoundInfos] = React.useState({
    mainSound: 0.5,
    changeMainSound: onChangeMainSound
  })

  const blockSchemaDisplay = React.useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <BlockSchemaContext.Provider value={blockSchemaDisplay}>
      <LanguageContext.Provider value={languageInfos}>
        <SoundContext.Provider value={soundInfos}>
          <NavigationContainer >
            <Stack.Navigator initialRouteName="HomeScreen" headerMode="screen" screenOptions={horizontalAnimation}>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerTitle: () => <CustomHeader title="Blokoding"/>}}/>
              <Stack.Screen name="Take Picture" component={Camera} options={{headerShown: false}}/>
              <Stack.Screen name="UniverseScreen" component={UniverseScreen} options={{headerShown: false}}/>
              <Stack.Screen name="Help" component={Help} options={ ({navigation}) => ({headerTitle: () => <CustomHeader title="Aide" goBack={() => navigation.pop()} backgroundColor={Colors.dark_purple}/>})}/>
              <Stack.Screen name="Options" component={Options} options={({navigation}) => ({headerTitle: () => <CustomHeader title="Options" goBack={() => navigation.pop()} backgroundColor={Colors.dark_orange}/>})}/>
              <Stack.Screen name="Découverte" component={Discover} options={({navigation}) => ({headerTitle: () => <CustomHeader title="Découverte" goBack={() => navigation.pop()}/>})}/>
              <Stack.Screen name="Game" component={Game} options={{headerShown:false}}/>
              <Stack.Screen name="LevelScreen" component={LevelScreen} options={{headerShown:false}}/>
              <Stack.Screen name="EnigmaScreen" component={EnigmaScreen} options={({navigation}) => ({headerTitle: () => <CustomHeader goBack={() => navigation.pop()} title="Enigma" backgroundColor="purple"/>})}/>
              <Stack.Screen name="HelpCards" component={HelpCardScreen} options={({navigation}) => ({headerTitle: () => <CustomHeader title="Cartes" goBack={() => navigation.pop()}  backgroundColor={Colors.dark_purple}/>})}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SoundContext.Provider>
      </LanguageContext.Provider>
    </BlockSchemaContext.Provider>
  );
};

export default App;