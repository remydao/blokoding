import { BlockType } from "../../constants/BlockType";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "./ActionBlock";
import { WhileBlock } from "./InstructionBlock";
import { CodeBlock, StructureBlock } from "./MainBlocks";

class CharacterBlock extends StructureBlock {
    public character;
    constructor(character: string, nextBlock: StructureBlock | null = null, ) {
        super(nextBlock);
        this.character = character;
    }

    async execute(engine: any) {
        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        await engine.setActiveBlockSchemaItem(this.index);

        await engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            await this.nextBlock.execute(engine);
        }
    }
}

export default CharacterBlock;