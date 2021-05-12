import { Characters } from './BlockType';

const characterImages = {
    Bart: {
        imageName: Characters.Bart,
        uri: require("../assets/characters/Bart/1x/Bart.png")
    },
    Charlie: {
        imageName: Characters.Charlie,
        uri: require("../assets/characters/Charlie/1x/Charlie.png")
    },
    Cyclops: {
        imageName: Characters.Cyclops,
        uri: require("../assets/characters/Cyclops/1x/Cyclops.png")
    },
    Dinny: {
        imageName: Characters.Dinny,
        uri: require("../assets/characters/Dinny/1x/Dinny.png")
    },
    Harry: {
        imageName: Characters.Harry,
        uri: require("../assets/characters/Harry/1x/Harry.png")
    },
    Kevin: {
        imageName: Characters.Kevin,
        uri: require("../assets/characters/Kevin/1x/Kevin.png")
    },
    MrMustache: {
        imageName: Characters.MrMustache,
        uri: require("../assets/characters/MrMoustache/1x/Mr_Moustache.png")
    },
    MsBrocoli: {
        imageName: Characters.MsBrocoli,
        uri: require("../assets/characters/MsBrocoli/1x/Ms_Brocoli.png")
    },
    Nosy: {
        imageName: Characters.Nosy,
        uri: require("../assets/characters/Nosy/1x/Nosy.png")
    }
}

const getCharacterUri = (character) => {
    return Object.entries(characterImages).filter(characImg => characImg[1].imageName == character)[0][1].uri;
}

export {characterImages, getCharacterUri};