import { Characters } from './BlockType';


const characterImages = {
    Bart: {
        imageName: Characters.Bart,
        uri: require("../assets/characters/Bart/1x/Bart.png"),
        defaultUri: 0,
    },
    Charlie: {
        imageName: Characters.Charlie,
        uri: require("../assets/characters/Charlie/1x/Charlie.png"),
        defaultUri: 0,
    },
    Cyclops: {
        imageName: Characters.Cyclops,
        uri: require("../assets/characters/Cyclops/1x/Cyclops.png"),
        defaultUri: 0,
    },
    Dinny: {
        imageName: Characters.Dinny,
        uri: require("../assets/characters/Dinny/1x/Dinny.png"),
        defaultUri: 0,
    },
    Harry: {
        imageName: Characters.Harry,
        uri: require("../assets/characters/Harry/1x/Harry.png"),
        defaultUri: 0,
    },
    MrMustache: {
        imageName: Characters.MrMustache,
        uri: {
            idle: require("../assets/characters/MrMustache/3x/Mr_Moustache.png"),
            move: [
                require("../assets/characters/MrMustache/walk.png")
            ],
            jump: [
                require("../assets/characters/MrMustache/jump1.png"),
                require("../assets/characters/MrMustache/jump2.png"),
                require("../assets/characters/MrMustache/jump3.png"),
                require("../assets/characters/MrMustache/jump4.png")
            ],
            crouch: [
                require("../assets/characters/MrMustache/crouch1.png"),
                require("../assets/characters/MrMustache/crouch2.png")
            ]
        }

    },
    Kevin: {
        imageName: Characters.Kevin,
        uri: [
            require("../assets/characters/Kevin/Kevin1.png"),
            require("../assets/characters/Kevin/Kevin2.png"),
            require("../assets/characters/Kevin/Kevin3.png"),
            require("../assets/characters/Kevin/Kevin4.png"),
            require("../assets/characters/Kevin/Kevin5.png"),
            require("../assets/characters/Kevin/Kevin6.png"),
            require("../assets/characters/Kevin/Kevin7.png"),
            require("../assets/characters/Kevin/Kevin8.png"),
            require("../assets/characters/Kevin/Kevin9.png"),
            require("../assets/characters/Kevin/Kevin10.png"),
            require("../assets/characters/Kevin/Kevin11.png"),
            require("../assets/characters/Kevin/Kevin12.png"),
            require("../assets/characters/Kevin/Kevin13.png"),
            require("../assets/characters/Kevin/Kevin14.png"),
            require("../assets/characters/Kevin/Kevin15.png"),
            require("../assets/characters/Kevin/Kevin16.png"),
            require("../assets/characters/Kevin/Kevin17.png"),
            require("../assets/characters/Kevin/Kevin18.png"),
            require("../assets/characters/Kevin/Kevin19.png"),
            require("../assets/characters/Kevin/Kevin20.png"),
            require("../assets/characters/Kevin/Kevin21.png"),
            require("../assets/characters/Kevin/Kevin22.png"),
            require("../assets/characters/Kevin/Kevin23.png"),
            require("../assets/characters/Kevin/Kevin24.png"),
            require("../assets/characters/Kevin/Kevin25.png"),
            require("../assets/characters/Kevin/Kevin26.png"),
            require("../assets/characters/Kevin/Kevin27.png"),
            require("../assets/characters/Kevin/Kevin28.png"),
            require("../assets/characters/Kevin/Kevin29.png"),
            require("../assets/characters/Kevin/Kevin30.png"),
        ],
        defaultUri: 19,
    },
    
    MsBrocoli: {
        imageName: Characters.MsBrocoli,
        uri: require("../assets/characters/MsBrocoli/1x/Ms_Brocoli.png"),
        defaultUri: 0,
    },
    Nosy: {
        imageName: Characters.Nosy,
        uri: require("../assets/characters/Nosy/1x/Nosy.png"),
        defaultUri: 0,
    }
}

const getCharacterImages = (character: string | JSX.Element) => {
    var tmp =  Object.entries(characterImages).filter(characImg => characImg[1].imageName === character)[0][1].uri;
    console.log(tmp);
    return tmp;
}



export { characterImages, getCharacterImages };