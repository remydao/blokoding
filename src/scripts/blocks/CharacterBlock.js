import { StructureBlock } from "./MainBlocks";

class CharacterBlock extends StructureBlock {
    
    constructor(nextBlock, character) {
        super(nextBlock);
        this.character = character;
    }

    async execute(engine) {

        await engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            console.log("lost: " + engine.getStateHasLost())
            console.log("won: " + engine.getStateHasWon())

            await this.nextBlock.execute(engine);
        }
    }
}

export default CharacterBlock;