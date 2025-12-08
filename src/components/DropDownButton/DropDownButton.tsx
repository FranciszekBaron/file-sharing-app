import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "../DropDownButton/DropDownButton.module.css"
import { ChevronDown, X } from "lucide-react";

interface Props {
  children?: React.ReactNode;
  icon?: ReactNode;
  label?: string;
  textSize?: number;
  variant?: "default" | "filters" | "icon"; 
  menuVariant?: "default" | "operations" | "elements";
  position?: "below" | "above" | "left" | "right" | "on";
  selected?: boolean;
  onClear?: () => void;
  style?: CSSProperties;
}

const DropDownButton = ({
  children,
  icon,
  label,
  textSize = 24,
  variant,
  menuVariant,
  position = "below",
  selected,
  style,
  onClear
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasIcon = !!icon;

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 

  // Mapowanie position na klasy CSS
  const positionClass = {
    below: styles.posBelow,
    above: styles.posAbove,
    left: styles.posLeft,
    right: styles.posRight,
    on: styles.on
  }[position];

  return (
    <div 
      className={`${styles.wrapper} ${hasIcon ? styles.overlap : styles.dropdown} ${positionClass || ''}`} 
      ref={ref}
    >
      {hasIcon ? (
        <button 
          className={`${styles.button}  ${variant ? styles[variant] : ''}`}
          style={{...style}}
          onClick={() => setOpen(!open)}
        >
          {icon}
          {label}
        </button>
      ) : (
        <button 
          className={`${styles.button} ${variant ? styles[variant] : ''} ${selected ? styles.clicked : ""}`} 
          style={{ fontSize: `${textSize}px` }} 
          onClick={() => setOpen(!open)}
        >
          {label}
          <ChevronDown 
            size={11} 
            className={open ? styles.iconOpen : ""} 
            color="black" 
            fill="black" 
          />
        </button>
      )}
      
      {selected && (
        <button className={styles.clearBtn} onClick={onClear}>
          <X size={16} color="rgb(41,83,125)" />
        </button>
      )}
      
      {open && (
        <div className={`${styles.menu} ${menuVariant ? styles[menuVariant] : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default DropDownButton;