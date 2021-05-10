import { StructureBlock } from "./MainBlocks";

class MoveBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    async execute(engine) {
        console.log("move");
        await engine.move();
        engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
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
        engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            this.nextBlock.execute(engine);
        }
    }
}

class GrabBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
    }

    execute(engine) {
        console.log("grab");
        if (this.nextBlock) {
            this.nextBlock.execute(engine);
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

