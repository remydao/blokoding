import { StructureBlock } from "./MainBlocks";


class CharacterBlock extends StructureBlock {
    
    constructor(nextBlock, character) {
        super(nextBlock);
        this.character = character;
    }

    execute() {
        //call game engine to display character
        console.log(this.character);
        if (this.nextBlock) {
            this.nextBlock.execute();
        }
    }
}

export default CharacterBlock;