import React from 'react';
import {View, Text, StyleSheet, Button, StatusBar, SafeAreaView, Image} from 'react-native';
import {levelsTexts} from '../constants/LevelsDetails';
import Colors from '../constants/Colors';
import TextAnimator from '../components/TextAnimator';
import EngineConstants from '../constants/EngineConstants';


class LevelScreen extends React.Component {
    
    constructor(props){
        super(props);
        const {route} = this.props;
        this.levelNumber = route.params.levelNumber;
        this.levelInfo = levelsTexts[this.levelNumber];
        this.title = this.levelInfo.title;
        this.tutorial = this.levelInfo.tutorial;
        this.congratulations = this.levelInfo.congratulations;
        this.map = this.levelInfo.map
        this.index = 0;
        this.state = {
            buttonText: this.tutorial.length === 1 ? "Ouvrir la caméra" : "Suivant",
            textAnimator: <TextAnimator content={this.tutorial[0]}></TextAnimator>,
        }
    }

    onPressNextButton = () => {
        console.log('Press Button')

        this.index++;

        if (this.index < this.tutorial.length)
        {
            if (this.index === this.tutorial.length - 1)
            {
                this.setState({
                    buttonText: "Ouvrir la caméra"
                });
            }

            this.setState({
                textAnimator: <TextAnimator content={this.tutorial[this.index]}></TextAnimator>
            })
        }
        else
        {
            this.props.navigation.navigate('Take Picture', {
                map: this.map
            })
        }
    }

    
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/empty_messageBox.png')} style={styles.popupImage} resizeMode="contain"/>
                <View style={styles.animatedText}>
                        {this.state.textAnimator}
                </View>
                {/* <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.tutorial}>{tutorial}</Text>
                </View>
                <Text>{congratulations}</Text> */}
    
                <Image source={require('../assets/characters/Charlie/1x/Charlie.png')} style={styles.image}></Image>

                <View style={styles.openCamera}>   
                    <Button
                        onPress={this.onPressNextButton.bind(this)}
                        title={this.state.buttonText}
                        color={Colors.dark_turquoise}
                        style={styles.cameraBtn}
                    />
                </View>
                <StatusBar translucent backgroundColor="transparent"/>
            </SafeAreaView>
        )
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
    openCamera:{
        position:'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 4,
        left: EngineConstants.MAX_WIDTH / 2.5,
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

export default LevelScreen;