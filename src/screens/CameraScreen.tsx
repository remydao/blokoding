import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "rn-text-detector";
import {Permission, PERMISSION_TYPE} from '../AppPermission'
import Maps from '../constants/Maps';
import {parseInit} from '../scripts/parsing/Parser';
import { CameraMode } from '../constants/CameraMode';

interface IProps {
  navigation: any,
  route: any
}

interface IState {
  modalVisible: boolean,
  modalText: string
}

const MAX_DEVIATION_NUMBER = 3;
const MAX_LEVENSHTEIN_DISTANCE = 2;

const circle = "      ";

class Camera extends Component<IProps, IState> {
    private camera: any;
    constructor(props: IProps){
      super(props)
      this.state = {
        modalVisible: false,
        modalText: 'Le scan a échoué, veuillez réessayer'
      }
    }
    

    setModalVisible = (visible: boolean) => {
      this.setState({modalVisible: visible})
    }

    componentDidMount() {
      Permission.checkPermission(PERMISSION_TYPE.camera)
    }

    render() {
      const {modalVisible} = this.state;
      return (
        <View style={styles.container}>
          
          <RNCamera style={styles.preview} ref={ref => {this.camera = ref;}} type={RNCamera.Constants.Type.back} flashMode={RNCamera.Constants.FlashMode.off} captureAudio={false} />
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
        const options = {
          quality: 0.8,
          base64: true,
          orientation: RNCamera.Constants.Orientation.portrait,
          fixOrientation: true
        };
        
        const { uri } = await this.camera.takePictureAsync(options);
        const visionResp = await RNTextDetector.detectFromUri(uri);
        // Mettre ttes les cartes en deuxieme argument
        //this.checkVisionResp(visionResp, []);
        //const visionResp = [{text: "Bart"}, {text: "Sauter"}, {text: "repeter"}, {text: "50"}, {text: "si"}, {text: "est devant"}, {text: "buisson"}, {text: "avancer"}, {text: "fin"}, {text: "si"}, {text: "est devant"}, {text: "buisson"}, {text: "avancer"}, {text: "fin"}, {text: "fin"}]

        const actions = parseInit(visionResp);
        // Discover Mode
        if (this.props.route.params && this.props.route.params.map){
            navigation.navigate('Game', {actions: actions, cameraMode: CameraMode.DISCOVER, mapInfo: this.props.route.params.map});
        } // Start Mode
        else {
          navigation.navigate('Game', {actions: actions, cameraMode: CameraMode.TUTORIAL, mapInfo: Maps.foret1});
        }
      } catch (e) { //Error thrown by the parser
        this.setState({modalText: e})
        this.setModalVisible(!this.state.modalVisible)
      }
    };

    levenshteinDistance = (str1: string, str2: string) => {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
      const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
      for (let i = 0; i <= str1.length; i += 1) {
          track[0][i] = i;
      }
      for (let j = 0; j <= str2.length; j += 1) {
          track[j][0] = j;
      }
      for (let j = 1; j <= str2.length; j += 1) {
          for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
              track[j][i - 1] + 1, // deletion
              track[j - 1][i] + 1, // insertion
              track[j - 1][i - 1] + indicator, // substitution
          );
          }
      }
      return track[str2.length][str1.length];
    };

    deviationMatching = (first: string, second: string, num: number) => {
      let count = 0;
      let firstComparator = first.length > second.length ? first.toLowerCase() : second.toLowerCase();
      let secondComparator = first.length > second.length ? second.toLowerCase() : first.toLowerCase();
      for(let i = 0; i < firstComparator.length; i++){
        if(!secondComparator.includes(firstComparator[i])){
            count++;
        };
        if(count > num){
            return false;
        };
      };
      return true;
    };

    checkVisionResp = (visionResp: string[] , allCards: string[]) => {
        var i = 0;
        visionResp.forEach(element => {
            allCards.forEach(card => {
                if (this.deviationMatching(element, card, MAX_DEVIATION_NUMBER)) {
                    if (this.levenshteinDistance(element, card) <= MAX_LEVENSHTEIN_DISTANCE) {
                      visionResp[i] = card;
                    }
                }
            });
            i++;
      });
    }
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