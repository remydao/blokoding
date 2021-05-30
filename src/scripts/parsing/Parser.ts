import { Characters, Actions, Instructions, Items, Conditions, Environments } from "../../constants/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "../blocks/ActionBlock";
import { ForBlock, IfBlock, WhileBlock } from "../blocks/InstructionBlock";
import { IsInFrontBlock, IsOnBlock } from "../blocks/ConditionBlock";
import { DataBlock } from "../blocks/DataBlock";


var loopDepth = 0;
var cardIndex = 0;

type TcardList = Array<string>

const parseInit = (cardListObj: any[]) => {
    loopDepth = 0;
    cardIndex = 0;

    let cardList: TcardList = cardListObj.map((item: { text: string; }) => item.text.toLowerCase());

    console.log(cardList);
    return parseCharacter(cardList);
}

const getFirstElm = (cardList: TcardList): string | undefined => {
    cardIndex++;
    return cardList.shift();
}

const parseStructureCard = (cardList: TcardList) : never | MoveBlock | JumpBlock | GrabBlock | SpeakBlock | null => {
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
    let predicateBlock: DataBlock | IsInFrontBlock | IsOnBlock;

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
            return new ForBlock(predicateBlock, execBlock, nextBlock);
        case Instructions.If:
            return new IfBlock(predicateBlock, execBlock, nextBlock);
        case Instructions.While:
            return new WhileBlock(predicateBlock, execBlock, nextBlock);
        default:
            return null;
    }
}

const parseNumber = (cardList: TcardList): DataBlock | never => {
    let number = getFirstElm(cardList);
    if (isNaN(number as any)) {
        throw 'Il manque une carte nombre ' + cardIndexToString();
    }
    let n = parseInt(number || "");
    return new DataBlock(n);
}

const parseCondition = (cardList: TcardList): IsInFrontBlock | IsOnBlock | never => {
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
                throw 'Une carte condition est manquante ' + cardIndexToString();;
        }
    }
    else
        throw 'Une carte condition est manquante ' + cardIndexToString();
}

const parseItem = (cardList: TcardList): DataBlock | never => {
    let item = getFirstElm(cardList);
    let res = Object.entries(Items).filter(it => it[1] == item);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        throw 'Il manque une carte objet ' + cardIndexToString();
    }
}

const parseEnvironnement = (cardList: TcardList): DataBlock | never => {
    let env = getFirstElm(cardList);
    let res = Object.entries(Environments).filter(e => e[1] == env);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        throw 'Il manque une carte environnement ' + cardIndexToString();
    }
}

export { parseInit };
