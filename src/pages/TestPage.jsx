import MenuBar from "../ui/MenuBar";
import TextContainer from "../ui/TextContainer";
import { useState } from "react";

export default function TestPage({ setCurrentPage, mode, setMode, totalTimer, setTotalTimer, totalWords, setTotalWords, setResultHistory, windowWidth, isMobileScreen, setIsModalOpened, isTyping, setIsTyping }) {
    const [showTextTransition, setShowTextTransition] = useState(false);

    return (
        <>
            <div className='mt-8'>
                <MenuBar mode={mode} setMode={setMode} totalTimer={totalTimer} setTotalTimer={setTotalTimer} totalWords={totalWords} setTotalWords={setTotalWords} isMobileScreen={isMobileScreen} setIsModalOpened={setIsModalOpened} hide={isTyping} />
            </div>
            <div className='mt-8'>
                <TextContainer mode={mode} totalTimer={totalTimer} totalWords={totalWords} showTextTransition={showTextTransition} setShowTextTransition={setShowTextTransition} setCurrentPage={setCurrentPage} setResultHistory={setResultHistory} windowWidth={windowWidth} isTyping={isTyping} setIsTyping={setIsTyping} />
            </div>
        </>
    )
}