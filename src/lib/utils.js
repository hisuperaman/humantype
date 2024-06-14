/** 
 * @param {Date} startTime 
 * @param {Date} endTime 
 * @param {number} typedWords 
**/

export function getWpm(startTime, endTime, typedWords, characters) {
    const timeDiff = (endTime - startTime) / 1000;
    const minutes = timeDiff / 60;

    const rawWpm = (typedWords / minutes).toFixed(1);

    const accuracy = (characters[0] / (characters[0] + characters[1])) * 100; // correct characters divided by total characters
    const wpm = rawWpm * (accuracy / 100);

    return { rawWpm: Math.round(rawWpm), accuracy: Math.round(accuracy), wpm: Math.round(wpm), time: Math.round(timeDiff) };
}

export function getCharactersData(charactersStatus) {
    let correctCount = 0, incorrectCount = 0;

    for (let i = 0; i < charactersStatus.length; i++) {
        const status = charactersStatus[i];

        if (status === null) {
            break;
        }
        if (status === true) {
            correctCount++;
        }
        else if (status === false) {
            incorrectCount++;
        }
    }

    return [correctCount, incorrectCount];
}


export function getRandomWords(numWords) {
    let words = [
        "this", "that", "he", "she", "it", "we", "they", "you",
        "what", "which", "who", "whom", "whose", "where", "when", "why", "how",
        "do", "doing", "did", "done", "is", "are", "was", "were", "am", "be",
        "have", "has", "had", "having", "will", "would", "shall", "should",
        "can", "could", "may", "might", "must", "ought", "to", "from", "of",
        "in", "on", "at", "by", "with", "about", "for", "under", "over", "between",
        "through", "during", "before", "after", "above", "below", "inside", "outside",
        "next", "near", "far", "up", "down", "left", "right", "here", "there", "now",
        "then", "soon", "always", "never", "sometimes", "often", "rarely", "frequently",
        "yes", "no", "maybe", "sure", "okay", "not", "just", "only", "very", "quite",
        "really", "almost", "much", "many", "few", "some", "any", "every", "all",
        "none", "more", "less", "than", "like", "such", "so", "because", "since",
        "if", "unless", "until", "while", "although", "though", "even", "either",
        "neither", "both", "whether", "yet", "however", "still", "also", "too",
        "and", "but", "or", "nor", "for", "as", "about", "against", "among", "around"
    ];

    let randomWords = [];
    for (let i = 0; i < numWords; i++) {
        let randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
    }
    return randomWords;
}