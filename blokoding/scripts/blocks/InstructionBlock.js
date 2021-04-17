import { InstructionBlock} from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(nextBlock, execBlock, predicateBlock) {
        super(nextBlock, execBlock, predicateBlock);
    }

    execute() {
        let n = this.predicateBlock.execute();
        for (let i = 0; i < n; i++) {
            this.execBlock.execute();
        }

        if (this.nextBlock)
            this.nextBlock.execute();
    }
}

export { ForBlock };