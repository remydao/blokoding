import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "rn-text-detector";
import CharacterImages, { characterImages } from "../constants/CharacterImages";


class Camera extends Component {
    render() {
      return (
        <View style={styles.container}>
          <RNCamera style={styles.preview} ref={ref => {this.camera = ref;}} type={RNCamera.Constants.Type.back} flashMode={RNCamera.Constants.FlashMode.off} captureAudio={false} />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.detectText(this.props.navigation, this.props.route.params.isSelectCharacter)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}>      </Text>
            </TouchableOpacity>
          </View>
          <StatusBar translucent backgroundColor="transparent"/>
        </View>
      )
    }
  
    detectText = async (navigation, isSelectCharacter) => {
      try {
        const options = {
          quality: 0.8,
          base64: true,
          orientation: RNCamera.Constants.Orientation.portrait,
          fixOrientation: true
        };
        const { uri } = await this.camera.takePictureAsync(options);
        const visionResp = await RNTextDetector.detectFromUri(uri);
        const characterList = [];
        for (var character in characterImages){
          characterList.push(characterImages[character].imageName);
        }
        if (isSelectCharacter){
          if (visionResp.length == 0 || !characterList.includes(visionResp[0].text)){
            navigation.navigate('Error', {visionResp : visionResp});
          }
          else
            navigation.navigate('Game', {visionResp: visionResp});
        }
        else{
          navigation.navigate('Result', {visionResp : visionResp});
        }
      } catch (e) {
        //console.warn(e)
      }
    };
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      position:'absolute',
      flex: 0,
      borderRadius: 100,
      borderWidth:5,
      borderColor:'white',
      padding: 30,
      alignSelf: 'center',
      bottom:30
    },
  });

  export default Camera;