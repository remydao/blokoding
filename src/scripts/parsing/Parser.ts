import { Characters, Actions, Instructions, Items, Conditions, Environments } from "../../constants/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "../blocks/ActionBlock";
import { ForBlock, IfBlock, WhileBlock } from "../blocks/InstructionBlock";
import { IsInFrontBlock, IsOnBlock, PossessBlock } from "../blocks/ConditionBlock";
import { DataBlock } from "../blocks/DataBlock";
import { ConditionBlock, StructureBlock } from "../blocks/MainBlocks";


var loopDepth = 0;
var cardIndex = 0;

type TcardList = Array<string>

const parseInit = (cardListObj: any[]) => {
    loopDepth = 0;
    cardIndex = 0;

    let cardList: TcardList = cardListObj.map((item: { text: string; }) => item.text.trim().toLowerCase());

    console.log(cardList);
    return parseCharacter(cardList);
}

const getFirstElm = (cardList: TcardList): string | undefined => {
    cardIndex++;
    return cardList.shift();
}

const parseStructureCard = (cardList: TcardList) : never | StructureBlock | null => {
    let blockName = getFirstElm(cardList);

    if (typeof blockName === 'undefined') {
        if (loopDepth > 0) {
            throw 'Une instruction doit toujours se finir par une carte "Fin" ' + cardIndexToString(); 
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
            throw 'Une carte fin est mal placée ' + cardIndexToString();
    }

    res = Object.entries(Conditions).filter(condition => condition[1] == blockName);
    if (res.length > 0) {
        throw 'La condition ' + res[0][1] + ' est mal placée ' + cardIndexToString();
    }
    res = Object.entries(Items).filter(item => item[1] == blockName);
    if (res.length > 0) {
        throw "L'objet " + res[0][1] + ' est mal placé ' + cardIndexToString();
    }
    res = Object.entries(Environments).filter(env => env[1] == blockName);
    if (res.length > 0) {
        throw "L'environnement " + res[0][1] + ' est mal placé ' + cardIndexToString();
    }

    throw 'Texte inconnu : "' + blockName + '" ' + cardIndexToString();
}


const cardIndexToString = () => {
    return '(carte numéro ' + cardIndex + ')';
}


const parseCharacter = (cardList: TcardList) : CharacterBlock | never => {
    let character = getFirstElm(cardList);
    let res = Object.entries(Characters).filter(charac => charac[1] == character);
    if (res.length > 0) {
        return new CharacterBlock(parseStructureCard(cardList), res[0][1]);
    } else {
        throw 'Ton programme doit commencer par une carte personnage ' + cardIndexToString();
    }
}

const parseAction = (action: any[], cardList: TcardList) => {
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

const parseInstruction = (instruction: any[], cardList: TcardList) => {
    let predicateBlock: DataBlock | ConditionBlock | null;

    switch (instruction[1]) {
        case Instructions.For:
            if (!(predicateBlock = parseNumber(cardList)))
                throw "L'instruction Répéter doit être suivie d'un nombre " + cardIndexToString();
            break;
        case Instructions.If:
            if (!(predicateBlock = parseCondition(cardList)))
                throw "L'instruction Si doit être suivie d'une condition " + cardIndexToString();            
            break;
        case Instructions.While:
            if (!(predicateBlock = parseCondition(cardList)))
                throw "L'instruction Tant que doit être suivie d'une condition " + cardIndexToString();            
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
            return new ForBlock(predicateBlock, execBlock, nextBlock);
        case Instructions.If:
            return new IfBlock(predicateBlock, execBlock, nextBlock);
        case Instructions.While:
            return new WhileBlock(predicateBlock, execBlock, nextBlock);
        default:
            return null;
    }
}

const parseNumber = (cardList: TcardList): DataBlock | null => {
    let number = getFirstElm(cardList);
    if (!number)
        return null;

    let n = parseInt(number);
    
    if (isNaN(n)) 
        return null;
    
    return new DataBlock(n);
}

const parseCondition = (cardList: TcardList): ConditionBlock | null => {
    let conditionFirstCard = getFirstElm(cardList);
    let res = Object.entries(Conditions).filter(cond => cond[1] == conditionFirstCard);

    let entity : DataBlock | null

    if (res.length > 0)
    {
        switch (res[0][1]) {
            case Conditions.IsInFront:
                if (!(entity = parseEnvironnement(cardList)))
                    throw "La condition être devant doit être suivie d'un environnement " + cardIndexToString();
                return new IsInFrontBlock(entity);
            case Conditions.IsOn:
                if (!(entity = parseItem(cardList)))
                    throw "La condition être sur doit être suivie d'un objet " + cardIndexToString();
                return new IsOnBlock(entity);
            case Conditions.Possess: 
                if (!(entity = parseItem(cardList)))
                    throw "La condition posséder doit être suivie d'un objet " + cardIndexToString();
                return new PossessBlock(entity);
            default:
                return null;
        }
    }
    else
        return null;
}

const parseItem = (cardList: TcardList): DataBlock | null => {
    let item = getFirstElm(cardList);
    let res = Object.entries(Items).filter(it => it[1] == item);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        return null;
    }
}

const parseEnvironnement = (cardList: TcardList): DataBlock | null => {
    let env = getFirstElm(cardList);
    let res = Object.entries(Environments).filter(e => e[1] == env);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        return null;
    }
}

export { parseInit };
