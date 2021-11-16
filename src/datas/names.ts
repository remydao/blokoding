import { getInputRangeFromIndexes } from "react-native-snap-carousel";
import * as lang from "./translation.json";

const frEnv = lang.fr.cards.Environments;
const enEnv = lang.en.cards.Environments;
const frItems = lang.fr.cards.Items;
const enItems = lang.en.cards.Items;

const names = {
    fr: {
        male: "un",
        female: "une",
        maleNames: [frEnv.Bin, frEnv.Bush, frEnv.Flag, frItems.Trash],
        femaleNames: [frEnv.Chair, frEnv.Door, frEnv.Puddle, frItems.Flower, frItems.Grass, frItems.Key, frItems.Machete, frItems.Plush]
    },
    en: {
        male: "a",
        female: "a",
        maleNames: [enEnv.Bin, enEnv.Bush, enEnv.Flag, enEnv.Chair, enEnv.Door, enEnv.Puddle, frItems.Trash, frItems.Flower, frItems.Grass, frItems.Key, frItems.Machete, frItems.Plush],
        femaleNames: []
    }
}


const getPrefix = (name: string, language: string) => {
    if (language === "fr") {
        for (let i = 0; i < names.fr.maleNames.length; i++)
            if (names.fr.maleNames[i] === name)
                return names.fr.male;

        return names.fr.female;
    }
    else {
        return "a";
    }
}

export { getPrefix };