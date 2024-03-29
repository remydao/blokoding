import { ItemBlock } from "./DataBlock";
import { StructureBlock } from "./MainBlocks";

class MoveBlock extends StructureBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index, false);
        
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

class JumpBlock extends StructureBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index, false);

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

class GrabBlock extends StructureBlock {
    constructor(nextBlock: StructureBlock | null = null) {
        super(nextBlock);
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index, false);

        // If GameEngine is unmounted
        if (!engine.isMounted())
            return;

        if (await engine.grab() && this.nextBlock) // If grab success
        {
            await this.nextBlock.execute(engine);
        }
    }
}

class UseBlock extends StructureBlock {
    public itemBlock;
    constructor(itemBlock: ItemBlock | null = null, nextBlock: StructureBlock | null = null) {
        super(nextBlock);
        this.itemBlock = itemBlock;
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index, false);

        if (!engine.isMounted())
            return;

        const item = await this.itemBlock.execute(engine);
        if (await engine.use(item)) {
            if (this.nextBlock) {
                await this.nextBlock.execute(engine);
            }
        }
    }
}

class SpeakBlock extends StructureBlock {
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

