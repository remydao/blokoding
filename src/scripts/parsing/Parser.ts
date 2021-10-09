import { Characters, Actions, Instructions, SecondaryInstructions, Items, Conditions, Environments, BlockType } from "../../constants/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock, UseBlock } from "../blocks/ActionBlock";
import { ElIfBlock, ElseBlock, ForBlock, IfBlock, WhileBlock } from "../blocks/InstructionBlock";
import { IsInFrontBlock, IsOnBlock, PossessBlock } from "../blocks/ConditionBlock";
import { EnvironmentBlock, ItemBlock, NumberBlock } from "../blocks/DataBlock";
import { CodeBlock, ConditionBlock, StructureBlock, DataBlock, InstructionBlock } from "../blocks/MainBlocks";
import { checkVisionResp } from "../corrector/corrector";
import { useLanguage } from '../../datas/contextHooks';

var loopDepth = 0;
var cardIndex = 0;
var isInIf = 0;
var language: any;

var blockSchemaTypeList: BlockType[][] = []

const addBlockSchemaRow = (...blockSchemaType: BlockType[]) => {
    blockSchemaTypeList.push(blockSchemaType);
}

type TcardList = Array<string>

const parseInit = (cardListObj: any[], currLanguage: any) => {
    loopDepth = 0;
    cardIndex = 0;
    isInIf = 0;
    language = currLanguage;
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
            throw language.parseErrors.endCardMissing + cardIndexToString(); 
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
            throw language.parseErrors.endCardUnexpected + cardIndexToString();
    }

    if (blockName == SecondaryInstructions.Elif) {
        if (isInIf > 0) {
            setFirstElm(cardList, blockName);
            return null;
        }
        else
            throw language.parseErrors.orIfUnexpected + cardIndexToString();
    }

    if (blockName == SecondaryInstructions.Else) {
        if (isInIf > 0) {
            setFirstElm(cardList, blockName);
            return null;
        }
        else
            throw language.parseErrors.elseUnexpected + cardIndexToString();
    }

    res = Object.entries(Conditions).filter(condition => condition[1] == blockName);
    if (res.length > 0) {
        throw language.parseErrors.condition + res[0][1] + language.parseErrors.unexpected + cardIndexToString();
    }
    res = Object.entries(Items).filter(item => item[1] == blockName);
    if (res.length > 0) {
        throw language.parseErrors.object + res[0][1] + language.parseErrors.unexpected + cardIndexToString();
    }
    res = Object.entries(Environments).filter(env => env[1] == blockName);
    if (res.length > 0) {
        throw language.parseErrors.environment + res[0][1] + language.parseErrors.unexpected + cardIndexToString();
    }

    throw language.parseErrors.unknownText + blockName + '\" ' + cardIndexToString();
}


const cardIndexToString = () => {
    return '(' + language.parseErrors.cardNumber + cardIndex + ')';
}


const parseCharacter = (cardList: TcardList) : CharacterBlock | never => {
    let character = getFirstElm(cardList);
    let res = Object.entries(Characters).filter(charac => charac[1] == character);
    let characterBlock : CharacterBlock;

    if (res.length > 0) {
        characterBlock = new CharacterBlock(res[0][1]);
        addBlockSchemaRow(BlockType.Character);
        characterBlock.nextBlock = parseStructureCard(cardList);
        return characterBlock;
    } else {
        if (typeof character !== 'undefined')
        {
            let modifiedCharacter = checkVisionResp(character, Object.values(Characters));
            if (modifiedCharacter !== null) {
                characterBlock = new CharacterBlock(modifiedCharacter);
                addBlockSchemaRow(BlockType.Character);
                characterBlock.nextBlock = parseStructureCard(cardList);
                return characterBlock;
            }
        }

        throw language.parseErrors.startCharacter + cardIndexToString();
    }
}

const parseAction = (action: any, cardList: TcardList) => {
    let actionBlock;
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
                throw language.parseErrors.useFollowing + cardIndexToString();
            actionBlock.itemBlock = itemBlock;
            break;
        case Actions.Speak:
            actionBlock = new SpeakBlock();
        default:
            return null;
    }

    if (actionBlock.constructor.name === UseBlock.name) {
        addBlockSchemaRow(BlockType.Action, BlockType.Item);
    } else {
        addBlockSchemaRow(BlockType.Action);         
    }

    actionBlock.nextBlock = parseStructureCard(cardList);

    return actionBlock;
}

