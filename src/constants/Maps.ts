import { Items } from "./BlockType";
import Cells from "./Cells";
import Themes from "./Themes";

const Maps = {
    // TUTORIAL
    level1:{
        theme: Themes.Workshop,
        map: [Cells.Win]
    },
    level2:{
        theme: Themes.Workshop,
        map: [Cells.Empty, Cells.Win] 
    },
    level3:{
        theme: Themes.Workshop,
        map: [Cells.Empty, Cells.Empty, Cells.Empty, Cells.Win] 
    },
    level4:{
        theme: Themes.Workshop,
        map: [Cells.Flower, Cells.Win] 
    },
    level5:{
        theme: Themes.Workshop,
        map: [Cells.Empty, Cells.Flower, Cells.Flower, Cells.Flower, Cells.Flower, Cells.Win] 
    },


    // ENIGMA

    enigma1:{
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Flower, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Flower
            ],
            isInInventory: [
                {item: Items.Flower, quantity: 1}
            ]
        }
    },

    // RANDOM

    foret1: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Flower, Cells.Empty, Cells.Flower, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Flower
            ],
            isInInventory: [
                {item: Items.Flower, quantity: 2}
            ]
        }
    },
    foret2: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Key, Cells.Empty, Cells.Empty, Cells.Empty, Cells.Win]
    }
}

export default Maps