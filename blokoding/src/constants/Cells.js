import { Environments } from "./BlockType";
import { EnvironmentImages } from "./EnvironmentImages";
import { ItemImages } from "./ItemImages";

const Cells = {
    Empty: {
        content: null
    }
};

[...Object.entries(ItemImages), ...Object.entries(EnvironmentImages)].forEach(entity => Cells[entity[0]] = {content: entity[1].imageName});

export default Cells;