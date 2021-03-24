/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {Fragment, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  AppRegistry,
  TouchableOpacity,
  Linking,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Header from './components/Header';
import Home from './screens/HomeScreen';
import Camera from './screens/CameraScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
});

export default App;