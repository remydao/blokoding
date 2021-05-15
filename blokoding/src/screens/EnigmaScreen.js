import React, {Component} from 'react';
import { ImageBackground } from 'react-native';
import {View, StyleSheet, Image} from 'react-native';
import TextAnimator from '../components/TextAnimator';


class EnigmaScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require("../assets/empty_messageBox.png")} style={styles.theImage}></Image>
                <TextAnimator content="Je suis un texte vraiment très long qui a pour but de tester le enigma screen.... Est ce que ca fonctionne ?"></TextAnimator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#cbcef8',
        alignItems: 'center',
        //padding: 30,
    },
    theImage: {
        width: "100%",
        height: "50%",
        //resizeMode: "contain",
        //position: 'relative',
        //top: -10,
        //left: 70
    }
})

export default EnigmaScreen;