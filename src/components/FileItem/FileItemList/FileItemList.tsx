import styles from "./FileItemList.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {File,Folder,EllipsisVertical} from "lucide-react";


interface Props {
    file: FileItemType //troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
}

export const FileItemList = ({file} : Props) => {

    const fileIcon = <File/>
    const folderIcon = <Folder size={22} fill="#333"/>
    const optionsIcon = <EllipsisVertical size={18} strokeWidth={1.5}/>


    const handleIcon = () =>{

    }
    

    return (
        <div className={styles.fileItemListWrapper}>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListName}`}>{folderIcon} {file.name}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListDate}`}>{file.modifiedDate.toLocaleDateString()}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListOptions}`}>{optionsIcon}</div>
        </div>
    )
}

export default FileItemList;