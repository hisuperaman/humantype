import { useEffect, useRef, useState } from "react"
import Button from "../ui/common/Button"
import RestartIcon from "../ui/icons/RestartIcon"

function TextDivLarge({ name, value }) {
    return (
        <div className="text-3xl flex flex-col">
            <div className="text-light-icon dark:text-dark-icon">{name}</div>
            <div className="text-6xl text-light-active dark:text-dark-active">{value}</div>
        </div>
    )
}

function TextDivSmall({ name, value }) {
    return (
        <div className="flex flex-col">
            <div className="text-light-icon dark:text-dark-icon">{name}</div>
            <div className="text-3xl text-light-active dark:text-dark-active">{value}</div>
        </div>
    )
}

export default function ResultPage({ setCurrentPage, resultData, isMobileScreen }) {
    const [showTransition, setShowTransition] = useState(true);
    const transitionTimeout = useRef(null);


    useEffect(() => {
        if (transitionTimeout.current) {
            clearTimeout(transitionTimeout.current)
        }
        if (!showTransition) {
            setShowTransition(true);

        }
        transitionTimeout.current = setTimeout(() => {
            setShowTransition(false);
        }, 100);
        return () => {
            clearTimeout(transitionTimeout.current);
        }
    }, []);


    function handleRestartClick() {
        setCurrentPage('test');
    }

    return (
        <>
            <div className={`mt-20 ${showTransition ? 'opacity-0' : 'opacity-1'} transition-all duration-100`}>

                {
                    !showTransition && (
                        <>
                            <TextDivLarge name={'wpm'} value={resultData.wpm} />
                            <TextDivLarge name={'acc'} value={`${resultData.accuracy}%`} />

                            <div className="mt-8 flex justify-between flex-wrap">

                                {
                                    isMobileScreen ? (
                                        <>
                                            <div>
                                                <TextDivSmall name={'test type'} value={resultData.mode} />
                                                <TextDivSmall name={'raw wpm'} value={`${resultData.rawWpm}`} />

                                            </div>
                                            <div>
                                                <TextDivSmall name={'characters'} value={`${resultData.characters[0]}/${resultData.characters[1]}`} /> {/*correct/incorrect*/}
                                                <TextDivSmall name={'time'} value={`${resultData.time}s`} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <TextDivSmall name={'test type'} value={resultData.mode} />
                                            <TextDivSmall name={'raw wpm'} value={`${resultData.rawWpm}`} />
                                            <TextDivSmall name={'characters'} value={`${resultData.characters[0]}/${resultData.characters[1]}`} /> {/*correct/incorrect*/}
                                            <TextDivSmall name={'time'} value={`${resultData.time}s`} />

                                        </>
                                    )
                                }



                            </div>

                            <div className="mt-4 flex justify-center">
                                <Button icon={<RestartIcon />} onButtonClick={handleRestartClick} />
                            </div>
                        </>
                    )
                }


            </div>
        </>
    )
}