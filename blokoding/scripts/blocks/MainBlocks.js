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
        super();
        this.entityBlock = entityBlock;
    }
}

class DataBlock extends CodeBlock {
    constructor(value) {
        super();
        this.value = value;
    }

    execute() {
        return this.value;
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ConditionBlock, DataBlock };
