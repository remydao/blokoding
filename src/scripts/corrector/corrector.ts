const MAX_DEVIATION_NUMBER = 3;
const MAX_LEVENSHTEIN_DISTANCE = 1;


const levenshteinDistance = (str1: string, str2: string) => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
            track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator, // substitution
        );
        }
    }
    return track[str2.length][str1.length];
};

const deviationMatching = (first: string, second: string, num: number) => {
    let count = 0;
    let firstComparator = first.length > second.length ? first.toLowerCase() : second.toLowerCase();
    let secondComparator = first.length > second.length ? second.toLowerCase() : first.toLowerCase();

    for (let i = 0; i < firstComparator.length; i++) {
        if (!secondComparator.includes(firstComparator[i])) {
            count++;
        };
        if (count > num){
            return false;
        };
    };
    return true;
};

const checkVisionResp = (str: string, allCards: string[]) => {

    for (let i = 0; i < allCards.length; i++)
    {
        if (deviationMatching(str, allCards[i], MAX_DEVIATION_NUMBER)) {  
            if (levenshteinDistance(str, allCards[i]) <= MAX_LEVENSHTEIN_DISTANCE) {
                return allCards[i];
            }
        }
    }

    return null;
}

interface CardType {
    text: string
}

const dropProblematicTokens = (allCards: [CardType]) => {

    var filtered = allCards
        .map(card => card.text.trim().toLowerCase()) // remove heading and trailing whitespace and put everything to lower case
        .filter(card => !(card.length === 1 && !/\d/.test(card))) // remove token if is single char and not a number
        .filter(card => !(card.length > 1 && /^\d+$/.test(card))) // remove token if is multiple char and only numbers
        .filter(card => !(card.length > 1 && /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(card))) // remove token if is multiple char and made of letters and numbers
        .filter(card => !(card.includes('lt') || card.includes('lj'))) // remove token if contains 'lt' or 'lj' substring
        .filter(card => !(card.split('e').length - 1 == card.length)) // remove token if only made of 'e's
        .filter(card => !(card.length === 2 && card !== 'si' && card !== 'if'))
        .map(card => card.replace('é', 'e').replace('Ê', 'E')); // remove all accents

    return filtered;
}

export { checkVisionResp, dropProblematicTokens }