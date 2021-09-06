import { CodeBlock } from './MainBlocks'



class NumberBlock extends CodeBlock {
    private value;
    constructor(value: number) {
        super();
        this.value = value;
    }

    execute() : number {
        return this.value;
    }
}

class ItemBlock extends CodeBlock {
    private value;
    constructor(value: string) {
        super();
        this.value = value;
    }

    execute() : string {
        return this.value;
    }
}

class EnvironmentBlock extends CodeBlock {
    private value;
    constructor(value: string) {
        super();
        this.value = value;
    }

    execute() : string {
        return this.value;
    }
}

export { NumberBlock, ItemBlock, EnvironmentBlock };