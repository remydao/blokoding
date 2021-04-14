import 'react-native-gesture-handler';
import React, {Fragment, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, ScrollView, Platform, AppRegistry, TouchableOpacity, Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Header from './components/Header';
import {Home, Camera, Help, Options, Result, LevelSelect, Game, Error} from './screens/Screens';
import Colors from "./constants/Colors"

const Stack = createStackNavigator();


function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true, headerTitleAlign:'center' }}>
        <Stack.Screen name="Home" component={Home} options={{headerTitle: () => <Header title="BLOKODING"/>}}/>
        <Stack.Screen name="Take Picture" component={Camera} options={{headerShown: false}}/>
        <Stack.Screen name="Help" component={Help} options={{headerTitle: () => <Header title="Aide" backgroundColor={Colors.purpleBlue}/>}}/>
        <Stack.Screen name="Options" component={Options} options={{headerTitle: () => <Header title="Options" backgroundColor={Colors.purpleBlue}/>}}/>
        <Stack.Screen name="Result" component={Result} options={{headerTitle: () => <Header title="RESULTS"/>}}/>
        <Stack.Screen name="Level Select" component={LevelSelect} options={{headerTitle: () => <Header title="LEVEL SELECT"/>}}/>
        <Stack.Screen name="Game" component={Game} options={{headerShown:false}}/>
        <Stack.Screen name="Error" component={Error} options={{headerTitle: () => <Header title="Error"/>}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;