import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

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

    render() {
        return (
            <View style={styles.containerStyle}>
                { this.textArray.map((word, index) => {
                    return (
                        <Animated.Text 
                        key={'word' + index} 
                        style={{...styles.textStyle, opacity: this.state.animatedValues[index]}}>
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
        width: '90%',
    },
    textStyle: {
        fontFamily:'Pangolin-Regular',
        fontSize: 16
    }
})