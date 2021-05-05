import { StructureBlock } from "./MainBlocks";

class MoveBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    async execute(engine) {
        console.log("move");
        await engine.move();
        if (this.nextBlock) {
            this.nextBlock.execute(engine);
        }
    }
}

class JumpBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    async execute(engine) {
        console.log("jump");
        await engine.jump();
        if (this.nextBlock) {
            this.nextBlock.execute(engine);
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
