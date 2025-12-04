import styles from "./FileItemList.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {FileText,Folder,EllipsisVertical, HelpCircle} from "lucide-react";
import React from "react";
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
import { useFiles } from "../../../services/FilesContextType";




interface Props {//troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
    file: FileItemType,
    isActive: boolean,
    onActivate: ()=>void // przekazujemy funkcje 
}

export const FileItemList = ({file,isActive,onActivate} : Props) => {

    const  {
        handleDelete
    } = useFiles()

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
    const handleMoreInfo = () => {
        console.log("DZIAŁAM")
    } //TODO!!!!

    const handleDeleteItem = async (id:string) => {

        console.log("Robie handledlete item ")
        try{
        await handleDelete(id);
        }catch(err){
        alert('nie udało się usunąć folderu')
        }
    }


    const optionsItems = [
        {icon: <Download/>, label: "Pobierz", action: handleDownloadItem},
        {icon: <Edit/>, label: "Zmień nazwę", action: handleRename},
        null,
        {icon: <Share2/>, label: "Udostępnij", action: handleShare},
        {icon: <Info/>, label: "Informacje", action: handleMoreInfo},
        null,
        {icon: <Trash/>, label: "Przenieś do kosza", action: handleDeleteItem}
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
                    {optionsItems.map((item, index) => (
                        <div key={index}>
                            {item ? (
                            <MenuItem 
                                icon={item.icon} 
                                label={item.label} 
                                gap={14} 
                                size={14} 
                                variant="operations" 
                                onActivate={()=>{item.action(file.id)}}  // ← bez (), przekaż funkcję
                            />
                            ) : (
                            <MenuDivider />
                            )}
                        </div>
                        ))}
                </DropDownButton>
            </div>
        </div>
    )
}

export default FileItemList;