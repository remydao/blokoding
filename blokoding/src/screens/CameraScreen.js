import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "rn-text-detector";
import CharacterImages, { characterImages } from "../constants/CharacterImages";
import {Permission, PERMISSION_TYPE} from '../AppPermission'
import Maps from '../constants/Maps';
import parseInit from '../scripts/parsing/Parser';

class Camera extends Component {
    state = {
      modalVisible: false,
      modalText: 'Le scan a échoué, veuillez réessayer'
    }

    setModalVisible = (visible) => {
      this.setState({modalVisible: visible})
    }

    componentDidMount(){
      Permission.checkPermission(PERMISSION_TYPE.camera)
    }

    render() {
      const {modalVisible} = this.state;
      return (
        <View style={styles.container}>
          
          <RNCamera style={styles.preview} ref={ref => {this.camera = ref;}} type={RNCamera.Constants.Type.back} flashMode={RNCamera.Constants.FlashMode.off} captureAudio={false} />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.detectText(this.props.navigation)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}>      </Text>
              </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{this.state.modalText}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(false)}
                    >
                    <Text style={styles.textStyle}>Fermer</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          <StatusBar translucent backgroundColor="transparent"/>
        </View>
      )
    }
  
    detectText = async (navigation) => {
      try {
        const options = {
          quality: 0.8,
          base64: true,
          orientation: RNCamera.Constants.Orientation.portrait,
          fixOrientation: true
        };
        const { uri } = await this.camera.takePictureAsync(options);
        const visionResp = await RNTextDetector.detectFromUri(uri);
        const actions = parseInit(visionResp);
        console.log(actions);

        // TODO pass the map in properties
        navigation.navigate('Game', {actions: actions, isTesting: false, mapInfo: Maps.foret1});
      } catch (e) {
        this.setState({modalText: e})
        this.setModalVisible(!this.modalVisible)
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonClose: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  export default Camera;