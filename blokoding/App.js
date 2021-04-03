import 'react-native-gesture-handler';
import React, {Fragment, useEffect, Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet, ScrollView, Platform, AppRegistry, TouchableOpacity, Linking} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Header from './components/Header';
import Home from './screens/HomeScreen';
import Camera from './screens/CameraScreen';
import Help from './screens/HelpScreen';
import Options from './screens/OptionsScreen';
import Result from './screens/ScreenResult';
import LevelSelect from './screens/LevelSelectScreen'

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
        <Stack.Screen name="Help" component={Help} options={{headerShown: false}}/>
        <Stack.Screen name="Options" component={Options} options={{headerShown: false}}/>
        <Stack.Screen name="Result" component={Result} options={{headerTitle: () => <Header title="RESULTS"/>}}/>
        <Stack.Screen name="Level Select" component={LevelSelect} options={{headerTitle: () => <Header title="LEVEL SELECT"/>}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;