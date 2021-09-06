import { Characters, Actions, Instructions, SecondaryInstructions, Items, Conditions, Environments, BlockType } from "../../constants/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock, UseBlock } from "../blocks/ActionBlock";
import { ForBlock, IfBlock, WhileBlock } from "../blocks/InstructionBlock";
import { IsInFrontBlock, IsOnBlock, PossessBlock } from "../blocks/ConditionBlock";
import { DataBlock } from "../blocks/DataBlock";
import { ActionBlock, CodeBlock, ConditionBlock, StructureBlock } from "../blocks/MainBlocks";
import { checkVisionResp } from "../corrector/corrector";

var loopDepth = 0;
var cardIndex = 0;
var isInIf = 0;

var blockSchemaTypeList: BlockType[][] = []

const addBlockSchemaRow = (...blockSchemaType: BlockType[]) => {
    blockSchemaTypeList.push(blockSchemaType);
}

type TcardList = Array<string>

const parseInit = (cardListObj: any[]) => {
    loopDepth = 0;
    cardIndex = 0;
    isInIf = 0;
    blockSchemaTypeList = []
    CodeBlock.blockCount = 0;

    let cardList: TcardList = cardListObj.map((item: { text: string; }) => item.text.trim().toLowerCase());

    console.log(cardList);
    return [parseCharacter(cardList), blockSchemaTypeList, cardIndex];
}

const getFirstElm = (cardList: TcardList): string | undefined => {
    cardIndex++;
    return cardList.shift();
}

const setFirstElm = (cardList : TcardList, elm: string) : void => {
    cardIndex--;
    cardList.unshift(elm);
}

