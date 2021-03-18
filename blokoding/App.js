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
  View,
  Image,
  Text,
  StatusBar,
  Platform,
  AppRegistry,
  TouchableOpacity,
  Linking,
  Button
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "rn-text-detector";


const Stack = createStackNavigator();


function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Take Picture" component={Blokoding}  screenOptions={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = ({ navigation }) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center' }}>
      <Image
        source={require("./assets/icon.png")}
        style={{ width: 200, height: 200}}
        resizeMode="stretch"/>
      <Button
        title="Start"
        color="#841584"
        onPress={() =>
          navigation.navigate('Take Picture')}/>
      <StatusBar style="auto" />
    </View>
  );
};

class Blokoding extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera style={styles.preview} ref={ref => {this.camera = ref;}} type={RNCamera.Constants.Type.back} flashMode={RNCamera.Constants.FlashMode.off} captureAudio={false} />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.detectText} style={styles.capture}>
            <Text style={{ fontSize: 14 }}>Process</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        //skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      visionResp.forEach(element => {
        console.log(element.text);
      });
    } catch (e) {
      console.warn(e);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;