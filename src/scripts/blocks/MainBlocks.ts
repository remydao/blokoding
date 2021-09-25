import Game from "../../screens/GameScreen";

class CodeBlock {
    static blockCount = 0;
    protected index;
    constructor() {
        CodeBlock.blockCount++;
        this.index = CodeBlock.blockCount;
    }
    execute(engine: Game) {
        throw "not implemented";
    }
}

class StructureBlock extends CodeBlock {
    public nextBlock;
    constructor(nextBlock: StructureBlock | null) {
        super();
        this.nextBlock = nextBlock;
    }
}

class InstructionBlock extends StructureBlock {
    public predicateBlock;
    public execBlock;
    constructor(predicateBlock: CodeBlock | null, execBlock: StructureBlock | null, nextBlock: StructureBlock | null) {
        super(nextBlock);
        this.predicateBlock = predicateBlock;
        this.execBlock = execBlock;
    }
}

class ConditionBlock extends CodeBlock {
    public entityBlock;
    constructor(entityBlock: DataBlock | null) {
        super();
        this.entityBlock = entityBlock;
    }
}

class DataBlock extends CodeBlock {
    private value;
    constructor(value: string | number) {
        super();
        this.value = value;
    }

    async execute(engine: any) : Promise<string | number> {
        //await engine.setActiveBlockSchemaItem(this.index);
        return this.value;
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ConditionBlock, DataBlock };
