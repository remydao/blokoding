import { Environments } from "./BlockType";
import { EnvironmentImages } from "./EnvironmentImages";
import { ItemImages } from "./ItemImages";

const Cells = {
    Empty: {
        content: ItemImages.Grass
    },
    Key: {
        content: ItemImages.Key
    },
    Plush: {
        content: ItemImages.Plush
    },
    Flower: {
        content: ItemImages.Flower
    },
    Machete: {
        content: ItemImages.Machete
    },
    Trash: {
        content: ItemImages.Trash
    },
    Shovel: {
        content: ItemImages.Shovel
    },
    Door: {
        content: EnvironmentImages.Door
    },
    Chair: {
        content: EnvironmentImages.Chair
    },
    Puddle: {
        content: EnvironmentImages.Puddle
    },
    Bush: {
        content: EnvironmentImages.Bush
    },
    Bin: {
        content: EnvironmentImages.Bin
    },
    Crab: {
        content: EnvironmentImages.Crab
    },
    Castle: {
        content: EnvironmentImages.Castle
    },
    Win: {
        content: EnvironmentImages.Flag
    }
};

export default Cells;