const parseStructureCard = (cardList: TcardList) : never | StructureBlock | null => {
    let blockName = getFirstElm(cardList);

    if (typeof blockName === 'undefined') {
        if (loopDepth > 0) {
            throw 'Une instruction doit toujours se finir par une carte "Fin" ' + cardIndexToString(); 
        } else {
            return null;
        }
    }
    
    let res = Object.entries(Actions).filter(action => action[1] == blockName);
    
    if (res.length > 0) {
        return parseAction(res[0][1], cardList);
    } else {
        let modifiedBlock = checkVisionResp(blockName, Object.values(Actions));
        if (modifiedBlock !== null) {
            return parseAction(modifiedBlock, cardList);
        }
    }
    
    res = Object.entries(Instructions).filter(instruction => instruction[1] == blockName);
    if (res.length > 0) {
        return parseInstruction(res[0][1], cardList);
    } else {
        let modifiedBlock = checkVisionResp(blockName, Object.values(Instructions));
        if (modifiedBlock !== null) {
            return parseInstruction(modifiedBlock, cardList);
        }
    }

    if (blockName == SecondaryInstructions.End) {
        if (loopDepth > 0) {
            addBlockSchemaRow(BlockType.Instruction);
            return null;
        }
        else
            throw 'Une carte fin est mal placée ' + cardIndexToString();
    }

    if (blockName == SecondaryInstructions.Elif) {
        if (isInIf > 0) {
            setFirstElm(cardList, blockName);
            return null;
        }
        else
            throw 'Une carte "Ou si" est mal placée ' + cardIndexToString();
    }

    if (blockName == SecondaryInstructions.Else) {
        if (isInIf > 0) {
            setFirstElm(cardList, blockName);
            return null;
        }
        else
            throw 'Une carte "Sinon" est mal placée ' + cardIndexToString();
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
    let characterBlock : CharacterBlock;

    if (res.length > 0) {
        characterBlock = new CharacterBlock(null, res[0][1]);
        characterBlock.nextBlock = parseStructureCard(cardList);
        return characterBlock;
    } else {
        if (typeof character !== 'undefined')
        {
            let modifiedCharacter = checkVisionResp(character, Object.values(Characters));
            if (modifiedCharacter !== null) {
                characterBlock = new CharacterBlock(null, modifiedCharacter);
        characterBlock.nextBlock = parseStructureCard(cardList);
        return characterBlock;
            }
        }

        throw 'Ton programme doit commencer par une carte personnage ' + cardIndexToString();
    }
}

const parseAction = (action: any, cardList: TcardList) => {
    let actionBlock : ActionBlock;
    switch (action) {
        case Actions.Move:
            actionBlock = new MoveBlock();
            break;
        case Actions.Jump:
            actionBlock = new JumpBlock();
            break;
        case Actions.Grab:
            actionBlock = new GrabBlock();
            break;
        case Actions.Use:
            actionBlock = new UseBlock();
            const itemBlock = parseItem(cardList);
            if (!itemBlock)
                throw "L'action utiliser doit être suivie d'un objet"
            actionBlock.itemBlock = itemBlock;
            break;
        case Actions.Speak:
            actionBlock = new SpeakBlock();
        default:
            return null;
    }
    actionBlock.nextBlock = parseStructureCard(cardList);
    return actionBlock;
}

const parseInstruction = (instruction: any, cardList: TcardList) => {
    let instructionBlock : ForBlock | IfBlock | WhileBlock;
    let predicateBlock: DataBlock | ConditionBlock | null;
    let nextIfBlock : IfBlock | null = null;

    switch (instruction) {
        case Instructions.For:
            instructionBlock = new ForBlock();
            if (!(predicateBlock = parseNumber(cardList)))
                throw "L'instruction Répéter doit être suivie d'un nombre " + cardIndexToString();
            break;
        case Instructions.If:
            instructionBlock = new IfBlock();
            isInIf++;    
            if (!(predicateBlock = parseCondition(cardList)))
                throw "L'instruction Si doit être suivie d'une condition " + cardIndexToString();
            break;
        case SecondaryInstructions.Else:
            break;
        case Instructions.While:
            instructionBlock = new WhileBlock();
            if (!(predicateBlock = parseCondition(cardList)))
                throw "L'instruction Tant que doit être suivie d'une condition " + cardIndexToString();            
            break;
        default:
            return null;
    }
    instructionBlock.predicateBlock = predicateBlock;

    loopDepth++;
    instructionBlock.execBlock = parseStructureCard(cardList);

    if (isInIf > 0) {
        instructionBlock.nextIfBlock = parseSecondaryInstruction(cardList);
        isInIf--;
    }
    loopDepth--;

    instructionBlock.nextBlock = parseStructureCard(cardList);

    return instructionBlock;
}

const parseSecondaryInstruction = (cardList : TcardList): IfBlock | null => {
    let predicateBlock: DataBlock | ConditionBlock | null = null;
    let nextIfBlock : IfBlock | null = null;
    let secondaryInstructionBlock: IfBlock;

    let instruction = getFirstElm(cardList);

    switch (instruction) {
        case SecondaryInstructions.Elif:
            secondaryInstructionBlock = new IfBlock();
            if (!(predicateBlock = parseCondition(cardList)))
                throw "L'instruction Ou si doit être suivie d'une condition " + cardIndexToString();
            secondaryInstructionBlock.predicateBlock = predicateBlock;
            break;
        case SecondaryInstructions.Else:
            secondaryInstructionBlock = new IfBlock();
            break;
        default:
            setFirstElm(cardList, instruction);
            return null;
    }

    secondaryInstructionBlock.execBlock = parseStructureCard(cardList);
    secondaryInstructionBlock.nextIfBlock = parseSecondaryInstruction(cardList);


    return secondaryInstructionBlock;
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

    let finalCondition;

    if (res.length === 0 && typeof conditionFirstCard !== 'undefined') {
        var modifiedCondition = checkVisionResp(conditionFirstCard, Object.values(Conditions))
        if (modifiedCondition !== null) {
            finalCondition = modifiedCondition;
        } else {
            return null;
        }
    } else {
        finalCondition = res[0][1];
    }

    let entity: DataBlock | null
    let conditionBlock: ConditionBlock;
    switch (finalCondition) {
        case Conditions.IsInFront:
            conditionBlock = new IsInFrontBlock();
            if (!(entity = parseEnvironnement(cardList)))
                throw "La condition être devant doit être suivie d'un environnement " + cardIndexToString();
            break;
        case Conditions.IsOn:
            conditionBlock = new IsOnBlock();
            if (!(entity = parseItem(cardList)))
                throw "La condition être sur doit être suivie d'un objet " + cardIndexToString();
            break;
        case Conditions.Possess:
            conditionBlock = new PossessBlock();
            if (!(entity = parseItem(cardList)))
                throw "La condition posséder doit être suivie d'un objet " + cardIndexToString();
            break;
        default:
            return null;
    }
    conditionBlock.entityBlock = entity; 
    return conditionBlock;
}

const parseItem = (cardList: TcardList): DataBlock | null => {
    let item = getFirstElm(cardList);
    let res = Object.entries(Items).filter(it => it[1] == item);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        if (typeof item !== 'undefined') {
            let modifiedItem = checkVisionResp(item, Object.values(Items));
            if (modifiedItem !== null) {
                return new DataBlock(modifiedItem);
            }
        }
        return null;
    }
}

const parseEnvironnement = (cardList: TcardList): DataBlock | null => {
    let env = getFirstElm(cardList);
    let res = Object.entries(Environments).filter(e => e[1] == env);

    if (res.length > 0) {
        return new DataBlock(res[0][1]);
    } else {
        if (typeof env !== 'undefined') {
            let modifiedEnv = checkVisionResp(env, Object.values(Environments));
            if (modifiedEnv!== null) {
                return new DataBlock(modifiedEnv);
            }
        }
        return null;
    }
}

export { parseInit, addBlockSchemaRow };
