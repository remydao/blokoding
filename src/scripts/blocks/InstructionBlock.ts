import { CodeBlock, ConditionBlock, InstructionBlock, StructureBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(predicateBlock: CodeBlock, execBlock: StructureBlock, nextBlock: StructureBlock) {
        super(predicateBlock, execBlock, nextBlock);
    }

    async execute(engine: any) {
        var n = this.predicateBlock.execute();
        let i = 0;

        while (!engine.getStateHasLost() && !engine.getStateHasWon() && i < n) {
            // If GameEngine is unmounted
            if (!engine.isMounted())
                return;

            if (this.execBlock) {
                await this.execBlock.execute(engine);
            }
            
            i++;
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            await this.nextBlock.execute(engine);
    }
}


class IfBlock extends InstructionBlock {
    private nextIfBlock;
    constructor(predicateBlock: CodeBlock, execBlock: StructureBlock, nextIfBlock: IfBlock, nextBlock: StructureBlock) {
        super(predicateBlock, execBlock, nextBlock);
        this.nextIfBlock = nextIfBlock;
    }

    async execute(engine: any) {

        // If GameEngine is unmounted
        if (!engine.isMounted())
        return;

        if ((!this.predicateBlock || this.predicateBlock.execute(engine)) && this.execBlock) {
            await this.execBlock.execute(engine);
        }
        else if (this.nextIfBlock) {
            await this.nextIfBlock.execute(engine);
        }
        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

class WhileBlock extends InstructionBlock {
    constructor(predicateBlock: CodeBlock, execBlock: StructureBlock, nextBlock: StructureBlock) {
        super(predicateBlock, execBlock, nextBlock);
    }

    async execute(engine: any) {
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && this.predicateBlock.execute(engine)) {
            // If GameEngine is unmounted
            if (!engine.isMounted())
                return;
                
            if (this.execBlock) {
                await this.execBlock.execute(engine);
            }
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine)
    }
}

export { ForBlock, IfBlock, WhileBlock };