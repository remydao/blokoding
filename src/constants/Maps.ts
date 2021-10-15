import { Environments, Items } from "./BlockType";
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
        map: [Cells.Flower, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Flower
            ],
            isInInventory: [
                {item: Items.Flower, quantity: 1}
            ]
        }
    },
    level5:{
        theme: Themes.Workshop,
        map: [Cells.Empty, Cells.Flower, Cells.Flower, Cells.Flower, Cells.Flower, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Flower
            ],
            isInInventory: [
                {item: Items.Flower, quantity: 4}
            ]
        } 
    },


    // ENIGMA FOREST

    enigma1: {
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
    enigma2: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Flower, Cells.Empty, Cells.Flower, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Flower
            ],
            isInInventory: [
                {item: Items.Flower, quantity: 2}
            ]
        }
    },
    enigma3: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Empty, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Win],
    },
    enigma4: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Puddle, Cells.Flower, Cells.Flower, Cells.Empty, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Flower
            ],
            isInInventory: [
                {item: Items.Flower, quantity: 2}
            ]
        }
    },
    enigma5: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Empty, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Bush, Cells.Empty, Cells.Win],
    },
    enigma6: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Machete, Cells.Empty, Cells.Bush, Cells.Bush, Cells.Win],
        winCondition: {
            removedFromMap: [
                Environments.Bush
            ],
        }
    },
    enigma7: {
        theme: Themes.Forest,
        map: [Cells.Empty, Cells.Machete, Cells.Empty, Cells.Bush, Cells.Empty, Cells.Puddle, Cells.Win],
        winCondition: {
            removedFromMap: [
                Environments.Bush
            ],
        }
    },
    

    // ENIGMA CITY
    enigma8: {
        theme: Themes.City,
        map: [Cells.Empty, Cells.Empty, Cells.Plush, Cells.Empty, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Plush
            ],
            isInInventory: [
                {item: Items.Plush, quantity: 1}
            ]
        }
    },
    enigma9: {
        theme: Themes.City,
        map: [Cells.Empty, Cells.Chair, Cells.Empty, Cells.Chair, Cells.Empty, Cells.Win],
    },
    enigma10: {
        theme: Themes.City,
        map: [Cells.Empty, Cells.Empty, Cells.Key, Cells.Empty, Cells.Door, Cells.Win],
        winCondition: {
            removedFromMap: [
                Environments.Door
            ],
        }
    },
    enigma11: {
        theme: Themes.City,
        map: [Cells.Empty, Cells.Empty, Cells.Chair, Cells.Empty, Cells.Empty, Cells.Empty, Cells.Plush, Cells.Plush, Cells.Win],
        winCondition: {
            removedFromMap: [
                Items.Plush
            ],
            isInInventory: [
                {item: Items.Plush, quantity: 2}
            ]
        }
    },
    enigma12: {
        theme: Themes.City,
        map: [Cells.Empty, Cells.Empty, Cells.Trash, Cells.Empty, Cells.Bin, Cells.Win],
        winCondition: {
            removedFromMap: [
                Environments.Bin
            ],
        }
    },
    enigma13: {
        theme: Themes.City,
        map: [Cells.Empty, Cells.Empty, Cells.Chair, Cells.Trash, Cells.Empty,  Cells.Empty, Cells.Bin, Cells.Win],
        winCondition: {
            removedFromMap: [
                Environments.Bin
            ],
        }
    },

    // RANDOM

    foret1: {
        theme: Themes.ForestFall,
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
        theme: Themes.ForestFall,
        map: [Cells.Empty, Cells.Flower, Cells.Empty, Cells.Puddle, Cells.Empty, Cells.Win]
    }
}

export default Maps