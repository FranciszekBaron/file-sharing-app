import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import styles from "..//MenuItem/MenuItem.module.css";
import { CheckIcon } from "..//..//..//icons//CheckIcon";

interface Props {
    children?: React.ReactNode
    icon?: ReactNode;
    label?: ReactNode;
    size?: number;
    gap?: number;
    variant?: "default" | "operations" | "elements" | "sortOptions" ;
    style?: CSSProperties;
    onActivate?: ()=>void;
    clicked?:boolean;
}


const MenuItem = ({children,icon,label,size=16,gap=8,variant,style,onActivate,clicked} : Props) => {
    return (

        <div className={`
            ${styles.wrapper} 
            ${variant ? styles[variant] : ''}
            ${clicked ? styles.clicked : ''}
        `}
        style={{gap,fontSize:size,...style}} 
        onClick={onActivate}>
            {/* ZAWSZE ten sam wrapper */}
            <div className={styles.checkmarkIcon}>
                {clicked ? (
                <CheckIcon size={size * 1.5} color="#373737ff" />
                ) : (
                icon || <div style={{ width: size * 1.5, height: size * 1.5 }} />  // ← pusty placeholder
                )}
            </div>
            <span>{label}</span>
            {children}
        </div>
    );
}
export default MenuItem

//Brzydko zrobiony css, nie auomatyczny tylko padding nie elegancki