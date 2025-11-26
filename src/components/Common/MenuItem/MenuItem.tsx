import type { ReactNode } from "react";

import styles from "..//MenuItem/MenuItem.module.css";

interface Props {
    icon: ReactNode;
    label: ReactNode;
    size?: number;
    gap?: number;
    variant?: "default" | "operations" | "elements"
}

const MenuItem = ({icon,label,size=16,gap=8,variant} : Props) => {
    return (
        <div className={`${styles.wrapper} ${variant ? styles[variant] : ''}`} style={{gap,fontSize:size}}>
            {icon}
            <span>{label}</span>
        </div>
    );
}
export default MenuItem