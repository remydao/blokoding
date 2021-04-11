import React, {Component} from 'react';
import {View, Text, Image, Button, StatusBar, StyleSheet} from 'react-native';

export default class BackgroundGame extends Component {
    constructor(props){
        super(props);
        this.state= {
            imageSource:""
        }
    }

    componentDidMount(){
        this.setState({imageSource:require("../assets/images/background.png")});
    }

    render(){
        const x = this.props.position[0];
        const y = this.props.position[1];
        
        return (
            <View style={[styles.container2, {left: x, top: y}]}>
                <Image style={styles.background} source={this.state.imageSource} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container2:{
        zIndex:-1,
        flex:1
    },
    background:{
        flex:1,
        height:"100%",
        resizeMode:'stretch'
    }

})