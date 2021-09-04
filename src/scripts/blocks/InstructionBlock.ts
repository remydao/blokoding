import { BlockType } from "../../constants/BlockType";
import { addBlockSchemaRow } from "../parsing/Parser";
import { DataBlock } from "./DataBlock";
import { CodeBlock, ConditionBlock, InstructionBlock, StructureBlock } from "./MainBlocks";

class ForBlock extends InstructionBlock {
    constructor() {
        super();
    }

    async execute(engine: any) {
        var n = this.predicateBlock.execute();
        let i = 0;
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && i < n) {
            engine.setActiveBlockSchemaItem(this.index);
            // If GameEngine is unmounted
            if (!engine.isMounted())
                return;

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
    public nextIfBlock: IfBlock;
    constructor() {
        super();
    }

    async execute(engine: any) {
        engine.setActiveBlockSchemaItem(this.index);

        // If GameEngine is unmounted
        if (!engine.isMounted())
        return;

        if ((!this.predicateBlock || this.predicateBlock.execute(engine)) && this.execBlock) {
            await this.execBlock.execute(engine);
        }
        else if (this.nextIfBlock) {
            await this.nextIfBlock.execute(engine);
        }
        if (!engine.getStateHasLost() && !engine.getStateHasWon() && this.nextBlock)
            this.nextBlock.execute(engine);
    }
}

class WhileBlock extends InstructionBlock {
    constructor() {
        super();
    }

    async execute(engine: any) {
        while (!engine.getStateHasLost() && !engine.getStateHasWon() && this.predicateBlock.execute(engine)) {
            engine.setActiveBlockSchemaItem(this.index);

            // If GameEngine is unmounted
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

export { ForBlock, IfBlock, WhileBlock };