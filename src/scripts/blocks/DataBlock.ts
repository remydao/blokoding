import { CodeBlock } from './MainBlocks'



class DataBlock extends CodeBlock {
    private value;
    constructor(value: string | number) {
        super();
        this.value = value;
    }

    execute() {
        return this.value;
    }
}

export { DataBlock };