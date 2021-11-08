import { Items } from "./BlockType";


const ItemImages = {
    Key: {
        imageName: Items.Key,
        uri: require('../assets/items/key.png')
    },
    Plush: {
        imageName: Items.Plush,
        uri: require('../assets/items/plush.png')
    },
    Flower: {
        imageName: Items.Flower,
        uri: require('../assets/items/flower.png')
    },
    Machete: {
        imageName: Items.Machete,
        uri: require('../assets/items/machete.png')
    },
    Trash: {
        imageName: Items.Trash,
        uri: require('../assets/items/trash.png')
    },
    Grass: {
        imageName: Items.Grass,
        uri: require('../assets/items/grass.png')
    },
    Shovel: {
        imageName: Items.Shovel,
        uri: require('../assets/items/shovel.png')
    }
}

const getItemUri = (item: string) => {
    return Object.entries(ItemImages).filter(itemImg => itemImg[1].imageName == item)[0][1].uri;
}

const isItem = (item: string) => {
    return Object.entries(ItemImages).filter(itemImg => itemImg[1].imageName == item).length > 0;
}

export {ItemImages, getItemUri, isItem};