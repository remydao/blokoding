import Maps from "./Maps";

const enigmaInfo = [
    {
        title: "Enigme 1",
        tutorial: ["Une fleur est à 2 cases de ton personnage. Fais avancer ton personnage puis ramasse la fleur et avance encore d’une case pour atteindre l’arrivée."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma1,
    },
    {
        title: "Enigme 2",
        tutorial: ["Plusieurs fleurs sont sur le chemin de ton personnage. Fais avancer ton personnage jusqu’à l’arrivée en ramassant toutes les fleurs."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma2,
    },
    {
        title: "Enigme 3",
        tutorial: ["Plusieurs flaques d’eau sont sur le chemin de ton personnage. Fais avancer ton personnage jusqu’à l’arrivée tout en sautant par-dessus les flaques d’eau."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma3,
    },
    {
        title: "Enigme 4",
        tutorial: ["Plusieurs flaques d’eau et fleurs sont sur le chemin de ton personnage. Fais avancer ton personnage jusqu’à l’arrivée tout en sautant par-dessus les flaques d’eau et en ramassant les fleurs."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma4,
    },
    {
        title: "Enigme 5",
        tutorial: ["Plusieurs flaques d’eau et buissons sont sur le chemin de ton personnage. Fais avancer ton personnage jusqu’à l’arrivée tout en sautant par-dessus les flaques d’eau et buissons."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma5,
    },
    {
        title: "Enigme 6",
        tutorial: ["Une machette est à une case devant ton personnage. Plusieurs buissons sont sur le chemin de ton personnage. Fais ramasser la machette à ton personnage puis fais le avancer jusqu’à l’arrivée tout en coupant les buissons avec sa machette."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma6,
    },
    {
        title: "Enigme 7",
        tutorial: ["Une machette est à une case devant ton personnage. Plusieurs buissons et flaques d’eau sont sur le chemin de ton personnage. Fais ramasser la machette à ton personnage puis fais le avancer jusqu’à l’arrivée tout en coupant les buissons avec sa machette et en sautant par-dessus les flaques d’eau."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma7,
    },
]

const numberOfLevels = enigmaInfo.length;

export {enigmaInfo, numberOfLevels};