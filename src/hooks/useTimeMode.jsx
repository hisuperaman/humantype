import { useState, useRef, useEffect } from "react";
import { getRandomWords } from "../lib/utils";

export default function useTimeMode(totalTimer, startTime, isModeActive, stopTest, isResetClicked, inputText, realSampleText) {
    const [sampleText, setSampleText] = useState('');

    const intervalRef = useRef(null);
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
            // console.log('extra')
            let randomWords = getRandomWords(50);
            let sentence = randomWords.join(" ");
            setExtraText(' ' + sentence);

        }
    }, [isModeActive, realSampleText, inputText]);


    // start the timer whenever startTime is set
    useEffect(() => {
        if (startTime && isModeActive) {
            intervalRef.current = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1)
            }, 1000);
        }

        return () => {
            return clearInterval(intervalRef.current);
        }
    }, [startTime]);


    // stop test when the timer becomes 0
    useEffect(() => {
        if (timer <= 0) {
            clearInterval(intervalRef.current);

            stopTest();

        }
    }, [timer]);


    return { sampleText, extraText, timer, setTimer };

}