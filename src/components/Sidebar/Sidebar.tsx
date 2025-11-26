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
  icons,
  FolderPlus, 
  Upload, 
  FileUp,
  MenuIcon,
  AlertCircle
} from "lucide-react";

import { useState } from "react";
import {Button} from "../Common/Button";
import DropDownButton from "../DropDownButton/DropDownButton";
import IconText from "../Common/MenuItem/MenuItem";
import MenuDivider from "../Common/MenuDivider/MenuDivider";
import MenuItem from "../Common/MenuItem/MenuItem";


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
    { icon: <Home strokeWidth={2.5}/>, label: "Strona główna"  },
    { icon: <FolderOpen strokeWidth={2.5}/>, label: "Moje Pliki" },
    null, // odstęp między grupami
    { icon: <Share2 strokeWidth={2.5}/>, label: "Udostępnione dla mnie" },
    { icon: <Clock strokeWidth={2.5}/>, label: "Ostatnie" },
    { icon: <Star strokeWidth={2.5}/>, label: "Oznaczone gwiazdką" },
    null, 
    { icon: <CircleAlert strokeWidth={2.5}/>, label: "Spam" },
    { icon: <Trash2 strokeWidth={2.5}/>, label: "Kosz" },
  ];

  const addFileIcon = <FolderPlus size={20}/>
  const uploadFileIcon = <Upload size={20}/>
  const FileUpIcon = <FileUp size={20}/>
  const alertIcon = <AlertCircle size = {20}/>

  const addItem = <Plus strokeWidth={2.7} size={25}/>;

  return (
    <div className={styles.sidebarContent}>
        <div className={styles.sidebarAddFile}>
          <DropDownButton icon={addItem} label="Nowy" variant="icon">
            <MenuItem icon = {addFileIcon} label="Nowy Folder" gap={20} variant="operations"/>
                <MenuDivider/>
                <MenuItem icon = {uploadFileIcon} label= "Prześlij Plik"gap={20} variant="operations"/>
                <MenuItem icon = {FileUpIcon} label= "Prześlij Folder"gap={20} variant="operations"/> 
                <MenuDivider/>
                <MenuItem icon = {alertIcon} label= "..."gap={20} variant="operations"/>
          </DropDownButton>
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
