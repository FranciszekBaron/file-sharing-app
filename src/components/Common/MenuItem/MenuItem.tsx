import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import styles from "..//MenuItem/MenuItem.module.css";

interface Props {
    icon?: ReactNode;
    label: ReactNode;
    size?: number;
    gap?: number;
    variant?: "default" | "operations" | "elements" ;
    style?: CSSProperties;
    onActivate?: ()=>void;
    clicked?:boolean;
}


const MenuItem = ({icon,label,size=16,gap=8,variant,style,onActivate,clicked} : Props) => {
    return (

        <div className={`
            ${styles.wrapper} 
            ${variant ? styles[variant] : ''}
            ${clicked ? styles.clicked : ''}
        `}
        style={{gap,fontSize:size,...style}} 
        onClick={onActivate}>
            {clicked ? <Check size={size*1.5} color="blue"></Check> : icon}
            <span>{label}</span>
        </div>
    );
}
export default MenuItem

//Brzydko zrobiony css, nie auomatyczny tylko padding nie elegancki