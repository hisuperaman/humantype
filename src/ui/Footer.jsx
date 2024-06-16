import Link from "./common/Link";
import HeartIcon from "./icons/HeartIcon";

export default function Footer({ isTyping }) {
    return (
        <div className='mt-auto py-2 transition-all duration-100'>

            <div className={`flex justify-center items-center text-sm`}>
                <span className={`${isTyping ? 'text-light-icon dark:text-dark-icon' : ''} whitespace-pre flex items-center transition-all duration-100`}>
                    Developed with
                    <span className={`whitespace-pre mx-3 ${isTyping ? 'text-dark-icon' : 'text-dark-active'} transition-all duration-100`}>
                        <HeartIcon />
                    </span>
                    by
                </span>
                <Link text={'hisuperaman'} href={'https://github.com/hisuperaman'} isActive={!isTyping} />
            </div>

        </div>
    )
}