import type React from "react";
import styles from "./Sidebar.module.css";

import { 
  Home, 
  FolderOpen, 
  Share2, 
  Clock, 
  Star, 
  CircleAlert, 
  Trash2,
  Plus,
  icons
} from "lucide-react";
import { useState } from "react";
import {Button} from "../Common/Button";


const Sidebar = ({ 
  children,
  activeView,
  setActiveView
}: { 
  children?: React.ReactNode,
  activeView: number,
  setActiveView: (index: number) => void
}) => {

    const [hoveredIndex,setHoveredIndex] = useState<number | null>(null);
    const [activeIndex,setActiveIndex] = useState<number | null>(null);

    const items = [
    { icon: <Home/>, label: "Strona główna" },
    { icon: <FolderOpen />, label: "Moje Pliki" },
    null, // odstęp między grupami
    { icon: <Share2 />, label: "Udostępnione dla mnie" },
    { icon: <Clock />, label: "Ostatnie" },
    { icon: <Star />, label: "Oznaczone gwiazdką" },
    null, 
    { icon: <CircleAlert />, label: "Spam" },
    { icon: <Trash2 />, label: "Kosz" },
  ];

  const addItem = {icon: <Plus strokeWidth={2.7} size={25}/>,label: "Nowy"}

  return (
    <div className={styles.sidebarContent}>
        <div className={styles.sidebarAddFile}>
          <Button icon={addItem.icon}>
            {addItem.label}
          </Button>
        </div>
        <div className={styles.sidebarOptions}>
            {items.map((item,index) => 
            item ? (
                <div key={index} 
                className={
                  activeIndex === index
                    ? styles.boxActivated     // jeśli kliknięty → zaznaczony
                    : hoveredIndex === index
                    ? styles.boxSelected      // jeśli hover → hover
                    : styles.box             // domyślny
                }
                onClick={()=>{setActiveIndex(index),setActiveView(index)}}
                onMouseEnter={()=>setHoveredIndex(index)}
                onMouseLeave={()=>setHoveredIndex(null)}>
                    <div className={
                      activeIndex === index ? styles.iconActivated : styles.icon
                    }
                    >{item.icon}</div>
                    <div className={
                      activeIndex === index ? styles.labelActived : styles.label
                    }>{item.label}</div>
                </div>
            ) : (
                <div key={index} className={styles.groupSpacer}></div>
            )
            )}
        </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default Sidebar;
