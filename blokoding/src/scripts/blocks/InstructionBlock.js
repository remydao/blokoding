import { InstructionBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(nextBlock, execBlock, predicateBlock) {
        super(nextBlock, execBlock, predicateBlock);
    }

    async execute(engine) {
        let n = this.predicateBlock.execute();
        for (let i = 0; i < n; i++) {
            await this.execBlock.execute(engine);
        }

        if (this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

export default ForBlock;