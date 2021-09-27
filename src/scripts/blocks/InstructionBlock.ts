import { sleep } from "../utils";
import { CodeBlock, ConditionBlock, InstructionBlock, StructureBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor(predicateBlock: CodeBlock | null = null, execBlock: StructureBlock | null = null, nextBlock: StructureBlock | null = null) {
        super(predicateBlock, execBlock, nextBlock);
    }

    async execute(engine: any) {
        var n = await this.predicateBlock.execute(engine);
        let i = 0;
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && i < n) {
            if (!engine.isMounted())
                return;

            await engine.setActiveBlockSchemaItem(this.index);

            if (this.execBlock) {

                await this.execBlock.execute(engine);
            }
            
            i++;
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            await this.nextBlock.execute(engine);
    }
}


class IfBlock extends InstructionBlock {
    public nextIfBlock;
    constructor(predicateBlock: ConditionBlock | null = null, execBlock: StructureBlock | null = null, nextIfBlock: IfBlock | null = null, nextBlock: StructureBlock | null = null) {
        super(predicateBlock, execBlock, nextBlock);
        this.nextIfBlock = nextIfBlock;
    }

    async execute(engine: any) {
        if (!engine.isMounted())
            return;

        await engine.setActiveBlockSchemaItem(this.index);

        if (await this.predicateBlock.execute(engine) && this.execBlock) {
            await this.execBlock.execute(engine);
        }
        else if (this.nextIfBlock) {
            await this.nextIfBlock.execute(engine);
        }
        
        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

class ElIfBlock extends CodeBlock {
    public predicateBlock;
    public execBlock;
    public nextIfBlock;
    constructor(predicateBlock: ConditionBlock | null = null, execBlock: StructureBlock | null = null, nextIfBlock: ElIfBlock | ElseBlock | null = null) {
        super();
        this.predicateBlock = predicateBlock;
        this.execBlock = execBlock;
        this.nextIfBlock = nextIfBlock;
    }

    async execute(engine: any) {
        if (!engine.isMounted())
            return;

        await engine.setActiveBlockSchemaItem(this.index);

        if (await this.predicateBlock.execute(engine) && this.execBlock) {
            await this.execBlock.execute(engine);
        }
        else if (this.nextIfBlock) {
            await this.nextIfBlock.execute(engine);
        }
    }
}

class ElseBlock extends CodeBlock {
    public execBlock;
    constructor(execBlock: StructureBlock | null = null) {
        super();
        this.execBlock = execBlock;
    }

    async execute(engine: any) {
        if (!engine.isMounted())
            return;

        await engine.setActiveBlockSchemaItem(this.index);

        await this.execBlock.execute(engine);
    }
}

class WhileBlock extends InstructionBlock {
    constructor(predicateBlock: CodeBlock | null = null, execBlock: StructureBlock | null = null, nextBlock: StructureBlock | null = null) {
        super(predicateBlock, execBlock, nextBlock);
    }

    async execute(engine: any) {
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && await this.predicateBlock.execute(engine)) {
            engine.setActiveBlockSchemaItem(this.index);

            if (!engine.isMounted())
                return;
                
            if (this.execBlock) {
                await this.execBlock.execute(engine);
            }
        }

        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine)
    }
}

export { ForBlock, IfBlock, ElIfBlock, ElseBlock, WhileBlock };