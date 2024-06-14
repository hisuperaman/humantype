import MenuBar from "../ui/MenuBar";
import TextContainer from "../ui/TextContainer";
import { useState } from "react";

export default function TestPage({ setCurrentPage, mode, setMode, totalTimer, setTotalTimer, totalWords, setTotalWords, setResultData, windowWidth, isMobileScreen, setIsModalOpened, isTyping, setIsTyping }) {
    const [showTextTransition, setShowTextTransition] = useState(false);


    return (
        <>
            <div className='mt-8'>
                <MenuBar mode={mode} setMode={setMode} totalTimer={totalTimer} setTotalTimer={setTotalTimer} totalWords={totalWords} setTotalWords={setTotalWords} isMobileScreen={isMobileScreen} setIsModalOpened={setIsModalOpened} hide={isTyping} />
            </div>
            <div className='mt-8'>
                <TextContainer mode={mode} totalTimer={totalTimer} totalWords={totalWords} showTextTransition={showTextTransition} setShowTextTransition={setShowTextTransition} setCurrentPage={setCurrentPage} setResultData={setResultData} windowWidth={windowWidth} setIsTyping={setIsTyping} />
            </div>
        </>
    )
}