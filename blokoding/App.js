import 'react-native-gesture-handler';
import React, {Fragment, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Platform, AppRegistry, TouchableOpacity, Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Header from './src/components/Header';
import {Home, Camera, Help, Options, Discover, Game, Error, LevelScreen} from './src/screens/Screens';
import Colors from "./src/constants/Colors"


const Stack = createStackNavigator();


function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="screen" screenOptions={{headerShown: true, headerTitleAlign:'center'}}>
        <Stack.Screen name="Home" component={Home} options={{headerTitle: () => <Header title="Blokoding"/>}}/>
        <Stack.Screen name="Take Picture" component={Camera} options={{headerShown: false}}/>
        <Stack.Screen name="Help" component={Help} options={{headerTitle: () => <Header title="Aide" backgroundColor={Colors.purpleBlue}/>}}/>
        <Stack.Screen name="Options" component={Options} options={{headerTitle: () => <Header title="Options" backgroundColor={Colors.purpleBlue}/>}}/>
        <Stack.Screen name="Découverte" component={Discover} options={{headerTitle: () => <Header title="Découverte"/>}}/>
        <Stack.Screen name="Game" component={Game} options={{headerShown:false}}/>
        <Stack.Screen name="Error" component={Error} options={{headerTitle: () => <Header title="Error"/>}}/>
        <Stack.Screen name="LevelScreen" component={LevelScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;