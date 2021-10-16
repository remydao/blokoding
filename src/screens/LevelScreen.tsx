import React, { Component } from 'react';
import {View, StyleSheet, Button, StatusBar, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
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
    textAnimator: JSX.Element,
    displayCarousel: boolean,
    imageSource: any,
}


const itemWidth = EngineConstants.MAX_WIDTH / 7;
const itemHeight = EngineConstants.MAX_HEIGHT / 15;
class MyCarousel extends Component {
    
    constructor(props : any){
        super(props);
        this._carousel = {}
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
            <View>
                <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.content}
                renderItem={this._renderItem}
                sliderWidth={EngineConstants.MAX_WIDTH / 1.2}
                sliderHeight={itemHeight}
                itemWidth={itemWidth + 50}
                containerCustomStyle={{backgroundColor: '#E4965F', opacity:1, borderRadius:30, paddingVertical: 10}}
                contentContainerCustomStyle={{opacity: 1}}
                />
                <Image style={{position: 'absolute', height:EngineConstants.MAX_HEIGHT / 25, width: EngineConstants.MAX_WIDTH / 15, top: EngineConstants.MAX_HEIGHT / 11, alignSelf: 'center' }} source={require('../assets/touch.png')}/>
            </View>

            
        );
    }
}

const CharlieImages = [
    require(`../assets/characters/Charliev2/1x/Charlie1.png`),
    require(`../assets/characters/Charliev2/1x/Charlie2.png`),
    require(`../assets/characters/Charliev2/1x/Charlie3.png`)
]


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
    private interval: any;

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
        this.interval = null;
        this.state = {
            buttonText: this.tutorial.length === 1 ? "\nC\'est parti !\n" : "\nSuivant\n",
            textAnimator: <TextAnimator key={this.index} content={this.tutorial[this.index]}></TextAnimator>,
            displayCarousel: false,
            imageSource: null,
        }
    }

    componentDidMount() {
        this.launchCharlieAnimation();
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    launchCharlieAnimation(){
        this.interval = setInterval(() => {
            let pictureNumber = Math.floor(Math.random() * (2 - 0 + 1) + 0)
            this.setState({ imageSource: CharlieImages[pictureNumber] })
        }, 300);
        setTimeout(() => clearInterval(this.interval), this.tutorial[this.index].length * 20);
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
            clearInterval(this.interval);
            this.launchCharlieAnimation();
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
                
                <View style={styles.container}>
                    <Image source={require('../assets/empty_messageBox.png')} style={styles.popupImage} resizeMode="stretch"/>
                    <View style={styles.animatedText}>
                        <View style={styles.animatedTextStyle}>{this.state.textAnimator}</View>
                    </View>
                    <Image source={this.state.imageSource} style={styles.image}></Image>
                    
                    <TouchableOpacity style={styles.info} onPress={() => this.setState({displayCarousel: !this.state.displayCarousel})}>
                        <Image resizeMode='contain' style={styles.infoImage} source={require('../assets/lightbulb.png')}/>
                    </TouchableOpacity>
                    <View style={styles.carousel}>
                        {this.state.displayCarousel &&
                        <MyCarousel content={this.content}/>}
                    </View>
                    <View style={styles.openCamera}>
                        <AwesomeButton onPress={this.onPressNextButton} textColor="#2e84b2" {...styles.button}>
                            <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                            {this.state.buttonText !== "\nSuivant\n" &&
                            <Image style={{position:'absolute', right: -EngineConstants.MAX_WIDTH / 8}} height={30} width={30} source={require('../assets/smartphone.png')}/>}
                        </AwesomeButton>
                    </View>
                    <StatusBar translucent backgroundColor="transparent"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        zIndex: 1,
        position: 'absolute',
        backgroundColor: '#E4965F',
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
        backgroundColor: 'beige',
    },
    popupImage: {
        position:'absolute',
        top: EngineConstants.MAX_HEIGHT / 7,
        width: EngineConstants.MAX_WIDTH,
        height: EngineConstants.MAX_HEIGHT / 2,
    },
    animatedText: {
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        top: EngineConstants.MAX_HEIGHT / 4.5,
        paddingBottom: EngineConstants.MAX_HEIGHT / 7,
        paddingHorizontal: EngineConstants.MAX_WIDTH / 20,
    },
    animatedTextStyle:{
        fontFamily: "Pangolin-Regular",
        fontSize: 30,
    },
    openCamera: {
        fontFamily: "Pangolin-Regular",
        position:'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 4,
        left: EngineConstants.MAX_WIDTH / 2.5,
        borderRadius: 10,
        width: EngineConstants.MAX_WIDTH / 2,
    },
    info: {
        top: EngineConstants.MAX_HEIGHT / 3.5,
    },
    infoImage: {
        height: EngineConstants.MAX_HEIGHT / 20,
        width: EngineConstants.MAX_WIDTH / 10
    },
    carousel: {
        position: 'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 13,
    },
    image: {
        position: 'absolute',
        bottom: EngineConstants.MAX_HEIGHT / 4.5,
        left: -EngineConstants.MAX_WIDTH / 30,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        width:"100%",
        backgroundColor:"#E4965F",
        justifyContent: 'center',
        textAlignVertical:'center',
        textAlign: 'center',
    },
    buttonText: {
        fontFamily: "Pangolin-Regular",
        fontSize: 18,
        top: -EngineConstants.MAX_HEIGHT / 100
    }
})

export default LevelScreen;