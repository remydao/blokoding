import Maps from "./Maps";

const enigmaInfo = {
    forest: [
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
        soluce: [{text: 'MrMustache'}, {text: 'Repeter'}, {text: '8'}, {text: 'Si'}, {text: 'etre devant'}, {text: 'buisson'}, {text: 'sauter'}, {text: 'ou si'}, {text: 'etre devant'}, {text: 'flaque'}, {text: 'sauter'}, {text: 'sinon'}, {text: 'avancer'}, {text: 'fin'}, {text: 'fin'}]
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
],
beach: [
    {
        title: "Enigme 1",
        tutorial: ["Bienvenue dans l'univers plage ! Pour ta première mission tu devras simplement sauter au dessus du crabe qui te bloque le passage ! "],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma14,
    },
    {
        title: "Enigme 2",
        tutorial: ["Attention, M. Mustache nous a prévenu que les crabes avaient envahi la plage ! Il doit y en avoir beaucoup pour qu'il s'inquiète à ce point. Tu dois tout faire pour les éviter."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma15,
    },
    {
        title: "Enigme 3",
        tutorial: ["Maintenant que tu as évité les crabes il faut que tu saute par dessus les chateaux de sable que les enfants ont construit ! Attention si tu marches sur un chateau de sable les enfants ne seront pas contents..."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma16,
    },
    {
        title: "Enigme 4",
        tutorial: ["Les enfants ont oublié leurs pelles sur la plage ! Ton but est de toutes les ramasser avant que la mer ne les emporte ! Les tortues te remercieront de leur avoir sauvé la vie."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma17,
    },
    {
        title: "Enigme 5",
        tutorial: ["Un enfant a cassé ton chateau de sable ! Ton but est de te venger. Récupère la pelle qui se trouve au sol et utilise là pour casser son chateau de sable."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma18,
    }
],
city: [
    {
        title: "Enigme 1",
        tutorial: ["Ramasse la peluche qui se trouve dans la ville pour gagner ce niveau !"],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma8,
    },
    {
        title: "Enigme 2",
        tutorial: ["Attention, il y a des chaises qui se trouvent sur la carte. Tu dois sauter au dessus pour arriver à la ligne d'arrivé."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma9,
    },
    {
        title: "Enigme 3",
        tutorial: ["La clé abandonnée te permettra d'ouvrir la porte te donnant accès à la ligne d'arrivée."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma10,
    },
    {
        title: "Enigme 4",
        tutorial: ["Saute par dessus la chaise et ramasse toute les peluches présentes sur la carte pour remporter ce niveau."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma11,
    },
    {
        title: "Enigme 5",
        tutorial: ["Tu dois jeter le détritu dans la poubelle. Attention fait bien attention à ramasser le détritu avant d'arriver devant la poubelle."],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma12,
    },
    {
        title: "Enigme 6",
        tutorial: ["Saute par dessus la chaise et jette le détritu présent sur la map dans la poubelle"],
        congratulations:"Bravo, tu as réussi !",
        map: Maps.enigma13,
    },
]
}

//const numberOfLevels = enigmaInfo.length;

export {enigmaInfo, /*numberOfLevels*/};