// import { utils } from '@react-native-firebase/app';
// import ml from '@react-native-firebase/ml';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
// import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';
import RNTextDetector from "rn-text-detector";

export default class Blokoding extends Component {
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
/*
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const { data } = await this.camera.takePictureAsync(options);
      this.processDocument(data.uri);
    }
  }

  processDocument = async (localPath) => {
    console.log('test');
    console.log(localPath);
  
    const visionResp = await RNTextDetector.detectFromUri(localPath);
  
    console.log('visionResp: ', JSON.stringify(visionResp));
    console.log('Found text in document: ', visionResp.bounding.lines);
  }
  */

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