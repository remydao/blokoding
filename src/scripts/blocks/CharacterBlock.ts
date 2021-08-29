import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "./ActionBlock";
import { WhileBlock } from "./InstructionBlock";
import { CodeBlock, StructureBlock } from "./MainBlocks";

class CharacterBlock extends StructureBlock {
    private character;
    constructor(nextBlock: StructureBlock | null, character: string) {
        super(nextBlock);
        this.character = character;
    }

    async execute(engine: any) {
        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        await engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            console.log("lost: " + engine.getStateHasLost())
            console.log("won: " + engine.getStateHasWon())

            await this.nextBlock.execute(engine);
        }
    }
}

export default CharacterBlock;