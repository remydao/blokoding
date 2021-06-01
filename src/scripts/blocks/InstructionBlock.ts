import { InstructionBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(predicateBlock: any, execBlock: any, nextBlock: any) {
        super(predicateBlock, execBlock, nextBlock);
    }

    async execute(engine: any) {
        let n = this.predicateBlock.execute();
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
            this.nextBlock.execute(engine);
    }
}


class IfBlock extends InstructionBlock {
    constructor(predicateBlock: any, execBlock: any, nextBlock: any) {
        super(predicateBlock, execBlock, nextBlock);
    }

    async execute(engine: any) {
        if (await this.predicateBlock.execute(engine)) {
            // If GameEngine is unmounted
            if (!engine.isMounted())
                return;

            if (this.execBlock)
                await this.execBlock.execute(engine);
        }
            

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

class WhileBlock extends InstructionBlock {
    constructor(predicateBlock: any, execBlock: any, nextBlock: any) {
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