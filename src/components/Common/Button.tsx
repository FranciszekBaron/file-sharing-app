import styles from "./Button.module.css";
import type {ReactNode} from "react";

export const Button = ({icon,children,className} : {icon?: ReactNode,children?:ReactNode,className?:string}) => {

  const isIconOnly = icon && !children;

  return <button className={`${styles.modernButton} ${className || ''}`}>
    {/* Jeśli tylko ikona - renderuj BEZ span */}
      {isIconOnly ? icon : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children && <span className={styles.label}>{children}</span>}
        </>
      )}
    </button>;
};
