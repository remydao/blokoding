import { BlockType } from "../../constants/BlockType";
import { addBlockSchemaRow } from "../parsing/Parser";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "./ActionBlock";
import { WhileBlock } from "./InstructionBlock";
import { CodeBlock, StructureBlock } from "./MainBlocks";

class CharacterBlock extends StructureBlock {
    private character;
    constructor(character: string) {
        super();
        this.character = character;
        addBlockSchemaRow(BlockType.Character);
    }

    async execute(engine: any) {
        // If GameEngine is unmounted
        engine.setActiveBlockSchemaItem(this.index);
        if (!engine.isMounted())
            return;

        await engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            await this.nextBlock.execute(engine);
        }
    }
}

export default CharacterBlock;