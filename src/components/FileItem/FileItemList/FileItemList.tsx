import styles from "./FileItemList.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {FileText,Folder,EllipsisVertical, HelpCircle} from "lucide-react";
import type React from "react";
import { PdfIcon } from "..//..//../icons//PdfIcon";
import { DocumentIcon } from "..//..//../icons//DocumentIcon";
import { use, useState } from "react";
import { Button } from "../../Common/Button";
import buttonStyles from "..//..//Common//Button.module.css"
import DropDownButton from "../../DropDownButton/DropDownButton";
import {
  Download,
  Edit,
  Share2,
  Info,
  Trash,
} from "lucide-react";
import MenuItem from "../../Common/MenuItem/MenuItem";
import MenuDivider from "../../Common/MenuDivider/MenuDivider";




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


    const handleDownloadItem = () => {} //TODO!!!!
    const handleRename = () => {} //TODO!!!!
    const handleShare = () => {} //TODO!!!!
    const handleMoreInfo = () => {} //TODO!!!!
    const handleMoveToTrash = () => {} //TODO!!!!


    const optionsItems = [
        {icon: <Download/>, label: "Pobierz", action: handleDownloadItem},
        {icon: <Edit/>, label: "Zmień nazwę", action: handleRename},
        null,
        {icon: <Share2/>, label: "Udostępnij", action: handleShare},
        {icon: <Info/>, label: "Informacje", action: handleMoreInfo},
        null,
        {icon: <Trash/>, label: "Przenieś do kosza", action: handleMoveToTrash}
    ]
    
    return (
        <div className={`
            ${styles.fileItemListWrapper}
            ${isActive ? styles.active : ''}
        `} 
        onClick={onActivate}>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListName}`}>{icon} {file.name}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListDate}`}>{file.modifiedDate.toLocaleDateString()}</div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListOptions}`}>
                <DropDownButton icon={optionsIcon} menuVariant="operations" position="left">
                    {optionsItems.map(item=>(
                        item ?
                        <MenuItem icon = {item?.icon} label={item?.label} gap={14} size={14} variant="operations" onActivate={item?.action} />
                        :
                        <MenuDivider/>
                    ))}
                </DropDownButton>
            </div>
        </div>
    )
}

export default FileItemList;