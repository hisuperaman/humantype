import { useEffect, useRef, useState } from "react"
import Button from "../ui/common/Button"
import RestartIcon from "../ui/icons/RestartIcon"
import { CSSTransition } from "react-transition-group"


function ToolTip({ isVisible, text }) {
    const toolTipRef = useRef(null);

    return (
        <CSSTransition
            in={isVisible}
            unmountOnExit
            timeout={100}
            classNames={'tool-tip'}
            nodeRef={toolTipRef}
        >
            <div ref={toolTipRef} className={`absolute -top-6 text-[1rem] leading-[1em] px-2 py-1 dark:text-white dark:bg-black text-black bg-white`}>
                {text}
                <span className={`absolute -bottom-2 left-[40%] dark:border-t-black border-t-white w-0 h-0 border-t-[12px] border-l-transparent border-r-transparent border-l-[6px] border-r-[6px]`}>

                </span>
            </div>
        </CSSTransition>
    )
}

function TextDivLarge({ name, value, toolTipText }) {

    const [isHovered, setIsHovered] = useState(false);

    function handleMouseHover(hoverState) {
        if (toolTipText) {
            setIsHovered(hoverState);
        }
    }

    return (
        <div className="text-3xl flex flex-col relative">
            <div className="text-light-icon dark:text-dark-icon">{name}</div>
            <div className={`text-6xl text-light-active dark:text-dark-active`} >
                <span className={`${toolTipText ? 'cursor-pointer' : ''}`} onMouseEnter={() => handleMouseHover(true)} onMouseLeave={() => handleMouseHover(false)} >
                    {value}


                    <ToolTip isVisible={isHovered} text={toolTipText} />

                </span>

            </div>
        </div >
    )
}

function TextDivSmall({ name, value, toolTipText }) {

    const [isHovered, setIsHovered] = useState(false);

    function handleMouseHover(hoverState) {
        if (toolTipText) {
            setIsHovered(hoverState);
        }
    }

    return (
        <div className="flex flex-col relative" >
            <div className="text-light-icon dark:text-dark-icon">{name}</div>
            <div className={`text-3xl text-light-active dark:text-dark-active ${toolTipText ? 'cursor-pointer' : ''}`} onMouseEnter={() => handleMouseHover(true)} onMouseLeave={() => handleMouseHover(false)} >
                {value}


                <ToolTip isVisible={isHovered} text={toolTipText} />

            </div>


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
                            <TextDivLarge name={'wpm'} value={Math.round(resultData.wpm)} toolTipText={resultData.wpm + ' wpm'} />
                            <TextDivLarge name={'acc'} value={`${Math.round(resultData.accuracy)}%`} toolTipText={resultData.accuracy + '%'} />

                            <div className="mt-8 flex justify-between flex-wrap">

                                {
                                    isMobileScreen ? (
                                        <>
                                            <div>
                                                <TextDivSmall name={'test type'} value={resultData.mode} />
                                                <TextDivSmall name={'raw wpm'} value={`${Math.round(resultData.rawWpm)}`} toolTipText={resultData.rawWpm + ' wpm'} />

                                            </div>
                                            <div>
                                                <TextDivSmall name={'characters'} value={`${resultData.characters[0]}/${resultData.characters[1]}`} toolTipText={'correct/incorrect'} /> {/*correct/incorrect*/}
                                                <TextDivSmall name={'time'} value={`${Math.round(resultData.time)}s`} toolTipText={resultData.time + 's'} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <TextDivSmall name={'test type'} value={resultData.mode} />
                                            <TextDivSmall name={'raw wpm'} value={`${Math.round(resultData.rawWpm)}`} toolTipText={resultData.rawWpm + ' wpm'} />
                                            <TextDivSmall name={'characters'} value={`${resultData.characters[0]}/${resultData.characters[1]}`} toolTipText={'correct/incorrect'} /> {/*correct/incorrect*/}
                                            <TextDivSmall name={'time'} value={`${Math.round(resultData.time)}s`} toolTipText={resultData.time + 's'} />

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