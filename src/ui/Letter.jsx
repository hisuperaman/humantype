import { useEffect, useRef, useState } from "react"

export default function Letter({ char, index, currentIndex, isIncorrect, setCurrentCharacterPos, scrollableDivScrollTop, windowWidth }) {
    const spanRef = useRef(null);

    useEffect(()=>{
        if(index===currentIndex && spanRef.current){
            const rect = spanRef.current.getBoundingClientRect();
            setCurrentCharacterPos({top: rect.top + window.scrollY, left: rect.left});
        }
    }, [currentIndex, index, spanRef, scrollableDivScrollTop, windowWidth]);

    return (
        <span className="text-[2rem] leading-[0]" ref={spanRef}>
            <span className={`transition duration-100 leading-[0] ${isIncorrect ? 'text-light-danger dark:text-dark-danger' : (index < currentIndex ? 'text-light-hover dark:text-dark-hover' : 'text-light-icon dark:text-dark-icon')}`}>{char}</span>
        </span>
    )
}