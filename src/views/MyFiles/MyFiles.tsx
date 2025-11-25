import { useState } from "react";
import styles from "..//MyFiles/MyFiles.module.css"
import { mockFiles } from "../../data/mockFiles";
import type { FileItem as FileItemType} from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";
import DropDownButton from "../../components/DropDownButton/DropDownButton";



const MyFiles = () => {

  const [files,setFiles] = useState<FileItemType[]>(mockFiles);


  const file = mockFiles[0];

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
            <DropDownButton label="Mój dysk"></DropDownButton>
            <h1 className={styles.label}>Opcje widoku</h1>
        </div>
        <div className={styles.filtersWrapper}>
          <DropDownButton label="Typ elementu" textSize={14} variant="filters"></DropDownButton>
          <DropDownButton label="Osoby" textSize={14} variant="filters"></DropDownButton>
          <DropDownButton label="Zmodyfikowano" textSize={14} variant="filters"></DropDownButton>
          <DropDownButton label="Źródło" textSize={14} variant="filters"></DropDownButton>
          
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