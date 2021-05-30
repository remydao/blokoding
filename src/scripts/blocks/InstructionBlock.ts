import { InstructionBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(nextBlock: any, execBlock: any, predicateBlock: any) {
        super(nextBlock, execBlock, predicateBlock);
    }

    async execute(engine: any) {
        let n = this.predicateBlock.execute();
        let i = 0;
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && i < n) {
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
    constructor(nextBlock: any, execBlock: any, predicateBlock: any) {
        super(nextBlock, execBlock, predicateBlock);
    }

    async execute(engine: any) {
        if (await this.predicateBlock.execute(engine)) {
            if (this.execBlock)
                await this.execBlock.execute(engine);
        }
            

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

class WhileBlock extends InstructionBlock {
    constructor(nextBlock: any, execBlock: any, predicateBlock: any) {
        super(nextBlock, execBlock, predicateBlock)
    }

    async execute(engine: any) {
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && this.predicateBlock.execute(engine)) {

            if (this.execBlock) {
                await this.execBlock.execute(engine);
            }
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine)
    }
}

export { ForBlock, IfBlock, WhileBlock };