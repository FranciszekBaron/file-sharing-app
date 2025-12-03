import styles from "./Button.module.css";
import type {ReactNode} from "react";


interface Props {
  icon: ReactNode,
  children?: ReactNode,
  className?: string,
  onClick?: () => void;
}

export const Button = ({icon,children,className,onClick}:Props) => {

  const isIconOnly = icon && !children;

  return <button className={`${styles.modernButton} ${className || ''}`} onClick={onClick}>
    {/* Jeśli tylko ikona - renderuj BEZ span */}
      {isIconOnly ? icon : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children && <span className={styles.label}>{children}</span>}
        </>
      )}
    </button>;
};
