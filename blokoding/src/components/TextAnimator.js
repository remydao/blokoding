import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

export default class TextAnimator extends Component {
    animatedValues = [];

    // crée le tableau de mots passé en props et rempli le tableau animatedValues avec des Value à 0
    constructor(props) {
        super(props);

        this.textArray = this.props.content.trim().split(' ');

        this.textArray.forEach((_, index) => {
            this.animatedValues[index] = new Animated.Value(0);
        });
    }

    componentDidMount(){
        this.animated();
    }

    // Est appelé au lancement pour set les animations 
    animated(toValue = 1){
        const animations = this.textArray.map((_, index) => {
            return Animated.timing(this.animatedValues[index],
                {
                    toValue: toValue,
                    duration: 500,
                    useNativeDriver: true,
                })
        });

        // start les animations une par une toute les 100ms dans le tableau animations
        Animated.stagger(100, animations).start();
    }

    render(){
        return (
            <View style={styles.containerStyle}>
                { this.textArray.map((word, index) => {
                    return (
                        <Animated.Text 
                        key={'word' + index} 
                        style={[styles.textStyle, {opacity: this.animatedValues[index]}]}>
                            {word}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute', // child
        //top: -300, // position where you want
        //left: 80,
        //paddingRight: 60,
        //marginRight: 60
        margin: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        zIndex: 4,
        //marginBottom: 14
    }
})