import styles from "./Button.module.css";
import type {ReactNode} from "react";

export const Button = ({icon,children,className} : {icon?: ReactNode,children?:ReactNode,className?:string}) => {
  return <button className={`${styles.modernButton} ${className || ''}`}>
    {icon && <span className={styles.icon}>{icon}</span>}
    <span className={styles.label}>{children}</span>
    </button>;
};
