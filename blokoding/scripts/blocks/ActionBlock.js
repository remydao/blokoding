import { StructureBlock } from "./MainBlocks";


class MoveBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    execute() {
        console.log("move");
        if (this.nextBlock) {
            this.nextBlock.execute();
        }
    }
}

class JumpBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    execute() {
        console.log("jump");
        if (this.nextBlock) {
            this.nextBlock.execute();
        }
    }
}

class GrabBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    execute() {
        console.log("grab");
        if (this.nextBlock) {
            this.nextBlock.execute();
        }
    }
}

class SpeakBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    execute() {
        console.log("speak");
        if (this.nextBlock) {
            this.nextBlock.execute();
        }
    }
}

export { MoveBlock, JumpBlock, GrabBlock, SpeakBlock };

