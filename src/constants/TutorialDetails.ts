import Maps from "./Maps";

const tutorialInfo = [
    {
        title: "Faire apparaître un personnage",
        tutorial: ["Avant de ramasser les objets de Mr. Mustache, apprenons déjà comment le faire entrer dans son atelier. Dans Blokoding, tous les programmes créés doivent commencer par une carte personnage.", "Le personnage que tu choisiras sera celui qui s’affichera dans la scène et qui effectuera les actions que tu lui indiquera ensuite. Afin d’afficher Mr. Mustache, sélectionne sa carte personnage (rouge) et pose-la devant toi. Ensuite, clique sur le bouton ci-dessous et prend la carte en photo."],
        congratulations:"Bravo, tu as réussi à faire entrer Mr. Mustache dans son atelier.",
        map: Maps.level1,
    },
    {
        title: "Faire avancer le personnage",
        tutorial: ["À présent, voyons comment le faire avancer. Pour faire avancer un personnage, tu dois utiliser la carte action ‘avancer’ (jaune).", "Les cartes actions permettent de produire un effet sur ton personnage. Je te laisse découvrir les autres ! Pose une carte “avancer” en dessous de Mr. Mustache puis prend la photo !"],
        congratulations:"Bravo grâce à toi Mr. Mustache a pu avancer ! Voyons comment faire pour le faire avancer plusieurs fois !",
        map: Maps.level2,
    },
    {
        title: "Faire avancer le personnage plusieurs fois",
        tutorial: ["Ici, nous allons faire avancer Mr. Mustache plusieurs fois. Pour cela, rien de plus simple ! Il te suffit de placer plusieurs cartes actions “avancer” les unes en dessous des autres ! ", "Tu peux remarquer un symbole de flèche en bas de tes cartes actions, ce genre d'icônes est présent sur toutes les cartes et te permet de voir le type de carte qui peut être placé ensuite. N’oublie pas de prendre toutes les cartes en photo !"],
        congratulations:"Bravo tu as réussi !",
        map: Maps.level3,
        //expectedCards: ["bart", "avancer", "avancer", "avancer"]
    },
    {
        title: "Faire ramasser un objet au personnage",
        tutorial: ["Mr. Mustache doit ramasser l’objet qui se trouve juste sous ses pieds. Pour cela il te suffit de placer en dessous de Mr. Mustache la carte “ramasser”. Emmène ensuite Mr. Mustache à la ligne d’arrivée en plaçant en dessous de la carte “ramasser” une carte “avancer”.", "Attention, par la suite tu devras t’assurer qu’il y a un objet au pied de ton personnage avant de le ramasser mais nous verrons cela plus tard."],
        congratulations:"Bravo, c’est un premier pas vers le nettoyage de l’atelier !",
        map: Maps.level4,
        //expectedCards: ["bart", "avancer"]
    },
    {
        title: "Faire répéter une action plusieurs fois",
        tutorial: ["Nous avons vu comment aligner plusieurs fois la même carte action. Cependant, si tu dois faire avancer 10 fois ton personnage tu te rends bien compte que tu n’as pas assez de cartes avancer et que même si tu en avais assez ton programme serait très long et compliqué à prendre en photo.", "Cela m’amène à te présenter un nouveau type de cartes : les cartes instructions (cartes turquoise). Nous allons nous intéresser tout d’abord à la carte répéter. Cette carte te permet de répéter une liste d’actions un certain nombre de fois.", "Pour cela place en dessous de la carte répéter les actions que tu veux faire puis place une carte fin d’instruction. Ensuite, place à droite de la carte répéter une carte nombre (rose) représentant le nombre de fois que tu veux répéter la liste d’actions. Pour cet exemple, répète 5 fois l’action avancer puis ramasser."],
        congratulations:"Bravo grâce à toi Mr. Mustache a pu avancer et nettoyer son atelier !",
        map: Maps.level5,
        //expectedCards: ["bart", "avancer"]
    },
]

const numberOfLevels = tutorialInfo.length;

export {tutorialInfo, numberOfLevels};