import { useState, useRef, useEffect, type ReactNode } from "react"
import styles from "..//Modal//Modal.module.css"

interface Props{
    children?: React.ReactNode,
    open: boolean
    onClose: () => void
}

const Modal = ({children,open,onClose} : Props) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        const handlelickOutside = (e: MouseEvent) => {
            console.log(e.target)
            if(ref.current && !ref.current.contains(e.target as Node)){
                onClose()
            }
        }

    document.addEventListener('mousedown',handlelickOutside);

    return () => {
        document.removeEventListener('mousedown',handlelickOutside);
            }
    },[open,onClose]);//tylko przy mount

    if (!open) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={ref}>
                {children}
            </div>
        </div>
    )
}

export default Modal