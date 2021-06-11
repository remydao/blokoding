import Game from "../../screens/GameScreen";
import { DataBlock } from "./DataBlock";

class CodeBlock {
    execute(engine: Game) {
        throw "not implemented";
    }
}

class StructureBlock extends CodeBlock {
    protected nextBlock;
    constructor(nextBlock: StructureBlock) {
        super();
        this.nextBlock = nextBlock;
    }
}

class InstructionBlock extends StructureBlock {
    protected execBlock;
    protected predicateBlock;
    constructor(predicateBlock: CodeBlock, execBlock: StructureBlock, nextBlock: StructureBlock) {
        super(nextBlock);
        this.execBlock = execBlock;
        this.predicateBlock = predicateBlock;
    }
}

class ConditionBlock extends CodeBlock {
    protected entityBlock;
    constructor(entityBlock: DataBlock) {
        super();
        this.entityBlock = entityBlock;
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ConditionBlock };
