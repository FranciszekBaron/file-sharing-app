import { useState } from "react";
import styles from "..//MyFiles/MyFiles.module.css"
import { mockFiles } from "../../data/mockFiles";
import type { FileItem as FileItemType} from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";



const MyFiles = () => {

  const [files,setFiles] = useState<FileItemType[]>(mockFiles);


  const file = mockFiles[0];

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
            <h1 className={styles.title}>Moje pliki ▾</h1>
            <h1 className={styles.label}>Opcje widoku</h1>
        </div>
        <div className={styles.filtersWrapper}>
        <h1 className={styles.label}>Filters</h1>
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