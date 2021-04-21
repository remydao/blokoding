import { StructureBlock } from "./MainBlocks";
import EngineConstants from '../../constants/EngineConstants'
import Game from '../../screens/GameScreen'

class MoveBlock extends StructureBlock {
    constructor(nextBlock) {
        super(nextBlock);
        this.executed = 0;
    }

    execute(player) {

        if (!this.executed)
        {
            player.movePixel = EngineConstants.CELL_SIZE;
            this.executed = 1;
            return;
        }
        
        if (this.nextBlock) {
            this.nextBlock.execute(player);
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

