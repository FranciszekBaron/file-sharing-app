import { useState } from "react";
import styles from "..//DoubleItemButton//DoubleItemButton.module.css"
import { Menu, LayoutGrid, Check, CheckIcon } from "lucide-react";


interface Props {
    size: number;
    activeLayout: 'list' | 'grid'
    onActivateLeft?: () => void;
    onActivateRight?: () => void;
}

const DoubleItemButton = ({size,activeLayout,onActivateLeft,onActivateRight}:Props) => {

    const multiplier = 3.529;
    const width = (size*multiplier);

    console.log(activeLayout)


    return (
    <div className={styles.viewButton} style={{ width: width, height: size }}>
      <div 
        className={`${styles.left} ${activeLayout==='list' ? styles.active : ''}`} 
        style={{ width: `${width / 2}px` }}  
        onClick={onActivateLeft}
      >
        {activeLayout === 'list' && (
          <Check size={18} className={styles.checkIcon} />
        )}
        <Menu size={18} strokeWidth={2.5} className={styles.mainIcon} />
      </div>    
      
      <div 
        className={`${styles.right} ${activeLayout==='grid' ? styles.active : ''}`} 
        style={{ width: `${width / 2}px` }}  
        onClick={onActivateRight}
      >
        {activeLayout === 'grid' && (
          <Check size={18} className={styles.checkIcon} />
        )}
        <LayoutGrid size={18} strokeWidth={2.5} className={styles.mainIcon} />
      </div>
    </div>
  );
}

export default DoubleItemButton