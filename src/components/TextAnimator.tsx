import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Colors from '../constants/Colors';
import Translation from '../datas/translation.json';
import LanguageContext from '../context/LanguageContext';
import EngineConstants from '../constants/EngineConstants';


interface IProps {
    content: String
}

interface IState {
    animatedValues: Array<any>
}

export default class TextAnimator extends Component<IProps, IState> {
    
    private textArray : Array<any> = []
    // Créé le tableau de mots passé en props et rempli
    // le tableau animatedValues avec des Value à 0
    constructor(props: IProps) {
        super(props);
        this.state = {
            animatedValues: []
        }
    }
    

    // Est appelé au lancement pour set les animations 
    animated(toValue = 1) {
        const animations = this.textArray.map((_, index) => {
            return Animated.timing(this.state.animatedValues[index],
                {
                    toValue: toValue,
                    duration: 500,
                    useNativeDriver: true,
                })
        });

        // start les animations une par une toute les 100ms dans le tableau animations
        Animated.stagger(100, animations).start();
    }

    
    componentDidMount() {
        this.textArray = this.props.content.trim().split(' ');

        this.textArray.forEach((_, index) => {
            this.state.animatedValues[index] = new Animated.Value(0);
        });

        this.setState({
            animatedValues: this.state.animatedValues
        })
        this.animated();
    }

    getColor(word : string, language: any){
        const languageObj = Translation[language.language];
        switch(word.toLowerCase()){
            case languageObj.character:
            case `${languageObj.character}s`:
                return Colors.character
            case languageObj.action:
            case `${languageObj.action}s`:
                return Colors.action
            case languageObj.instruction:
            case `${languageObj.instruction}s`:
                return Colors.instruction
            case languageObj.condition:
            case `${languageObj.condition}s`:
                return Colors.condition
            case languageObj.item:
            case `${languageObj.item}s`:
                return Colors.item
            case languageObj.environnement:
            case `${languageObj.environnement}s`:
                return Colors.environnement
            case languageObj.number:
            case `${languageObj.number}s`:
                return Colors.number
        }
    }
    
    colorWord(word : string){
        
        return (
            <LanguageContext.Consumer>
                {language =>
                    <Text style={{color: this.getColor(word, language)}}>{word}</Text>
                }
            </LanguageContext.Consumer>
            )
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                { this.textArray.map((word, index) => {
                    return (
                        <Animated.Text
                        key={'word' + index} 
                        style={{...styles.textStyle, opacity: this.state.animatedValues[index]}}>
                            {this.colorWord(word)}
                            { index < this.textArray.length - 1 ? ' ' : ''}
                        </Animated.Text>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: '95%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textStyle: {
        fontFamily:'Pangolin-Regular',
        fontSize: 20,
        lineHeight: EngineConstants.MAX_HEIGHT / 30
    }
})