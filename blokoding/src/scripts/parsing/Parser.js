import { Characters, Actions, Instructions, Items, Conditions, Environments } from "../../constants/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "../blocks/ActionBlock";
import { ForBlock, IfBlock, WhileBlock } from "../blocks/InstructionBlock";
import { IsInFrontBlock, IsOnBlock } from "../blocks/ConditionBlock";
import { DataBlock } from "../blocks/DataBlock";


var loopDepth = 0;

const parseDiscover = (cardListObj) => {
    let cardList = cardListObj.map(item => item.text.toLowerCase());
    return cardList;
}

const parseInit = cardListObj => {
    let cardList = cardListObj.map(item => item.text.toLowerCase());
    console.log(cardList);
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
            throw 'Une instruction doit toujours se finir par une carte Fin'; 
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

    throw 'Texte inconnu';
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
            predicateBlock = parseNumber(cardList);
            break;
        case Instructions.If:
            predicateBlock = parseCondition(cardList);
            break;
        case Instructions.While:
            predicateBlock = parseCondition(cardList);
            break;
        default:
            return null;
    }

    loopDepth++;
    let execBlock = parseStructureCard(cardList);
    loopDepth--;

    let nextBlock = parseStructureCard(cardList);

    switch (instruction[1]) {
        case Instructions.For:
            return new ForBlock(nextBlock, execBlock, predicateBlock);
        case Instructions.If:
            return new IfBlock(nextBlock, execBlock, predicateBlock);
        case Instructions.While:
            return new WhileBlock(nextBlock, execBlock, predicateBlock);
        default:
            return null;
    }
}

const parseNumber = cardList => {
    let number = getFirstElm(cardList);
    console.log(number)
    if (isNaN(number)) {
        throw 'Il manque une carte nombre';
    }
    let n = parseInt(number);
    console.log(n);
    return new DataBlock(n);
}

const parseCondition = cardList => {
    let conditionFirstCard = getFirstElm(cardList);
    let res = Object.entries(Conditions).filter(cond => cond[1] == conditionFirstCard);

    if (res.length > 0)
    {

        switch (res[0][1]) {
            case Conditions.IsInFront:
                return new IsInFrontBlock(parseEnvironnement(cardList))
            case Conditions.IsOn:
                return new IsOnBlock(parseItem(cardList));
            default:
                console.log('error on parser');
        }
    }
    else
        console.log('error');
}

const parseItem = cardList => {
    let item = getFirstElm(cardList);
    let res = Object.entries(Items).filter(it => it[1] == item);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        throw 'Il manque une carte objet';
    }
}

const parseEnvironnement = cardList => {
    let env = getFirstElm(cardList);
    let res = Object.entries(Environments).filter(e => e[1] == env);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        throw 'Il manque une carte environnement';
    }
}

export { parseInit, parseDiscover };
