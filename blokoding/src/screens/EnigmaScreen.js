import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import TextAnimator from '../components/TextAnimator';


class EnigmaScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextAnimator content="Je suis un texte vraiment très long qui a pour but de tester le enigma screen.... Est ce que ca fonctionne ?"></TextAnimator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8
    },
})

export default EnigmaScreen;