import React, {Component, useRef } from 'react';
import {View, Image, Button, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Character from "../components/Character";
import BackgroundGame from "../components/BackgroundGame";
import { Tooltip, Text } from 'react-native-elements';

export default class Game extends Component {

    tooltipRef = null;

    constructor(props) {
        super(props);
        this.tooltipRef = React.createRef();
    }

    componentDidMount() {
        this.tooltipRef.current.toggleTooltip();
    }

    render() {
        if (this.props.params && this.props.params.visionResp && this.props.params.visionResp.length > 0)
        {
            return (
                <GameEngine
                style={{flex:1}}
                systems={[]}
                entities={{
                    1: { position: [0,0], renderer: <BackgroundGame/> },
                    2: { position: [0, 500], characterName: this.props.route.params.visionResp[0].text, renderer: <Character/> },
                }}>
                <StatusBar hidden={true} />
                </GameEngine>
            )
        }
        else
        {
            return (
                <Tooltip ref={this.tooltipRef} popover={<Text>No character found.</Text>}/>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }
})