export default function Link({ text, icon, isActive, href, hide }) {
    return (
        <a href={href} target="_blank" className={`${hide ? 'opacity-0' : 'opacity-1' } ${text ? '' : 'ml-2'} ${isActive?'text-light-active dark:text-dark-active':'text-light-icon dark:text-dark-icon'} flex items-center px-2 py-2 hover:text-light-hover dark:hover:text-dark-hover active:text-light-icon dark:active:text-dark-icon cursor-pointer transition duration-100`}>
            <div className="">
                {icon}
            </div>
            <span className={`${text ? 'px-1': ''}`}>{text}</span>
        </a>

    )
}