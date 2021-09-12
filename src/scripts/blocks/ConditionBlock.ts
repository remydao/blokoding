import { EnvironmentBlock, ItemBlock } from "./DataBlock";
import { ConditionBlock } from "./MainBlocks";


class IsInFrontBlock extends ConditionBlock {
    constructor(entityBlock: EnvironmentBlock | null = null) {
        super(entityBlock);
    }

    execute(engine: any) : Boolean {
        engine.setActiveBlockSchemaItem(this.index);

        let entity = this.entityBlock.execute();

        return engine.isInFront(entity);
    }
}

class IsOnBlock extends ConditionBlock {
    constructor(entityBlock: ItemBlock | null = null) {
        super(entityBlock);
    }

    execute(engine: any) : Boolean {
        engine.setActiveBlockSchemaItem(this.index);

        let entity = this.entityBlock.execute();

        return engine.isOn(entity);
    }
}

class PossessBlock extends ConditionBlock {
    constructor(entityBlock: ItemBlock | null = null) {
        super(entityBlock);
    }

    execute(engine: any) : Boolean {
        engine.setActiveBlockSchemaItem(this.index);

        let entity = this.entityBlock.execute();

        return engine.possess(entity);
    }
}

export { IsInFrontBlock, IsOnBlock, PossessBlock };