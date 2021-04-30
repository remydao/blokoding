import { Characters, Actions, Instructions } from "../../constants/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "../blocks/ActionBlock";
import ForBlock from "../blocks/InstructionBlock";
import { DataBlock } from "../blocks/DataBlock";


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

    console.log(blockName);

    if (typeof blockName === 'undefined') {
        if (loopDepth > 0) {
            throw "Il manque une carte fin à la fin d'une instruction"; 
        } else
            return null;
    }
    
    let res = Object.entries(Actions).filter(action => action[1] == blockName);
    if (res.length > 0) {
        return parseAction(res[0], cardList);
    }
    
    res = Object.entries(Instructions).filter(instruction => instruction[1] == blockName);
    if (res.length > 0) {
        return parseInstruction(res[0], cardList);
    }

    if (blockName === "fin") {
        if (loopDepth > 0)
            return null;
        else
            throw 'Une carte fin est mal placée'
    }

    throw 'Une instruction doit toujours se finir par une carte Fin';
}

const parseCharacter = cardList => {
    let character = getFirstElm(cardList);
    let res = Object.entries(Characters).filter(charac => charac[1] == character);
    if (res.length > 0) {
        return new CharacterBlock(parseStructureCard(cardList), res[0][1]);
    } else {
        throw 'Ton programme doit commencer par une carte personnage';
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
    console.log(number)
    if (isNaN(number)) {
        console.log('error3');
        return null;
    }
    let n = parseInt(number);
    console.log(n);
    return new DataBlock(n);
}

export default parseInit;
