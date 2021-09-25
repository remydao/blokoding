import React, { Component } from 'react';
import {View, StyleSheet, Button, StatusBar, SafeAreaView, Image, Text} from 'react-native';
import {tutorialInfo} from '../constants/TutorialDetails';
import {enigmaInfo} from '../constants/EnigmaDetails';
import Colors from '../constants/Colors';
import TextAnimator from '../components/TextAnimator';
import EngineConstants from '../constants/EngineConstants';
import CustomHeader from '../components/CustomHeader';
import AwesomeButton from "react-native-really-awesome-button";
import Carousel from 'react-native-snap-carousel';

interface IProps {
    navigation: any,
    route: any,
}

interface IState {
    buttonText: string,
    textAnimator: JSX.Element
}


const itemWidth = EngineConstants.MAX_WIDTH / 7;
const itemHeight = EngineConstants.MAX_HEIGHT / 15;
class MyCarousel extends Component {

    constructor(props : any){
        super(props);
        this._carousel = {}
        console.log(this.props.content)
    }

    _renderItem = ({item, index} : any) => {
        return (
            <View style={{width: itemWidth, height: itemHeight, marginLeft: 25, marginRight: 25}}>

                <Image source={item.uri} style={{ flex: 1, width: null, height: null, resizeMode: 'contain'}}></Image>
            </View>
        );
    }

    render () {
        return (
            <View >
                <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.content}
                renderItem={this._renderItem}
                sliderWidth={EngineConstants.MAX_WIDTH / 1.2}
                sliderHeight={itemHeight}
                itemWidth={itemWidth + 50}
                containerCustomStyle={{backgroundColor: 'rgba(169, 211, 233, 1)', opacity:1, borderRadius:30, paddingVertical: 10}}
                contentContainerCustomStyle={{opacity: 1}}
                />
                <Text style={{textAlign: 'center', marginTop: 10}}>⬆︎</Text>

            </View>

            
        );
    }
}

class LevelScreen extends Component<IProps, IState> {

    private readonly levelNumber: number;
    private readonly levelInfo;
    private readonly levelType: string;
    private readonly title: string;
    private readonly tutorial: Array<string>;
    private readonly congratulations: string;
    private readonly map: object;
    private content: object;
    private index: number;

    constructor(props: IProps) {
        super(props);
        this.levelNumber = this.props.route.params.levelNumber;
        // string 'tutorial' or 'enigma'
        this.levelType = this.props.route.params.levelType;
        this.levelInfo = (this.levelType === 'tutorial') ? tutorialInfo[this.levelNumber] : enigmaInfo[this.props.route.params.theme][this.levelNumber];
        this.title = this.levelInfo.title;
        this.tutorial = this.levelInfo.tutorial;
        this.congratulations = this.levelInfo.congratulations;
        this.map = this.levelInfo.map;
        this.content = this.map.map.map((element : any) => element.content ? element.content : null)
        this.index = 0;
        this.state = {
            buttonText: this.tutorial.length === 1 ? "\nC\'est parti !\n" : "\nSuivant\n",
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
                    buttonText: "\nC\'est parti !\n"
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
                levelNumber: this.levelNumber,
                levelType: this.levelType,
            })
        }
    }
    
    render(){
        return (
            <View style={styles.bigContainer}>

                <CustomHeader style={styles.header} textStyle={styles.textStyle} title={`Niveau ${(this.levelNumber + 1)}`} isLogo={false}/>
                
                <SafeAreaView style={styles.container}>
                    {/* <Header 
                        centerComponent={{ text: `Niveau ${(this.levelNumber + 1)}`, style: styles.header }}
                    /> */}
                    <Image source={require('../assets/empty_messageBox.png')} style={styles.popupImage} resizeMode="contain"/>
                    <View style={styles.animatedText}>
                        <Text style={styles.animatedTextStyle}>{this.state.textAnimator}</Text>
                    </View>

                    <Image source={require('../assets/characters/Charlie/1x/Charlie.png')} style={styles.image}></Image>


                    <View style={styles.carousel}>
                        <MyCarousel content={this.content}/>
                    </View>
                    <View style={styles.openCamera}>
                        <AwesomeButton onPress={this.onPressNextButton} textColor="#2e84b2" {...styles.button}>
                            <Text>{this.state.buttonText}</Text>
                            {this.state.buttonText !== "\nSuivant\n" &&
                            <Image style={{position:'absolute', right: -EngineConstants.MAX_WIDTH / 8}} height={30} width={30} source={require('../assets/smartphone.png')}/>}
                        </AwesomeButton>
                    </View>
                    <StatusBar translucent backgroundColor="transparent"/>
                </SafeAreaView>
            </View>

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
        fontFamily: 'Pangolin-Regular',
        fontSize: 30
    },
    bigContainer: {
        flex:1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        width: '100%',
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
    animatedTextStyle:{
        fontFamily: "Pangolin-Regular",
        fontSize: 30
    },
    openCamera: {
        position:'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 4.5,
        left: EngineConstants.MAX_WIDTH / 2.5,
        borderRadius: 10,
        width: EngineConstants.MAX_WIDTH / 2,
    },
    carousel: {
        position: 'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 10,
    },
    image: {
        position: 'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 7,
        left: -EngineConstants.MAX_WIDTH / 30,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        width:"100%",
        backgroundColor:"#a9d3e9",
        justifyContent: 'center',
        textAlignVertical:'center',
        textAlign: 'center',
    }
})

export default LevelScreen;