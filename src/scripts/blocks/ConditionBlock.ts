import { DataBlock } from "./DataBlock";
import { ConditionBlock } from "./MainBlocks";


class IsInFrontBlock extends ConditionBlock {
    constructor() {
        super();
    }

    execute(engine: any) : Boolean {
        engine.setActiveBlockSchemaItem(this.index);

        let entity = this.entityBlock.execute();

        return engine.isInFront(entity);
    }
}

class IsOnBlock extends ConditionBlock {
    constructor() {
        super();
    }

    execute(engine: any) : Boolean {
        engine.setActiveBlockSchemaItem(this.index);

        let entity = this.entityBlock.execute();

        return engine.isOn(entity);
    }
}

class PossessBlock extends ConditionBlock {
    constructor() {
        super();
    }

    execute(engine: any) : Boolean {
        engine.setActiveBlockSchemaItem(this.index);

        let entity = this.entityBlock.execute();

        return engine.possess(entity);
    }
}

export { IsInFrontBlock, IsOnBlock, PossessBlock };