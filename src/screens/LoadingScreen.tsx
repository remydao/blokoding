import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { CameraMode } from '../constants/CameraMode';
import { characterImages, getCharacterImages } from '../constants/CharacterImages';
import { EnvironmentImages } from '../constants/EnvironmentImages';
import { ItemImages } from '../constants/ItemImages';

interface IProps {
    navigation: any,
    route: any,
}

interface IState {
}

class Loading extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.loadImagesKeyValue(this.props.route.params.mapInfo.theme).then(results => {

            let objectsImagesArray: any[] = [];
            Object.values(ItemImages).map(i => {
                objectsImagesArray.push(i.uri);
            });

            Object.values(EnvironmentImages).map(i => {
                objectsImagesArray.push(i.uri);
            }); 

            this.loadImagesArray(objectsImagesArray).then(res => {
                if (this.props.route.params.cameraMode == CameraMode.TEST)
                {
                    this.loadImage(characterImages.MrMustache.uri).then(r => {
                        this.goToGame();
                    });
                }
                else
                {
                    console.log(this.props.route.params.actions.character);
                    this.loadImage(getCharacterImages(this.props.route.params.actions.character)).then(r => {
                        this.goToGame();
                    });
                }
            })

            
        });
    };

    goToGame() {
        this.props.navigation.navigate("Game",
        {
            actions: this.props.route.params.actions,
            cameraMode: this.props.route.params.cameraMode, 
            mapInfo: this.props.route.params.mapInfo,
            levelNumber: this.props.route.params.levelNumber,
            levelType: this.props.route.params.levelType,
        });
    }
    

    // Convert image refs into image objects with Image.resolveAssetSource
    async loadImagesKeyValue(images: any) {
        console.log("loadImagesKeyValue");     
        return Promise.all(Object.keys(images).map((i) => {
            let img = {
                ...Image.resolveAssetSource(images[i]),
                cache: 'force-cache'
            };
            return Image.prefetch(img.uri);
        }));
    }

    async loadImagesArray(images: any[]) {
        console.log("loadImagesArray");    
        return Promise.all(images.map(element => {
            let img = {
                ...Image.resolveAssetSource(element),
                cache: 'force-cache'
            };
            return Image.prefetch(img.uri);
        }));  
    }

    async loadImage(image: any) {
        console.log("loadImage");    
        let img = {
            ...Image.resolveAssetSource(image),
            cache: 'force-cache'
        }
        return Image.prefetch(img.uri);
    }

    render() {
        return (
            <View>
                <Text style={{textAlign: 'center'}}>Chargement en cours...</Text>
            </View>
        );
    };
};

export default Loading;