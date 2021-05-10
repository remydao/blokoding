import { ConditionBlock } from "./MainBlocks";


class IsInFrontBlock extends ConditionBlock {
    constructor(entityBlock) {
        super(entityBlock);
    }

    async execute(engine) {
        let entity = this.entityBlock.execute();

        return engine.isInFrontOf(entity);
    }
}

export default IsInFrontBlock;