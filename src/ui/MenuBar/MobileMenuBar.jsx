import ButtonLong from "../common/ButtonLong";

function ButtonGroupContainer({ children }) {
    return (
        <div className="mb-4 last:mb-0">
            {children}
        </div>
    )
}

function TimeMenuItems({ totalTimer, setTotalTimer }) {
    const menuItems = [15, 30, 60, 120];

    function handleMenuItemClick(item) {
        setTotalTimer(item);
    }

    return (
        <>
            {menuItems.map((value, index) => {
                return <ButtonLong key={index} text={value} isActive={totalTimer === value} onButtonClick={() => handleMenuItemClick(value)} />
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
                return <ButtonLong key={index} text={value} isActive={totalWords === value} onButtonClick={() => handleMenuItemClick(value)} />
            })}
        </>
    )
}

export default function MobileMenuBar({ mobileMenuRef, mode, setMode, totalTimer, setTotalTimer, totalWords, setTotalWords }) {

    function handleTimeMenuClick() {
        setMode('time');
    }
    function handleWordsMenuClick() {
        setMode('words');
    }

    return (
        <div ref={mobileMenuRef} className="z-10 top-[10%] left-[15%] absolute rounded-xl w-[70%] h-[80%] bg-dark-primary overflow-y-scroll">
            <div className="flex flex-col p-4">
                <ButtonGroupContainer>
                    <ButtonLong text={'time'} isActive={mode === 'time'} onButtonClick={handleTimeMenuClick} />
                    <ButtonLong text={'words'} isActive={mode === 'words'} onButtonClick={handleWordsMenuClick} />
                </ButtonGroupContainer>

                <ButtonGroupContainer>
                    {
                        mode==='time' ? <TimeMenuItems totalTimer={totalTimer} setTotalTimer={setTotalTimer} /> : <WordsMenuItems totalWords={totalWords} setTotalWords={setTotalWords} />
                    }
                </ButtonGroupContainer>
            </div>
        </div>
    )
}