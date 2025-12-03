import styles from "./FileItemList.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {FileText,Folder,EllipsisVertical} from "lucide-react";
import type React from "react";
import { PdfIcon } from "..//..//../icons//PdfIcon";
import { DocumentIcon } from "..//..//../icons//DocumentIcon";
import { use, useState } from "react";




interface Props {//troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
    file: FileItemType,
    isActive: boolean,
    onActivate: ()=>void // przekazujemy funkcje 
}

export const FileItemList = ({file,isActive,onActivate} : Props) => {


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
        <div className={`
            ${styles.fileItemListWrapper}
            ${isActive ? styles.active : ''}
        `} 
        onClick={onActivate}>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListName}`}>{icon} {file.name}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListDate}`}>{file.modifiedDate.toLocaleDateString()}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListOptions}`}>{optionsIcon}</div>
        </div>
    )
}

export default FileItemList;