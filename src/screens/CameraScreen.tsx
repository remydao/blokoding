import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "rn-text-detector";
import {Permission, PERMISSION_TYPE} from '../AppPermission'
import Maps from '../constants/Maps';
import {parseInit} from '../scripts/parsing/Parser';
import { CameraMode } from '../constants/CameraMode';
import { modifyCoordinates } from '../scripts/corrector/coordinates';
import { dropProblematicTokens } from '../scripts/corrector/corrector';

import { BlockType } from '../constants/BlockType';

interface IProps {
  navigation: any,
  route: any,
}

interface IState {
  modalVisible: boolean,
  modalText: string,
  isLoaded: boolean
}

const circle = "      ";

class Camera extends Component<IProps, IState> {
    private camera: any;
    private isTakingPicture: boolean;

    constructor(props: IProps){
      super(props);

      this.state = {
        modalVisible: false,
        modalText: 'Le scan a échoué, veuillez réessayer',
        isLoaded: false
      }

      this.isTakingPicture = false;
    }
    

    setModalVisible = (visible: boolean) => {
      this.setState({modalVisible: visible})
    }

    async componentDidMount() {
      await Permission.checkPermission(PERMISSION_TYPE.camera);
      this.setState({isLoaded: true})
    }

    render() {
      const {modalVisible} = this.state;
      return (
        <View style={styles.container}>
          {this.state.isLoaded &&
          <RNCamera style={styles.preview} ref={ref => {this.camera = ref;}} type={RNCamera.Constants.Type.back} flashMode={RNCamera.Constants.FlashMode.off} captureAudio={false} /> }
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.detectText(this.props.navigation)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}>{circle}</Text>
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
  
    detectText = async (navigation: any) => {
      try {
        if (this.isTakingPicture)
          return;

        this.isTakingPicture = true;

        const options = {
          quality: 0.8,
          base64: true,
          orientation: RNCamera.Constants.Orientation.portrait,
          fixOrientation: true
        };
        
        const { uri } = await this.camera.takePictureAsync(options);
        var visionResp = await RNTextDetector.detectFromUri(uri);

        modifyCoordinates(visionResp);
        visionResp = dropProblematicTokens(visionResp);
        // Change here visionResp to force the detection
        visionResp = [{text: 'Mustache'}, {text: 'Repeter'}, {text: '3'}, {text: 'avancer'}, {text: 'Si'}, {text: 'etre devant'}, {text: 'flaque'}, {text: 'sauter'}, {text: 'ou si'}, {text: 'etre sur'}, {text: 'fleur'}, {text: 'ramasser'},{text: 'fin'}, {text: 'fin'}];
        // visionResp = [{text: 'Mustache'}, {text: 'repeter'}, {text: '10'}]

        const result = parseInit(visionResp);

        // Discover Mode
        if (this.props.route.params && this.props.route.params.map) {
            navigation.navigate('Game',
                { actions: result[0], cameraMode: CameraMode.DISCOVER, 
                  mapInfo: this.props.route.params.map,
                  levelNumber: this.props.route.params.levelNumber,
                  levelType: this.props.route.params.levelType,
                });
            this.isTakingPicture = false;
        } // Start Mode
        else {
          navigation.navigate('Game', {actions: result[0], blockSchemaTypeList: result[1], cameraMode: CameraMode.TUTORIAL, mapInfo: Maps.foret2, nCard: result[2]});
          this.isTakingPicture = false;
        }
      } catch (e) { // Error thrown by the parser
        this.setState({ modalText: e });
        this.setModalVisible(!this.state.modalVisible);
        this.isTakingPicture = false;
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