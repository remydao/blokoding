class CodeBlock {
    execute(engine: any) {
        throw "not implemented";
    }
}

class StructureBlock extends CodeBlock {
    protected nextBlock;
    constructor(nextBlock: any) {
        super();
        this.nextBlock = nextBlock;
    }
}

class InstructionBlock extends StructureBlock {
    protected execBlock;
    protected predicateBlock;
    constructor(predicateBlock: any, execBlock: any, nextBlock: any) {
        super(nextBlock);
        this.execBlock = execBlock;
        this.predicateBlock = predicateBlock;
    }
}

class ConditionBlock extends CodeBlock {
    protected entityBlock;
    constructor(entityBlock: any) {
        super();
        this.entityBlock = entityBlock;
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ConditionBlock };
