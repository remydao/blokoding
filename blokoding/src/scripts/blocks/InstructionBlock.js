import { InstructionBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(nextBlock, execBlock, predicateBlock) {
        super(nextBlock, execBlock, predicateBlock);
    }

    async execute(engine) {
        let n = this.predicateBlock.execute();
        let i = 0;
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && i < n) {
            await this.execBlock.execute(engine);
            i++;
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine);
    }
}


class IfBlock extends InstructionBlock {
    constructor(nextBlock, execBlock, predicateBlock) {
        super(nextBlock, execBlock, predicateBlock);
    }

    async execute(engine) {
        let isConditionTrue = this.predicateBlock.execute();
        
        if (isConditionTrue)
            await this.execBlock.execute(engine);

        if (this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

export default ForBlock;