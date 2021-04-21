import { StructureBlock } from "./MainBlocks";


class CharacterBlock extends StructureBlock {
    
    constructor(nextBlock, character) {
        super(nextBlock);
        this.character = character;
        this.executed = 0;
    }

    execute(player) {
    
        if (!this.executed)
        {
            console.log(this.character);
            this.executed = 1;
            return;
        }

        if (this.nextBlock) {
            this.nextBlock.execute(player);
        }
    }
}

export default CharacterBlock;