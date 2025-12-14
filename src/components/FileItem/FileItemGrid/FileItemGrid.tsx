import styles from "./FileItemGrid.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {FileText,Folder,EllipsisVertical, HelpCircle} from "lucide-react";
import React, { type CSSProperties } from "react";
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
  Star,
  RotateCw
} from "lucide-react";
import MenuItem from "../../Common/MenuItem/MenuItem";
import MenuDivider from "../../Common/MenuDivider/MenuDivider";
import { useFiles } from "../../../services/FilesContextType";
import Modal from "../../Modal/Modal";
import FileItem from "../FileItem";




interface Props {//troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
    file: FileItemType,
    isActive: boolean
    onActivate: (e: React.MouseEvent)=>void
    onDoubleClick: () => void// przekazujemy funkcje 
    location?: boolean
    style?: CSSProperties
}

export const FileItemGrid = ({file,isActive,location,style,onActivate,onDoubleClick} : Props) => {

    const  {
        handleSoftDelete,
        handleUpdate,
    } = useFiles()

    const optionsIcon = <EllipsisVertical size={14} strokeWidth={2.5}/>
    const [addFileOpen,SetAddFileOpen] = useState(false);
    const [fileName,SetFileName] = useState("");

    const handleIcon = (file: FileItemType) =>{
        switch (file.type){
            case "folder": 
                return <Folder size={22} fill="#333" stroke="#333"/>
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



    const handleRenameClick = () => {
        SetAddFileOpen(true);
        SetFileName(file.name);
    } //TODO!!!!
    
    const handleRename = async (id:string,newName:string) => {


        try {
            await handleUpdate(id,{name:newName})
            SetAddFileOpen(false);
            SetFileName("");
        }catch(err){

        }
    }
    
    
    const handleShare = () => {} //TODO!!!!
    
    
    const handleMoreInfo = () => {
        console.log("DZIAŁAM")
    } //TODO!!!!

    const handleSoftDeleteItem = async (id:string) => {

        console.log("Robie handle dlete item ")
        try{
            await handleSoftDelete(id);
        }catch(err){
        alert('nie udało się usunąć folderu')
        }
    }

    const formatFilebytes = (bytes:number) : string => {
        if(!bytes || bytes === 0){
            return "-";
        }

        const divisor = 1024;
        const formats = ['B','KB','MB','GB','TB'];
        const i = Math.floor(Math.log(bytes)/Math.log(divisor));
        
        return Math.round(bytes/Math.pow(divisor,i) * 10)/10 + '' + `${formats[i]}`;
    }


    const optionsItems = [
        {icon: <Download/>, label: "Pobierz", action: handleDownloadItem},
        {icon: <Edit/>, label: "Zmień nazwę", action: handleRenameClick},
        null,
        {icon: <Share2/>, label: "Udostępnij", action: handleShare},
        {icon: <Info/>, label: "Informacje", action: handleMoreInfo},
        null,
        {icon: <Trash/>, label: "Przenieś do kosza", action: handleSoftDeleteItem}
    ]

    const optionsItemsDelete = [
        {icon: <RotateCw/>, label: "Przywróć", action: handleSoftDeleteItem},
        {icon: <Trash/>, label: "Usuń na zawsze", action: handleSoftDeleteItem}
    ]



    
    return (
        <div className={`
            ${styles.fileItemGridWrapper}

            ${isActive ? styles.active : ''}
        `} 
        onClick={onActivate}
        onDoubleClick={onDoubleClick}
        style={{...style}}>
            {
            <Modal open={addFileOpen} onClose={()=>SetAddFileOpen(false)}>
                <label className={styles.modalLabel}>Zmień nazwę</label>
                <input value={fileName} className={styles.modalInput} onChange={(e)=> SetFileName(e.target.value)}></input>
                <div className={styles.modalButtons}>
                <button className={styles.modalButton} onClick={()=>SetAddFileOpen(false)}>Anuluj</button>
                <button className={styles.modalButton} onClick={()=>handleRename(file.id,fileName)}>
                    Ok
                </button>
                </div>
            </Modal>
            }

            <div className={`${styles.fileItemGridColumn} ${styles.fileItemGridName}`}>{icon} 
                <div className={styles.fileItemGridNameLabel}>
                {file.name} 
                {location && <span className={styles.fileItemGridNameLoc}>{file.owner === 'Ty' ? 'w: Mój Dysk' : 'w: Udostępnione'}
                </span>}
                </div>
            </div>
            {/* <div className={`${styles.fileItemGridColumn} ${styles.fileItemGridSize}`}>{formatFilebytes(file.size ?? 0)}</div> */}
            
            <div className={`${styles.fileItemGridColumn} ${styles.fileItemGridOptions}`}>
                {!file.deleted ? 
                <DropDownButton icon={optionsIcon} 
                style={{height:36,width:36,borderRadius:"50%",padding:0,alignItems:"center",justifyContent:"center"}}
                menuVariant="operations" position="left">
                    {optionsItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {item ? (
                        <MenuItem 
                            icon={item.icon} 
                            label={item.label} 
                            gap={14} 
                            size={14} 
                            variant="operations" 
                            onActivate={() => item.action(file.id)}
                        />
                        ) : (
                        <MenuDivider />
                        )}
                    </React.Fragment>
                    ))}
                </DropDownButton>
                :
                <DropDownButton icon={optionsIcon} 
                style={{height:36,width:36,borderRadius:"50%",padding:0,alignItems:"center",justifyContent:"center"}}
                menuVariant="operations" position="left">
                    {optionsItemsDelete.map((item, index) => (
                    <React.Fragment key={index}>
                        {item ? (
                        <MenuItem 
                            icon={item.icon} 
                            label={item.label} 
                            gap={14} 
                            size={14} 
                            variant="operations" 
                            onActivate={() => item.action(file.id)}
                        />
                        ) : (
                        <MenuDivider />
                        )}
                    </React.Fragment>
                    ))}
                </DropDownButton>
                }
            </div>
        </div>
    )
}

export default FileItemGrid;

function async() {
    throw new Error("Function not implemented.");
}
