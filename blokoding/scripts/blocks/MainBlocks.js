class CodeBlock {
    execute() {
        throw "not implemented";
    }
}

class StructureBlock extends CodeBlock {

    constructor(nextBlock) {
        super()
        this.nextBlock = nextBlock;
    }
}

class InstructionBlock extends StructureBlock {
    constructor(nextBlock, execBlock, predicateBlock) {
        super(nextBlock);
        this.execBlock = execBlock;
        this.predicateBlock = predicateBlock;
    }
}

class ConditionBlock extends CodeBlock {
    constructor(entityBlock) {
        this.entityBlock = entityBlock;
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ConditionBlock };
