import { Characters, Actions, Instructions } from "../blocks/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "../blocks/ActionBlock";
import { ForBlock } from "../blocks/InstructionBlock";
import { DataBlock } from "../blocks/MainBlocks";


var loopDepth = 0;

const parseInit = cardListObj => {
    let cardList = cardListObj.map(item => item.text.toLowerCase());
    return parseCharacter(cardList);
}

const getFirstElm = cardList => {
    return cardList.shift();
}

const parseStructureCard = cardList => {
    let blockName = getFirstElm(cardList);

    if (blockName === undefined)
        return null;
    
    let res = Object.entries(Actions).filter(action => action[1] == blockName);
    if (res.length > 0) {
        return parseAction(res[0], cardList);
    }
    
    res = Object.entries(Instructions).filter(instruction => instruction[1] == blockName);
    if (res.length > 0) {
        return parseInstruction(res[0], cardList);
    }

    if (blockName == "fin") {
        if (loopDepth > 0)
            return null;
    }

    console.log('error');
    return null;
}

const parseCharacter = cardList => {
    let character = getFirstElm(cardList);
    let res = Object.entries(Characters).filter(charac => charac[1] == character);
    if (res.length > 0) {
        return new CharacterBlock(parseStructureCard(cardList), res[0]);
    } else {
        console.log('error');
    }
}

const parseAction = (action, cardList) => {
    switch (action[1]) {
        case Actions.Move:
            return new MoveBlock(parseStructureCard(cardList));
        case Actions.Jump:
            return new JumpBlock(parseStructureCard(cardList));
        case Actions.Grab:
            return new GrabBlock(parseStructureCard(cardList));
        case Actions.Speak:
            return new SpeakBlock(parseStructureCard(cardList));
        default:
            return null;
    }
}

const parseInstruction = (instruction, cardList) => {
    let predicateBlock;

    switch (instruction[1]) {
        case Instructions.For:
            predicateBlock = parseNumber(cardList)
            break;
        case Instructions.If:
            //parse condition
            break;
        case Instructions.While:
            //parse condition
            break;
        default:
            return null;
    }

    loopDepth++;
    let execBlock = parseStructureCard(cardList);
    loopDepth--;

    let nextBlock = parseStructureCard(cardList);

    return new ForBlock(nextBlock, execBlock, predicateBlock);
}

const parseNumber = cardList => {
    let number = getFirstElm(cardList);
    if (isNaN(number)) {
        console.log('error');
        return null;
    }

    return new DataBlock(parseInt(number));
}

export default parseInit;
