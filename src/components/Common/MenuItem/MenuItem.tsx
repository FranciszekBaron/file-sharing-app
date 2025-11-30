import type { CSSProperties, ReactNode } from "react";
import { Check } from "lucide-react";
import styles from "..//MenuItem/MenuItem.module.css";

interface Props {
    icon: ReactNode;
    label: ReactNode;
    size?: number;
    gap?: number;
    variant?: "default" | "operations" | "elements";
    style?: CSSProperties;
    onClick?: (event: React.MouseEvent<HTMLDivElement,MouseEvent>) => void;
    clicked?:boolean;
}


const MenuItem = ({icon,label,size=16,gap=8,variant,style,onClick,clicked} : Props) => {
    return (

        <div className={`
            ${styles.wrapper} 
            ${variant ? styles[variant] : ''}
            ${clicked ? styles.clicked : ''}
        `}
        style={{gap,fontSize:size,...style}} 
        onClick={onClick}>
            {clicked ? <Check size={size} color="blue"></Check> : icon}
            <span>{label}</span>
        </div>
    );
}
export default MenuItem