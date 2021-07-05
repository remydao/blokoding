import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Animated} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import { CameraMode } from '../constants/CameraMode';
import LottieView from 'lottie-react-native';


interface IEndProps {
    onPress: () => void,
    text: string
}

const EndButton = ({onPress, text} : IEndProps) => {
    return (
        <TouchableOpacity onPress={() => onPress()} >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity> 
    )
}

interface IProps {
    color: string,
    text: string,
    cameraMode: CameraMode,
    hasWon: boolean,
    backToSelectLevels: () => void,
    backToLevelFailed: () => void,
}

export default class Overlay extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0)
        }
    }

    fadeInText = () => {
    }
    //<Text style={[styles.textStyle, {color: this.props.color, zIndex: 10}]}>{this.props.text}</Text>
    
    render(){
        return (
            <View style= {[styles.overlay_container]}>
                <Text style={[styles.textStyle, {color: this.props.color, zIndex: 10, top: -EngineConstants.MAX_HEIGHT / 10}]}>{this.props.text}</Text>
                {this.props.hasWon ? (
                    <View style={styles.anim_container}>
                        <LottieView
                            style={styles.anim}
                            source={require('../assets/lotties/fireworks.json')}
                            autoPlay
                            loop={true}
                        />
                        <LottieView
                            style={{height:400, width: 400, position: 'absolute'}}
                            source={require('../assets/lotties/winner.json')}
                            autoPlay
                            loop={false}
                        />
                    </View>) :
                    (
                    <View style={styles.anim_container}>
                        <LottieView
                            style={{height:300, width: 300, position: 'absolute', top: -EngineConstants.MAX_HEIGHT / 20}}
                            source={require('../assets/lotties/raining-clouds.json')}
                            autoPlay
                            loop={true}
                        />
                    </View>)
                }
                <View style={[styles.overlay]}>
                </View>
                {(this.props.cameraMode == CameraMode.DISCOVER) &&
                    <View style={{...styles.button, top: EngineConstants.MAX_HEIGHT / 8}}>
                        {this.props.hasWon ? 
                        <EndButton onPress={this.props.backToSelectLevels} text="Retour à l'écran de sélection des niveaux" /> :
                        <EndButton onPress={this.props.backToLevelFailed} text="Essaie encore !"/>}
                    </View>
                    }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    anim_container: {
        zIndex: 11,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
    },
    anim: {
        height: 200,
        width: 200,
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
        zIndex: -1,
        justifyContent: 'center'
    },
    overlay_container: {
        position: 'absolute',
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        opacity: 10,
        zIndex: 4,
    },
    button:{
        top: 10,
        backgroundColor: "lightgreen",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 15
    },
    buttonText:{
        fontSize: 18,
        color: "#000",
        alignSelf: "center",
        textAlign:'center',
        fontFamily:"Pangolin-Regular",
    }
})