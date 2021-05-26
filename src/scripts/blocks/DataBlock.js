import { CodeBlock } from './MainBlocks'

class DataBlock extends CodeBlock {
    constructor(value) {
        super();
        this.value = value;
    }

    execute() {
        return this.value;
    }
}

export { DataBlock };