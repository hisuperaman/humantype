import { useState, useRef, useEffect } from "react";
import { getRandomWords } from "../lib/utils";

export default function useTimeMode(totalTimer, isModeActive, isResetClicked, inputText, realSampleText) {
    const [sampleText, setSampleText] = useState('');

    const [timer, setTimer] = useState(totalTimer);

    const [extraText, setExtraText] = useState('');

    useEffect(() => {
        if (isModeActive && isResetClicked) {
            let randomWords = getRandomWords(50);
            let sentence = randomWords.join(" ");
            setSampleText(sentence);
            setExtraText('');
        }
    }, [isResetClicked, isModeActive]);

    useEffect(() => {
        if (isModeActive && (realSampleText.length > 0 && inputText.length === realSampleText.length - (4 * 40))) {
            let randomWords = getRandomWords(50);
            let sentence = randomWords.join(" ");
            setExtraText(' ' + sentence);

        }
    }, [isModeActive, realSampleText, inputText]);


    return { sampleText, extraText, timer, setTimer };

}