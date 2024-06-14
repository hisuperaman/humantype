import ClockIcon from "./icons/ClockIcon"
import WordIcon from "./icons/WordIcon"
import Button from "./common/Button"
import { useEffect, useRef, useState } from "react"
import GearIconSmall from "./icons/GearIconSmall";
import ButtonBlock from "./common/ButtonBlock";
import MobileMenuBar from "./MenuBar/MobileMenuBar";
import { CSSTransition } from "react-transition-group";


function TimeMenuItems({ totalTimer, setTotalTimer }) {

    const menuItems = [15, 30, 60, 120];

    function handleMenuItemClick(item) {
        setTotalTimer(item);
    }

    return (
        <>
            {menuItems.map((value, index) => {
                return <Button key={index} text={value} isActive={totalTimer === value} onButtonClick={() => handleMenuItemClick(value)} />
            })}
        </>
    )
}

function WordsMenuItems({ totalWords, setTotalWords }) {
    const menuItems = [10, 25, 50, 100];

    function handleMenuItemClick(item) {
        setTotalWords(item);
    }

    return (
        <>
            {menuItems.map((value, index) => {
                return <Button key={index} text={value} isActive={totalWords === value} onButtonClick={() => handleMenuItemClick(value)} />
            })}
        </>
    )
}



function SeparatorVertical() {
    return (
        <span className="border-l-4 border-light-primary dark:border-dark-primary mx-2"></span>
    )
}

export default function MenuBar({ mode, setMode, totalTimer, setTotalTimer, totalWords, setTotalWords, isMobileScreen, setIsModalOpened, hide }) {

    const [showTransition, setShowTransition] = useState(false);

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileMenuRef = useRef(null);

    const menuChangeTimeout = useRef(null);

    function handleTimeMenuClick() {
        setMode('time');
    }
    function handleWordsMenuClick() {
        setMode('words');
    }

    function handleMobileMenuClick() {
        setShowMobileMenu(true);
    }


    useEffect(() => {
        if (!showTransition) {
            setShowTransition(true);
        }
        menuChangeTimeout.current = setTimeout(() => {
            setShowTransition(false);
        }, 100);

        return () => {
            clearTimeout(menuChangeTimeout.current);
        }
    }, [mode]);


    useEffect(() => {
        if (showMobileMenu) {
            setIsModalOpened(true);
        }
        else {
            setIsModalOpened(false);
        }
    }, [showMobileMenu]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setShowMobileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className={`flex h-11`}>
            {

                isMobileScreen ?
                    (
                        <>
                            <div className={`m-auto text-xs ${hide ? 'opacity-0' : 'opacity-1'}`}>
                                <ButtonBlock icon={<GearIconSmall />} text={'Test Settings'} onButtonClick={handleMobileMenuClick} />
                            </div>


                            <CSSTransition
                                in={showMobileMenu}
                                unmountOnExit
                                classNames={'fade-page'}
                                timeout={100}
                                nodeRef={mobileMenuRef}
                            >
                                <MobileMenuBar mode={mode} mobileMenuRef={mobileMenuRef} setMode={setMode} totalTimer={totalTimer} setTotalTimer={setTotalTimer} totalWords={totalWords} setTotalWords={setTotalWords} />
                            </CSSTransition>

                        </>
                    )
                    :
                    (

                        <div className={`${hide ? 'opacity-0' : 'opacity-1'} m-auto bg-light-secondary dark:bg-dark-secondary py-1 px-4 flex rounded-lg`}>

                            <Button text={'time'} icon={<ClockIcon />} isActive={mode === 'time'} onButtonClick={handleTimeMenuClick} />
                            <Button text={'words'} icon={<WordIcon />} isActive={mode === 'words'} onButtonClick={handleWordsMenuClick} />

                            <SeparatorVertical />

                            <div className={`flex w-44 h-9 ${showTransition ? 'opacity-0' : 'opacity-1'} transition duration-100`}>
                                {mode === 'time' && !showTransition ? <TimeMenuItems totalTimer={totalTimer} setTotalTimer={setTotalTimer} /> : (!showTransition ? <WordsMenuItems totalWords={totalWords} setTotalWords={setTotalWords} /> : '')}
                            </div>

                        </div>
                    )
            }

        </div>
    )
}