import { EnvironmentBlock, ItemBlock } from "./DataBlock";
import { ConditionBlock } from "./MainBlocks";


class IsInFrontBlock extends ConditionBlock {
    constructor(entityBlock: EnvironmentBlock | null = null) {
        super(entityBlock);
    }

    async execute(engine: any) : Promise<Boolean> {
        await engine.setActiveBlockSchemaItem(this.index);

        let entity = await this.entityBlock.execute(engine);

        return engine.isInFront(entity);
    }
}

class IsOnBlock extends ConditionBlock {
    constructor(entityBlock: ItemBlock | null = null) {
        super(entityBlock);
    }

    async execute(engine: any) : Promise<Boolean> {
        await engine.setActiveBlockSchemaItem(this.index);

        let entity = await this.entityBlock.execute(engine);

        return engine.isOn(entity);
    }
}

class PossessBlock extends ConditionBlock {
    constructor(entityBlock: ItemBlock | null = null) {
        super(entityBlock);
    }

    async execute(engine: any) : Promise<Boolean> {
        await engine.setActiveBlockSchemaItem(this.index);

        let entity = await this.entityBlock.execute(engine);

        return engine.possess(entity);
    }
}

export { IsInFrontBlock, IsOnBlock, PossessBlock };