import { useState, useRef, useEffect } from "react";
import { getRandomWords } from "../lib/utils";

export default function useTimeMode(totalTimer, startTime, isModeActive, stopTest, isResetClicked) {
    const [sampleText, setSampleText] = useState('');

    const intervalRef = useRef(null);
    const [timer, setTimer] = useState(totalTimer);
    
    useEffect(() => {
        if (isModeActive && isResetClicked) {
            let randomWords = getRandomWords(150);
            let sentence = randomWords.join(" ");
            setSampleText(sentence);

        }
    }, [isResetClicked, isModeActive])


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


    return { sampleText, timer, setTimer };

}