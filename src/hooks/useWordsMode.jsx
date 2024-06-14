import { useEffect, useState } from "react";
import { getRandomWords } from "../lib/utils";

export default function useWordsMode(totalWords, inputText, isModeActive, isResetClicked) {
    const [sampleText, setSampleText] = useState('');
    const [wordsTyped, setWordsTyped] = useState(0);

    useEffect(() => {
        if (isModeActive && isResetClicked) {
            let randomWords = getRandomWords(totalWords);
            let sentence = randomWords.join(" ");
            setSampleText(sentence);

        }
    }, [isResetClicked, isModeActive]);

    // count words
    useEffect(()=>{
        const typedWords = inputText.split('').reduce((acc, value, index)=>{
            if(value===' ' && sampleText[index]===' '){
                return acc+1;
            }
            else{
                return acc;
            }
        }, 0)
        setWordsTyped(typedWords);
    }, [inputText]);

    return { sampleText, wordsTyped };
}