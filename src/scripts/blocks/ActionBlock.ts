import { DataBlock } from "./DataBlock";
import { ActionBlock, StructureBlock } from "./MainBlocks";

class MoveBlock extends ActionBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index);
        
        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        await engine.move();
        await engine.checkState();

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            await this.nextBlock.execute(engine);
        }
    }
}

class JumpBlock extends ActionBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index);

        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        await engine.preCheckState();

        if (engine.getStateHasWon()) {
            await engine.jump(0.5);
        }
        else if (!engine.getStateHasLost() && !engine.getStateHasWon()) {
            await engine.jump();
            await engine.checkState();
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock) {
            await this.nextBlock.execute(engine);
        }
    }
}

class GrabBlock extends ActionBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index);

        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        console.log("grab");

        if (await engine.grab()) // If grab success
        {
            if (this.nextBlock) {
                await this.nextBlock.execute(engine);
            }
        }
    }
}

class UseBlock extends ActionBlock {
    public itemBlock;
    constructor(itemBlock: DataBlock | null = null, nextBlock: StructureBlock | null = null) {
        super(nextBlock);
        this.itemBlock = itemBlock;
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index);

        if (!engine.isMounted())
            return;

        const item = await this.itemBlock.execute();
        if (await engine.use(item)) {
            if (this.nextBlock) {
                await this.nextBlock.execute(engine);
            }
        }
    }
}

class SpeakBlock extends ActionBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        console.log("speak");
        if (this.nextBlock) {
            await this.nextBlock.execute();
        }
    }
}

export { MoveBlock, JumpBlock, GrabBlock, UseBlock, SpeakBlock };