const parseInstruction = (instruction: any, cardList: TcardList) => {
    let instructionBlock;
    let predicateBlock;
    let nextIfBlock : IfBlock | null = null;

    switch (instruction) {
        case Instructions.For:
            instructionBlock = new ForBlock();
            if (!(predicateBlock = parseNumber(cardList)))
                throw language.parseErrors.forWithNumber + cardIndexToString();
            break;
        case Instructions.If:
            instructionBlock = new IfBlock();
            isInIf++;    
            if (!(predicateBlock = parseCondition(cardList)))
                throw language.parseErrors.ifCondition + cardIndexToString();
            break;
        case Instructions.While:
            instructionBlock = new WhileBlock();
            if (!(predicateBlock = parseCondition(cardList)))
                throw language.parseErrors.whileCondition + cardIndexToString();            
            break;
        default:
            return null;
    }

    if (instructionBlock.constructor.name === ForBlock.name)
        addBlockSchemaRow(BlockType.Instruction, BlockType.Number);
    else if (predicateBlock.entityBlock.constructor.name === ItemBlock.name)
        addBlockSchemaRow(BlockType.Instruction, BlockType.Condition, BlockType.Item);
    else
        addBlockSchemaRow(BlockType.Instruction, BlockType.Condition, BlockType.Environment);


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

const parseSecondaryInstruction = (cardList : TcardList): ElIfBlock | ElseBlock | null => {
    let predicateBlock;
    let secondaryInstructionBlock;

    let instruction = getFirstElm(cardList);

    switch (instruction) {
        case SecondaryInstructions.Elif:
            secondaryInstructionBlock = new ElIfBlock();
            if (!(predicateBlock = parseCondition(cardList)))
                throw language.parseErrors.orIfCondition + cardIndexToString();
            secondaryInstructionBlock.predicateBlock = predicateBlock;
            break;
        case SecondaryInstructions.Else:
            secondaryInstructionBlock = new ElseBlock();
            break;
        default:
            setFirstElm(cardList, instruction);
            return null;
    }

    if (secondaryInstructionBlock.constructor.name === ElseBlock.name)
        addBlockSchemaRow(BlockType.Instruction);
    else if (predicateBlock.entityBlock.constructor.name === ItemBlock.name)
        addBlockSchemaRow(BlockType.Instruction, BlockType.Condition, BlockType.Item);
    else
        addBlockSchemaRow(BlockType.Instruction, BlockType.Condition, BlockType.Environment);

    secondaryInstructionBlock.execBlock = parseStructureCard(cardList);
    
    if (secondaryInstructionBlock.constructor.name === ElIfBlock.name)
        secondaryInstructionBlock.nextIfBlock = parseSecondaryInstruction(cardList);

    return secondaryInstructionBlock;
}

const parseNumber = (cardList: TcardList): NumberBlock | null => {
    let number = getFirstElm(cardList);
    if (!number)
        return null;

    let n = parseInt(number);
    
    if (isNaN(n)) 
        return null;
    
    return new NumberBlock(n);
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
                throw language.parseErrors.inFrontEnv + cardIndexToString();
            break;
        case Conditions.IsOn:
            conditionBlock = new IsOnBlock();
            if (!(entity = parseItem(cardList)))
                throw language.parseErrors.onObject + cardIndexToString();
            break;
        case Conditions.Possess:
            conditionBlock = new PossessBlock();
            if (!(entity = parseItem(cardList)))
                throw language.parseErrors.ownObject + cardIndexToString();
            break;
        default:
            return null;
    }
    conditionBlock.entityBlock = entity; 
    return conditionBlock;
}

const parseItem = (cardList: TcardList): ItemBlock | null => {
    let item = getFirstElm(cardList);
    let res = Object.entries(Items).filter(it => it[1] == item);

    if (res.length > 0) {
        return new ItemBlock(res[0][1]);
    } else {
        if (typeof item !== 'undefined') {
            let modifiedItem = checkVisionResp(item, Object.values(Items));
            if (modifiedItem !== null) {
                return new ItemBlock(modifiedItem);
            }
        }
        return null;
    }
}

const parseEnvironnement = (cardList: TcardList): EnvironmentBlock | null => {
    let env = getFirstElm(cardList);
    let res = Object.entries(Environments).filter(e => e[1] == env);

    if (res.length > 0) {
        return new EnvironmentBlock(res[0][1]);
    } else {
        if (typeof env !== 'undefined') {
            let modifiedEnv = checkVisionResp(env, Object.values(Environments));
            if (modifiedEnv!== null) {
                return new EnvironmentBlock(modifiedEnv);
            }
        }
        return null;
    }
}

export { parseInit };
