import { Environments } from "./BlockType";


const EnvironmentImages = {
    Door: {
        imageName: Environments.Door,
        uri: require('../assets/environments/door.png')
    },
    Chair: {
        imageName: Environments.Chair,
        uri: require('../assets/environments/chair.png')
    },
    Puddle: {
        imageName: Environments.Puddle,
        uri: require('../assets/environments/puddle.png')
    },
    Bush: {
        imageName: Environments.Bush,
        uri: require('../assets/environments/bush.png')
    },
    Bin: {
        imageName: Environments.Bin,
        uri: require('../assets/environments/bin.png')
    },
    Flag: {
        imageName: Environments.Flag,
        uri: require('../assets/environments/flag.png')
    }
}

const getEnvironmentUri = (environment: string) => {
    return Object.entries(EnvironmentImages).filter(envImg => envImg[1].imageName == environment)[0][1].uri;
}

export {EnvironmentImages, getEnvironmentUri};