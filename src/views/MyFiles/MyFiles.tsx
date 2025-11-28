import { useState } from "react";
import styles from "..//MyFiles/MyFiles.module.css"
import type { FileItem as FileItemType} from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";
import DropDownButton from "../../components/DropDownButton/DropDownButton";
import MenuItem from "../../components/Common/MenuItem/MenuItem";
import { FolderPlus, Upload, FileUp , Folder, FileText , AlertCircle, Key} from "lucide-react";
import MenuDivider from "../../components/Common/MenuDivider/MenuDivider";
import { Button } from "../../components/Common/Button";
import buttonStyles from "../../components/Common/Button.module.css";
import {SortIcon} from "../../icons/SortIcon";
import FileItemDivider from "../../components/FileItem/FileItemDivider/FileItemDivider";
import FileItemList from "../../components/FileItem/FileItemList/FileItemList";
import React from "react";


interface Props{
  items: FileItemType[]
}

const MyFiles = ({items}:Props) => {

  const [files,setFiles] = useState<FileItemType[]>(items);

  const addFileIcon = <FolderPlus size={20}/>
  const uploadFileIcon = <Upload size={20}/>
  const FileUpIcon = <FileUp size={20}/>
  const alertIcon = <AlertCircle size={20}/>

  const file = files[0];

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
            <DropDownButton label="Mój dysk" menuVariant="operations">
                <MenuItem icon = {addFileIcon} label="Nowy Folder" gap={14} size={14} variant="operations"/>
                <MenuDivider/>
                <MenuItem icon = {uploadFileIcon} label= "Prześlij Plik" gap={14} size={14} variant="operations"/>
                <MenuItem icon = {FileUpIcon} label= "Prześlij Folder" gap={14} size={14} variant="operations"/> 
                <MenuDivider/>
                <MenuItem icon = {alertIcon} label= "..." gap={14} size={14} variant="operations" 
                style={{color:"lightgray", cursor:"not-allowed",pointerEvents:"none"}}/> 
            </DropDownButton>
            <h1 className={styles.label}>Opcje widoku</h1>
        </div>
        <div className={styles.filtersWrapper}>
          <DropDownButton label="Typ elementu" textSize={14} variant="filters" menuVariant="elements">
            <MenuItem icon = {<Folder size={20}/>} label="Foldery" size={14} gap={14}/>
            <MenuItem icon = {<FileText size={20} color="blue"/>} label="Dokumenty" size={14} gap={14}/>
          </DropDownButton>
          <DropDownButton label="Osoby" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
          <DropDownButton label="Zmodyfikowano" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
          <DropDownButton label="Źródło" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.mainContentTopbar}>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarName}`}>
              <span className={styles.label} style={{fontSize:14, fontWeight:500,color:"#383838ff"}}>Nazwa</span>
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarDate}`}>
              <span className={styles.label} style={{fontSize:14, fontWeight:500,color:"#636363ff"}}>Data modyfikacji</span>
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarOptions}`}>
              <Button className={buttonStyles.iconOnly}icon={<SortIcon/>}></Button>
            </div>
          </div>
          <FileItemDivider/>
          <div className={styles.fileList}>
            {items.map(item=>(
              <React.Fragment key={item.id}>
                <FileItemList file={item}/>
                <FileItemDivider/>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MyFiles;