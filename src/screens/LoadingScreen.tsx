import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

interface IProps {
    navigation: any,
    route: any,
}

interface IState {
}

const imagesToLoad = {
    '../assets/backgrounds/forest_background1.png': require('../assets/backgrounds/forest_background1.png'),
    '../assets/backgrounds/forest_background2.png': require('../assets/backgrounds/forest_background2.png'),

    '../assets/backgrounds/workshop_background1.png': require('../assets/backgrounds/workshop_background1.png'),
    '../assets/backgrounds/workshop_background2.png': require('../assets/backgrounds/workshop_background2.png'),
};

class Loading extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.loadImages(imagesToLoad).then(results => {
            this.props.navigation.navigate("Game",
            {
                actions: this.props.route.params.actions,
                cameraMode: this.props.route.params.cameraMode, 
                mapInfo: this.props.route.params.mapInfo,
                levelNumber: this.props.route.params.levelNumber,
                levelType: this.props.route.params.levelType,
            })
        });
    };
    

    // Convert image refs into image objects with Image.resolveAssetSource
    async loadImages(images: any) {  
        console.log("load images");      
        return Promise.all(Object.keys(images).map((i) => {
            let img = {
                ...Image.resolveAssetSource(images[i]),
                cache: 'force-cache'
            };
            console.log(i);
            return Image.prefetch(img.uri);
        }));
    }

    render() {
        return (
            <View>
                <Text>Chargement en cours...</Text>
            </View>
        );
    };
};

export default Loading;