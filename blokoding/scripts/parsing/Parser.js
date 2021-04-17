import { Characters, Actions } from "../blocks/BlockType";
import CharacterBlock from "../blocks/CharacterBlock";
import { MoveBlock, JumpBlock, GrabBlock, SpeakBlock } from "../blocks/ActionBlock";

const parseInit = cardListObj => {
    let cardList = cardListObj.map(item => item.text.toLowerCase());
    return parseCharacter(cardList);
}

const getFirstElm = cardList => {
    return cardList.shift();
}

const parseStructureCard = cardList => {
    let blockName = getFirstElm(cardList);
    let res = Object.entries(Actions).filter(action => action[1] == blockName);
    if (res.length > 0) {
        return parseAction(res[0], cardList);
    }
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


export default parseInit;
