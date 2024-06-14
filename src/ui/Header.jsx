import Button from "./common/Button"
import AppLogo from "./icons/AppLogo";
import GearIcon from "./icons/GearIcon"
import KeyboardIcon from "./icons/KeyboardIcon"
import LeaveIcon from "./icons/LeaveIcon"

export default function Header({ currentPage, setCurrentPage, reRenderTestPage, isMobileScreen, isTyping }) {

    function handleRestartClick() {
        if (currentPage === 'test') {
            reRenderTestPage();
        }
        else {
            setCurrentPage('test')
        }
    }

    return (
        <div className="flex items-center">
            <div className={`text-3xl flex items-center cursor-pointer`}>
                <span className={`${isTyping ? 'text-light-icon dark:text-dark-icon': 'text-light-active dark:text-dark-active'}`}>
                    <AppLogo />
                </span>
                <span className={`${isTyping ? 'text-light-icon dark:text-dark-icon': 'text-light-hover dark:text-dark-hover'} ${isMobileScreen ? 'hidden' : ''} ml-2`}>humantype</span>
            </div>
            <div className="ml-4 flex">
                <Button icon={<KeyboardIcon />} onButtonClick={handleRestartClick} hide={isTyping} />
                <Button icon={<GearIcon />} hide={isTyping} />
            </div>
            <div className="ml-auto">
                <Button icon={<LeaveIcon />} hide={isTyping} />
            </div>
        </div>
    )
}