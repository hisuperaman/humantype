export default function ButtonLong({ text, icon, isActive, onButtonClick }) {
    return (
        <div onClick={onButtonClick} className={`flex m-auto w-full mb-2 justify-center rounded-lg items-center px-4 py-3 hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-hover dark:hover:bg-dark-hover active:text-light-icon dark:active:text-dark-icon ${isActive ? 'text-light-primary dark:text-dark-primary bg-light-active dark:bg-dark-active' : 'text-light-hover dark:text-dark-hover bg-light-secondary dark:bg-dark-secondary'} cursor-pointer transition duration-100`}>
            <div className="">
                {icon}
            </div>
            <span className="ml-2">{text}</span>
        </div>

    )
}