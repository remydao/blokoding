import React, {Component} from 'react';
import {View, StyleSheet, Image, SafeAreaView} from 'react-native';
import TextAnimator from '../components/TextAnimator';
import EngineConstants from '../constants/EngineConstants';

interface State {
    textAnimator: JSX.Element
}

class EnigmaScreen extends Component<{}, State> {
    private content : Array<any> = ["Le personnage que tu choisiras sera celui qui s’affichera dans la scène et qui effectuera les actions que tu lui indiquera ensuite.Afin d’afficher Mr. Mustache, sélectionne sa carte personnage (rouge) et pose-la devant toi.Ensuite, clique sur le bouton ci-dessous et prend la carte en photo.", "Test 2 ou est tu ezuniueufez uezfui fe zuzefu zfeu zefuzeez hzfehuezfh ezhueepersonnage. Le personnage que tu choisiras sera celui qui s’affichera dans la scène et qui effectuera les actions que tu lui indiquera ensuite.Afin d’afficher Mr. Mustache, sélectionne sa carte personnage (rouge) et pose-la devant toi. "];
    private index : number = 0

    constructor(props) {
        super(props);
        this.state = {
            textAnimator: <TextAnimator content={this.content[0]}></TextAnimator>,
        }
    }

    onPressButton = () => {
        console.log('Press Button')
        this.index++;
        this.setState({
            textAnimator: <TextAnimator content={this.content[this.index]}></TextAnimator>
        });
    }


    render() {
        return (
                <SafeAreaView style={styles.container}>
                    <Image source={require('../assets/empty_messageBox.png')} style={styles.popupImage} resizeMode="contain"/>
                    <View style={styles.animatedText}>
                            {this.state.textAnimator}
                    </View>

                    <Image source={require('../assets/characters/Charlie/1x/Charlie.png')} style={styles.image}></Image>
                    {/* <Button
                        onPress={this.onPressButton}
                        title="OK!"
                        color="#841584"
                        style={styles.cameraBtn}
                    /> */}
                </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple'
    },
    popupImage:{
        position:'absolute',
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
    },
    animatedText:{
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        paddingBottom: EngineConstants.MAX_HEIGHT / 7,
    },
    cameraBtn:{
        position:'absolute'
    },
    image: {
        position: 'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 7,
        left: -EngineConstants.MAX_WIDTH / 30,
    }
})

export default EnigmaScreen;