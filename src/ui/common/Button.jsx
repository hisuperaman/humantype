export default function Button({ text, icon, isActive, onButtonClick, hide }) {
    return (
        <div onClick={onButtonClick} className={`${hide ? 'opacity-0' : 'opacity-1' } flex items-center px-2 py-2 text-sm hover:text-light-hover dark:hover:text-dark-hover active:text-light-icon dark:active:text-dark-icon ${isActive?'text-light-active dark:text-dark-active':'text-light-icon dark:text-dark-icon'} cursor-pointer transition duration-100`}>
            <div className="">
                {icon}
            </div>
            <span className="ml-2">{text}</span>
        </div>

    )
}