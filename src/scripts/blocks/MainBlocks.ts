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
    public nextBlock: StructureBlock | null
    constructor() {
        super();
    }
}

class InstructionBlock extends StructureBlock {
    public execBlock: StructureBlock;
    public predicateBlock: CodeBlock;
    constructor() {
        super();
        let child = new.target.name;
        if (child === ForBlock.name) {
            addBlockSchemaRow(BlockType.Instruction, BlockType.Number);
        } else {
            addBlockSchemaRow(BlockType.Instruction, BlockType.Condition, BlockType.Item);         
        }
    }
}

class ActionBlock extends StructureBlock {
    constructor() {
        super();

        let child = new.target.name;
        if (child === UseBlock.name) {
            addBlockSchemaRow(BlockType.Action, BlockType.Item);
        } else {
            addBlockSchemaRow(BlockType.Action);         
        }
    }
}

class ConditionBlock extends CodeBlock {
    public entityBlock: DataBlock;
    constructor() {
        super();
    }
}

export { CodeBlock, StructureBlock, InstructionBlock, ActionBlock, ConditionBlock };
