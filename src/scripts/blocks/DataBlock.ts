import { DataBlock } from './MainBlocks'



class NumberBlock extends DataBlock {
    constructor(value: number) {
        super(value);
    }
}

class ItemBlock extends DataBlock {
    constructor(value: string) {
        super(value);
    }
}

class EnvironmentBlock extends DataBlock {
    constructor(value: string) {
        super(value);
    }
}

export { NumberBlock, ItemBlock, EnvironmentBlock };