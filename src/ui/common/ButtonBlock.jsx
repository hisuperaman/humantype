export default function ButtonBlock({ text, icon, isActive, onButtonClick }) {
    return (
        <div onClick={onButtonClick} className={`flex m-auto bg-light-secondary dark:bg-dark-secondary rounded-lg items-center px-4 py-3 hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-hover dark:hover:bg-dark-hover active:text-light-icon dark:active:text-dark-icon ${isActive?'text-light-primary dark:text-dark-primary bg-light-active dark:bg-dark-active':'text-light-icon dark:text-dark-icon'} cursor-pointer transition duration-100`}>
            <div className="">
                {icon}
            </div>
            <span className="ml-2">{text}</span>
        </div>

    )
}