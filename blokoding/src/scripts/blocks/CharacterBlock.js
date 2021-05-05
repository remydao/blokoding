import { StructureBlock } from "./MainBlocks";


class CharacterBlock extends StructureBlock {
    
    constructor(nextBlock, character) {
        super(nextBlock);
        this.character = character;
    }

    execute(engine) {

        if (this.nextBlock) {
            this.nextBlock.execute(engine);
        }
    }
}

export default CharacterBlock;