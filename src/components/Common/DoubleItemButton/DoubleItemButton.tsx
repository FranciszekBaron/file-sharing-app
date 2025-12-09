import { useState } from "react";
import styles from "..//DoubleItemButton//DoubleItemButton.module.css"
import { Menu, LayoutGrid, Check, CheckIcon } from "lucide-react";
import { ListIcon } from "..//..//..//icons//ListIcon";
import { GridIcon } from "..//..//..//icons//GridIcon";

interface Props {
    size: number;
    activeLayout: 'list' | 'grid'
    onActivateLeft?: () => void;
    onActivateRight?: () => void;
}

const DoubleItemButton = ({ size, activeLayout, onActivateLeft, onActivateRight }: Props) => {
  const multiplier = 3.529;
  const width = (size * multiplier);
  
  // ✅ Oblicz strokeWidth relatywnie
  const iconSize = 18;
  const baseStrokeWidth = 1;
  const strokeWidth = (baseStrokeWidth * 18) / iconSize;  // ← skaluje odwrotnie

  return (
    <div className={styles.viewButton} style={{ width: width, height: size }}>
      <div 
        className={`${styles.left} ${activeLayout === 'list' ? styles.active : ''}`}
        style={{ width: `${width / 2}px` }}  
        onClick={onActivateLeft}
      >
        {activeLayout === 'list' && (
          <Check size={iconSize} className={styles.checkIcon} strokeWidth={strokeWidth} />
        )}
        <ListIcon size={18} strokeWidth={2}></ListIcon>
      </div>    
      
      <div 
        className={`${styles.right} ${activeLayout === 'grid' ? styles.active : ''}`}
        style={{ width: `${width / 2}px` }}  
        onClick={onActivateRight}
      >
        {activeLayout === 'grid' && (
          <Check size={iconSize} className={styles.checkIcon} strokeWidth={strokeWidth} />
        )}
        <GridIcon size={18} strokeWidth={2}></GridIcon>
      </div>
    </div>
  );
}

export default DoubleItemButton