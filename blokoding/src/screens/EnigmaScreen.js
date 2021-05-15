import React, {Component} from 'react';
import { ImageBackground } from 'react-native';
import {View, StyleSheet, Image, Text, Button, Animated, TouchableHighlight} from 'react-native';
import TextAnimator from '../components/TextAnimator';


class EnigmaScreen extends Component {
    constructor(props) {
        super(props);
        this.content = ["personnage. Le personnage que tu choisiras sera celui qui s’affichera dans la scène et qui effectuera les actions que tu lui indiquera ensuite.Afin d’afficher Mr. Mustache, sélectionne sa carte personnage (rouge) et pose-la devant toi.Ensuite, clique sur le bouton ci-dessous et prend la carte en photo.", "Test 2 ou est tu ezuniueufez uezfui fe zuzefu zfeu zefuzeez hzfehuezfh ezhueepersonnage. Le personnage que tu choisiras sera celui qui s’affichera dans la scène et qui effectuera les actions que tu lui indiquera ensuite.Afin d’afficher Mr. Mustache, sélectionne sa carte personnage (rouge) et pose-la devant toi. "];
        this.index = 0;
        this.state = {
            textAnimator: <TextAnimator content={this.content[0]}></TextAnimator>,
        }
    }

    onPressButton() {
        console.log('Press Button')
        this.index++;
        this.setState({
            textAnimator: <TextAnimator content={this.content[this.index]}></TextAnimator>
        });
    }

    componentDidMount() {
    }

    render() {
        return (
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/empty_messageBox.png')} style={{width: '100%', height: '100%', position: 'relative', top: -70, right: -20}} resizeMode="contain">
                        {this.state.textAnimator}
                        <Image source={require('../assets/characters/Charlie/1x/Charlie.png')} style={{position: 'relative', bottom: -390, left: -30}}></Image>
                    </ImageBackground>
                    <Button
                        onPress={this.onPressButton.bind(this)}
                        title="OK!"
                        color="#841584"
                        style={{}}
                    />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#cbcef8',
        alignItems: 'center',
        //padding: 30,
    },
})

export default EnigmaScreen;