import { useState, useRef, useEffect, type ReactNode } from "react"
import styles from "..//Modal//Modal.module.css"
import { Currency } from "lucide-react"

interface Props{
    children?: React.ReactNode,
    header?: React.ReactNode,
    bottom?: React.ReactNode
    open: boolean
    onClose: () => void,
    className?: string,
    overlay?: string,
    clickableRef?: React.RefObject<HTMLDivElement | null> 
    bottomRef?:React.RefObject<HTMLDivElement | null>
}

const Modal = ({children,header,bottom,open,onClose,className,overlay,clickableRef,bottomRef} : Props) => {

    const ref = useRef<HTMLDivElement>(null);


    
    useEffect(()=>{
        const handlelickOutside = (e: MouseEvent) => {
            
            const clickedInsindeMain = ref.current && ref.current?.contains(e.target as Node);
            
            const clickedInsideSecond = clickableRef?.current?.contains(e.target as Node);

            const clickedInsideBottm = bottomRef?.current?.contains(e.target as Node);

            if(!clickedInsindeMain && !clickedInsideSecond && !clickedInsideBottm){
                onClose()
            }
        }

    
        document.addEventListener('mousedown', handlelickOutside);
    

    return () => {
        document.removeEventListener('mousedown',handlelickOutside);
        }
    },[open,onClose,clickableRef,bottomRef]);//tylko przy mount

    if (!open) return null;

    return (
        <div className={overlay ? overlay : styles.modalOverlay}>
            {header}
            <div className={className ? className : styles.modalContent} ref={ref}>
                {children}
            </div>
            {bottom}
        </div>
    )
}

export default Modal