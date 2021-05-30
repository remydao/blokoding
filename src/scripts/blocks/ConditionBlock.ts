import { DataBlock } from "./DataBlock";
import { ConditionBlock } from "./MainBlocks";


class IsInFrontBlock extends ConditionBlock {
    constructor(entityBlock: DataBlock) {
        super(entityBlock);
    }

    async execute(engine: any) {
        let entity = this.entityBlock.execute();

        return engine.isInFrontOf(entity);
    }
}

class IsOnBlock extends ConditionBlock {
    constructor(entityBlock: DataBlock) {
        super(entityBlock);
    }

    async execute(engine: any) {
        let entity = this.entityBlock.execute();

        return engine.isOn(entity);
    }
}

export { IsInFrontBlock, IsOnBlock };