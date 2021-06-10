import React from 'react';
import {View, StyleSheet, Button, StatusBar, SafeAreaView, Image} from 'react-native';
import {levelsTexts} from '../constants/LevelsDetails';
import Colors from '../constants/Colors';
import TextAnimator from '../components/TextAnimator';
import EngineConstants from '../constants/EngineConstants';
import CustomHeader from '../components/CustomHeader';

interface IProps {
    navigation: any,
    route: any,
}

interface IState {
    buttonText: string,
    textAnimator: JSX.Element
}

class LevelScreen extends React.Component<IProps, IState> {

    private readonly levelNumber: number;
    private readonly levelInfo;
    private readonly title: string;
    private readonly tutorial: Array<string>;
    private readonly congratulations: string;
    private readonly map: object;
    private index: number;

    constructor(props: IProps) {
        super(props);
        this.levelNumber = this.props.route.params.levelNumber;
        this.levelInfo = levelsTexts[this.levelNumber];
        this.title = this.levelInfo.title;
        this.tutorial = this.levelInfo.tutorial;
        this.congratulations = this.levelInfo.congratulations;
        this.map = this.levelInfo.map
        this.index = 0;
        this.state = {
            buttonText: this.tutorial.length === 1 ? "\nOuvrir la caméra\n" : "\nSuivant\n",
            textAnimator: <TextAnimator key={this.index} content={this.tutorial[0]}></TextAnimator>,
        }
    }

    onPressNextButton = () => {
        this.index++;
        if (this.index < this.tutorial.length)
        {
            if (this.index === this.tutorial.length - 1)
            {
                this.setState({
                    buttonText: "\nOuvrir la caméra\n"
                });
            }
            this.setState({
                textAnimator: <TextAnimator key={this.index} content={this.tutorial[this.index]}></TextAnimator>
            })
        }
        else
        {
            this.props.navigation.navigate('Take Picture', {
                map: this.map,
                levelNumber: this.levelNumber
            })
        }
    }

    
    render(){
        return (
            <SafeAreaView style={styles.bigContainer}>

                <CustomHeader style={styles.header} textStyle={styles.textStyle} title={`Niveau ${(this.levelNumber + 1)}`} isLogo={false}/>

                <SafeAreaView style={styles.container}>
                    {/* <Header 
                        centerComponent={{ text: `Niveau ${(this.levelNumber + 1)}`, style: styles.header }}
                    /> */}
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
                        />
                    </View>
                    <StatusBar translucent backgroundColor="transparent"/>
                </SafeAreaView>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    header: {
        zIndex: 1,
        position: 'absolute',
        backgroundColor: 'lightblue',
        paddingTop: 15,
        height: EngineConstants.MAX_HEIGHT/ 8,
    },
    textStyle: {
        fontSize: 30,
        fontFamily: 'Pangolin-Regular'
    },
    bigContainer: {
        flex: 1,
        alignItems: 'center'
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cbcef8',
    },

    popupImage: {
        position:'absolute',
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT,
    },
    animatedText: {
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        left : EngineConstants.MAX_WIDTH / 40,
        paddingBottom: EngineConstants.MAX_HEIGHT / 7,
        paddingHorizontal: EngineConstants.MAX_WIDTH / 20,
    },
    openCamera: {
        position:'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 4,
        left: EngineConstants.MAX_WIDTH / 2.5,
        borderRadius: 10,
        width: EngineConstants.MAX_WIDTH / 2,
        overflow: 'hidden', // for borderRadius
    },
    image: {
        position: 'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 7,
        left: -EngineConstants.MAX_WIDTH / 30,
    }
})

export default LevelScreen;