import { BlockType } from "../../constants/BlockType";
import Game from "../../screens/GameScreen";
import { addBlockSchemaRow } from "../parsing/Parser";
import { UseBlock } from "./ActionBlock";
import { DataBlock } from "./DataBlock";
import { ForBlock } from "./InstructionBlock";

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
        this.nextBlock = nextBlock
    }
}

class InstructionBlock extends StructureBlock {
    public predicateBlock;
    public execBlock;
    constructor(predicateBlock: CodeBlock | null, execBlock: StructureBlock | null, nextBlock: StructureBlock | null) {
        super(nextBlock);
        this.predicateBlock = predicateBlock;
        this.execBlock = execBlock;
        let child = new.target.name;
        if (child === ForBlock.name) {
            addBlockSchemaRow(BlockType.Instruction, BlockType.Number);
        } else {
            addBlockSchemaRow(BlockType.Instruction, BlockType.Condition, BlockType.Item);         
        }
    }
}

class ActionBlock extends StructureBlock {
    constructor(nextBlock: StructureBlock | null) {
        super(nextBlock);

        let child = new.target.name;
        if (child === UseBlock.name) {
            addBlockSchemaRow(BlockType.Action, BlockType.Item);
        } else {
            addBlockSchemaRow(BlockType.Action);         
        }
    }
}

class ConditionBlock extends CodeBlock {
    public entityBlock;
    constructor(entityBlock: DataBlock) {
        super();
        this.entityBlock = entityBlock;
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ActionBlock, ConditionBlock };
