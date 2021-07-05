import Maps from "./Maps";

const enigmaInfo = [
    {
        title: "Enigme 1",
        tutorial: ["Une fleur est à 2 cases de ton personnage. Fais avancer ton personnage puis ramasse la fleur et avance encore d’une case pour atteindre l’arrivée."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma1,
    },
]

const numberOfLevels = enigmaInfo.length;

export {enigmaInfo, numberOfLevels};