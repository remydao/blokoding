import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

export default class TextAnimator extends Component {
    animatedValues = [];

    // crée le tableau de mots passé en props et rempli le tableau animatedValues avec des Value à 0
    constructor(props) {
        console.log("Constructor");
        super(props);

        this.textArray = this.props.content.trim().split(' ');
    }

    componentDidMount(){
        console.log('CDM');
    }

    // Est appelé au lancement pour set les animations 
    animated(toValue = 1){
        const animations = this.props.content.trim().split(' ').map((_, index) => {
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
        this.props.content.trim().split(' ').forEach((_, index) => {
            this.animatedValues[index] = new Animated.Value(0);
        });
        this.animated();

        console.log('Render Animator');
        return (
            <View style={styles.containerStyle}>
                { this.props.content.trim().split(' ').map((word, index) => {
                    return (
                        <Animated.Text 
                        key={'word' + index} 
                        style={[styles.textStyle, {opacity: this.animatedValues[index]}]}>
                            {word}
                            { index < this.props.content.trim().split(' ').length - 1 ? ' ' : ''}
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
        marginLeft: 40,
        marginRight: 45,
        top: 150
        //justifyContent: 'center',
        //alignItems: 'center',
        //alignSelf: "stretch"
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
        zIndex: 4,
        //marginBottom: 14
    }
})