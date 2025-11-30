import styles from "./FileItemList.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {FileText,Folder,EllipsisVertical} from "lucide-react";
import type React from "react";
import { PdfIcon } from "..//..//../icons//PdfIcon";
import { DocumentIcon } from "..//..//../icons//DocumentIcon";




interface Props {
    file: FileItemType //troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
}

export const FileItemList = ({file} : Props) => {


    const optionsIcon = <EllipsisVertical size={18} strokeWidth={1.5}/>


    const handleIcon = (file: FileItemType) =>{
        switch (file.type){
            case "folder": 
                return <Folder size={22} fill="#333"/>
            case "txt":
                return  <DocumentIcon size={22}/>
            case "pdf":
                return  <PdfIcon size={22}/>
            case "doc":
                return <DocumentIcon size={22}/>
        }
    }
    const icon = handleIcon(file);
    

    return (
        <div className={styles.fileItemListWrapper}>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListName}`}>{icon} {file.name}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListDate}`}>{file.modifiedDate.toLocaleDateString()}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListOptions}`}>{optionsIcon}</div>
        </div>
    )
}

export default FileItemList;