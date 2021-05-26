import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import EngineConstants from '../constants/EngineConstants';
import { CameraMode } from '../constants/CameraMode';

const EndButton = ({onPress, text}) => {
    return (
        <TouchableOpacity onPress={() => onPress()} >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity> 
    )
}

export default class Overlay extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style= {[styles.overlay_container]}>
                <Text style={[styles.textStyle, {color: this.props.color}]}>{this.props.text}</Text>
                <View style={[styles.overlay]}>
                </View>
                {(this.props.cameraMode == CameraMode.DISCOVER) &&
                    <View style={styles.button}>
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
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
        zIndex: 4,
        justifyContent: 'center'
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
        elevation: 10,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginHorizontal: 15
    },
    buttonText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textAlign:'center'
    }
})