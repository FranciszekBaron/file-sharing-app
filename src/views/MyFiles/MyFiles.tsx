import { useState } from "react";
import styles from "..//MyFiles/MyFiles.module.css"
import { mockFiles } from "../../data/mockFiles";
import type { FileItem as FileItemType} from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";
import DropDownButton from "../../components/DropDownButton/DropDownButton";
import MenuItem from "../../components/Common/MenuItem/MenuItem";
import { FolderPlus, Upload, FileUp , Folder, FileText , AlertCircle} from "lucide-react";
import MenuDivider from "../../components/Common/MenuDivider/MenuDivider";


const MyFiles = () => {

  const [files,setFiles] = useState<FileItemType[]>(mockFiles);

  const addFileIcon = <FolderPlus size={20}/>
  const uploadFileIcon = <Upload size={20}/>
  const FileUpIcon = <FileUp size={20}/>
  const alertIcon = <AlertCircle size={20}/>

  const file = mockFiles[0];

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
        <div className={styles.fileList}>
          <FileItem file={file}></FileItem>
        </div>
      </div>

    </div>
  );
};

export default MyFiles;