import { useEffect, useRef, useState } from "react"
import Letter from "./Letter";
import { getCharactersData, getWpm } from "../lib/utils";
import useTimeMode from "../hooks/useTimeMode";
import useWordsMode from "../hooks/useWordsMode";
import Button from "./common/Button";
import RestartIcon from "./icons/RestartIcon";

export default function TextContainer({ mode, totalTimer, totalWords, showTextTransition, setShowTextTransition, setCurrentPage, setResultData, windowWidth, setIsTyping }) {

    const inputRef = useRef(null);
    const containerRef = useRef(null);


    const [inputText, setInputText] = useState('');
    const [charactersStatus, setCharactersStatus] = useState([]);

    const [startTime, setStartTime] = useState(null);


    const [currentCharacterPos, setCurrentCharacterPos] = useState({ top: 0, left: 0 });
    const [scrollableDivScrollTop, setScrollableDivScrollTop] = useState(0);


    const [isResetClicked, setIsResetClicked] = useState(false);

    const [sampleText, setSampleText] = useState('');

    const timeModeHookProps = useTimeMode(totalTimer, startTime, mode === 'time', stopTest, isResetClicked, inputText, sampleText);
    const wordsModeHookProps = useWordsMode(totalWords, inputText, mode === 'words', isResetClicked);

    const { sampleText: timeModeSampleText, extraText, timer, setTimer } = timeModeHookProps;
    const { sampleText: wordsModeSampleText, wordsTyped } = wordsModeHookProps;


    const textChangeTimeout = useRef(null);


    useEffect(()=>{
        if(extraText.length>0){
            setSampleText((prevSampleText)=>prevSampleText+extraText);
    
            setCharactersStatus((prevCharactersStatus)=>{
                const newCharactersStatus = Array(extraText.length).fill(null);
                return [...prevCharactersStatus, ...newCharactersStatus];
            });
        }
    }, [extraText]);

    useEffect(() => {
        if (textChangeTimeout.current) {
            clearTimeout(textChangeTimeout.current)
        }
        if (isResetClicked) {
            setIsResetClicked(false);
        }
        else {
            if (!showTextTransition) {
                setShowTextTransition(true);

            }
            textChangeTimeout.current = setTimeout(() => {
                setShowTextTransition(false);
            }, 100);
        }

        return () => {
            clearTimeout(textChangeTimeout.current);
        }
    }, [isResetClicked]);


    useEffect(() => {
        const newSampleText = mode === 'time' ? timeModeSampleText : wordsModeSampleText;
        setSampleText(newSampleText);
    }, [timeModeSampleText, wordsModeSampleText]);

    useEffect(() => {
        resetTest();
    }, [mode]);

    useEffect(() => {
        resetTest();
    }, [totalTimer, totalWords])


    // focus on input field whenever key is pressed
    useEffect(() => {
        function handleBodyKeyDown(e) {
            inputRef.current.focus();

        }
        document.body.addEventListener('keydown', handleBodyKeyDown);

        return () => {
            document.body.removeEventListener('keydown', handleBodyKeyDown);
        }
    }, []);


    // set the charactersStatus value to an array of null values based on sampleText length
    useEffect(() => {
        if(extraText.length<=0){
            setCharactersStatus(Array(sampleText.length).fill(null));
        }
    }, [sampleText, extraText]);


    useEffect(() => {
        if (startTime) {
            if (inputText.length === sampleText.length) {
                stopTest();
            }
        }
    }, [inputText, sampleText]);



    // set the inputText and charactersStatus whenever input field is changed
    function handleInputChange(e) {
        const value = e.target.value;

        let isFirstLetter = false;
        if (!startTime && inputText.length === 0) {
            const currentTime = new Date();
            setStartTime(currentTime);
            isFirstLetter = true;
        }

        if (startTime || isFirstLetter) {

            if (sampleText[value.length - 1] === ' ' && sampleText[value.length - 1] != value[value.length - 1]) {
                return;
            }


            if (value.length < inputText.length) {
                setCharactersStatus((prevCharactersStatus) => {
                    const newCharactersStatus = [...prevCharactersStatus];
                    newCharactersStatus[inputText.length - 1] = null;
                    return newCharactersStatus;
                });
            }
            else {
                const newCharactersStatus = [...charactersStatus];
                for (let i = 0; i < value.length; i++) {
                    newCharactersStatus[i] = value[i] === sampleText[i];
                }
                setCharactersStatus(newCharactersStatus);
            }


            setInputText(value);

        }

        setIsTyping(true);
    }

    // stops the test
    function stopTest() {
        const currentTime = new Date();
        const characters = getCharactersData(charactersStatus);

        const typedWords = inputText.split('').reduce((acc, value, index) => {
            if (value === ' ' && sampleText[index] === ' ') {
                return acc + 1;
            }
            else {
                return acc;
            }
        }, 0);

        const theWpm = getWpm(startTime, currentTime, typedWords, characters);
        setStartTime(null);


        setResultData((prevResultData) => {
            return { ...prevResultData, characters, rawWpm: theWpm.rawWpm, accuracy: theWpm.accuracy, wpm: theWpm.wpm, time: theWpm.time }
        });

        setIsTyping(false);
        setCurrentPage('result');
    }

    // resets the test
    function resetTest() {
        setStartTime(null);
        setInputText('');
        setIsResetClicked(true);
        setTimer(totalTimer);
    }


    // focus on input field whenever the text container is clicked
    function handleContainerClick() {
        inputRef.current.focus();
    }

    useEffect(() => {
        const scrollableDiv = containerRef.current;
        if (scrollableDiv) {
            const cursorTop = currentCharacterPos.top;
            const lineHeight = parseFloat(getComputedStyle(containerRef.current).lineHeight);

            const scrollableDivRect = scrollableDiv.getBoundingClientRect();
            const cursorTopFromDiv = cursorTop - (scrollableDivRect.top + window.scrollY);

            console.log(lineHeight, cursorTop, scrollableDivRect.top, cursorTopFromDiv)

            if (cursorTopFromDiv > lineHeight * 2 && cursorTopFromDiv < lineHeight * 3) {
                const offset = 6.54547119140625; // got by subtracting the old value of cursorTop with new value
                scrollableDiv.scrollTop += lineHeight;
                setScrollableDivScrollTop(scrollableDiv.scrollTop);
            }
        }
    }, [inputText, containerRef, currentCharacterPos]);


    return (
        <>
            <div className="text-3xl text-light-active dark:text-dark-active h-10 p-2">
                {startTime ? (mode === 'time' ? timer : `${wordsTyped}/${totalWords}`) : ''}
            </div>
            <div onClick={handleContainerClick} ref={containerRef} className={`p-2 leading-[3.5em] max-h-[10.8rem] h-[10.8rem] overflow-hidden ${showTextTransition ? 'opacity-0' : 'opacity-1'} transition duration-100`}>
                {!showTextTransition && (
                    <>
                        {sampleText.split('').map((char, index) => {
                            return <Letter key={index} windowWidth={windowWidth} scrollableDivScrollTop={scrollableDivScrollTop} char={char} index={index} setCurrentCharacterPos={setCurrentCharacterPos} currentIndex={inputText.length} isIncorrect={charactersStatus.length > 0 ? charactersStatus[index] !== null && !charactersStatus[index] : false} />
                        })}

                        {/* simulating an extra line */}
                        <span className="text-[2rem] leading-[0] whitespace-pre">                                                                                                                                      </span>

                        {
                            (inputText.length < sampleText.length && (currentCharacterPos.left >= 0 && currentCharacterPos.top >= containerRef.current.getBoundingClientRect().top)) &&
                            <div className={`bg-light-active dark:bg-dark-active inline-block h-8 w-[2px] absolute transition-all duration-100 ${!startTime ? 'animate-fade' : ''}`} style={{ left: `${currentCharacterPos.left}px`, top: `${currentCharacterPos.top + 5}px` }}></div>
                        }
                    </>
                )}

            </div>

            <input ref={inputRef} type="text" value={inputText} className="opacity-0 absolute z-[-1]" onChange={handleInputChange} />

            <div className="flex justify-center mt-4">
                <Button icon={<RestartIcon />} onButtonClick={resetTest} />
            </div>
        </>
    )
}