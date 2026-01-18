import styles from "./FileItemList.module.css";
import type { FileItem as FileItemType} from "../../../types/FileItem";
import {FileText,Folder,EllipsisVertical, HelpCircle, ChevronDown} from "lucide-react";
import React, { useEffect } from "react";
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
import { ThreeDotsIcon } from "../../../icons/ThreeDots";

import MenuItem from "../../Common/MenuItem/MenuItem";
import MenuDivider from "../../Common/MenuDivider/MenuDivider";
import { useFiles } from "../../../services/FilesContextType";
import Modal from "../../Modal/Modal";
import FileItem from "../FileItem";
import { useFileDownloader } from "../../../hooks/useFileDownloader";
import { useFileSelection } from "../../../hooks/useFileSelection";
import DropDownSearch from "../../DropDownSearch/DropDownSearch";
import type { UserGetDto } from "../../../types/UserGetDto";
import { Profile } from "../../Common/Profile";
import { useAuth } from "../../../services/AuthContext";
import { ModalShare } from "../../ShareModal/ShareModal";





interface Props {//troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
    file: FileItemType,
    isActive: boolean
    onActivate: (e: React.MouseEvent)=>void // przekazujemy funkcje 
    onDoubleClick?: (e:React.MouseEvent) => void

    owner?:boolean;
    dateModified?:boolean;
    deletedAt?: boolean;
    fileSize?: boolean;
}

export const FileItemList = ({file,isActive,onActivate,onDoubleClick,owner,dateModified,deletedAt,fileSize} : Props) => {
    const  {
        handleSoftDelete,
        handleUpdate,
        handleRestore,
        handlePermanentDelete,
        handleToggleStarred,
        handleRename,
        handleShare,
        handleGetSharingUsers,
        handleGetUsersWithAccess

        
    } = useFiles()

    const {
            currentUser,
    } = useAuth()

    const {
        selectedItems
    } = useFileSelection()

    const {
        downloadFile
    } = useFileDownloader(selectedItems)

    const optionsIcon = <ThreeDotsIcon size={20}/>
    const [addFileOpen,SetAddFileOpen] = useState(false);
    
    const [fileName,SetFileName] = useState("");
    const [isStared,SetStared] = useState(file.starred);
    
    
    const [shareFileOpen,SetShareFileOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [availableUsers, setAvailableUsers] = useState<UserGetDto[]>([]);

    const [usersWithAccess, setUsersWithAccess] = useState<UserGetDto[]>([]);

    const [accessType, setAccessType] = useState<'editor'| 'viewer'> ("viewer");
    const [accessTypeOpen, setAccessTypeOpen] = useState(false);

    useEffect(()=> {
        const loadUsers = async () => {
            const users = await handleGetSharingUsers();
            setAvailableUsers(users);
        }
        loadUsers();
    },[])


    useEffect(()=> {
        if (!shareFileOpen) {
            return;
        }
        
        const loadUsersWithAccess = async () => {
            try {
                const users = await handleGetUsersWithAccess(file.id);
                setUsersWithAccess(users);
            } catch (err) {
                console.error('Error loading users:', err);
            }
        }
        loadUsersWithAccess();
    },[shareFileOpen])
    






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


    const handleRenameClick = () => {
        SetAddFileOpen(true);
        SetFileName(file.name);
    } //TODO!!!!

    const handleShareClick = () => {
        setSelectedUsers([]);
        SetShareFileOpen(true);
    }


    
    
    
    
    useEffect(() => {
        console.log("Selected users changed:", selectedUsers);
    }, [selectedUsers]);
    
    
    
    
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
        {icon: <Download/>, label: "Pobierz",action:downloadFile},
        {icon: <Edit/>, label: "Zmień nazwę", action: handleRenameClick},
        null,
        {icon: <Share2/>, label: "Udostępnij", action: handleShareClick},
        {icon: <Info/>, label: "Informacje", action: handleMoreInfo},
        null,
        {icon: <Trash/>, label: "Przenieś do kosza", action: handleSoftDeleteItem}
    ]

    const optionsItemsDelete = [
        {icon: <RotateCw/>, label: "Przywróć", action: handleRestore},
        {icon: <Trash/>, label: "Usuń na zawsze", action: handlePermanentDelete}
    ]


    return (
        <div className={`
            ${styles.fileItemListWrapper}
            ${isActive ? styles.active : ''}
        `} 
        onClick={onActivate}
        onDoubleClick={onDoubleClick}>

            <ModalShare file={file} shareFileOpen={shareFileOpen} onShareFileClose={()=> SetShareFileOpen(false)}></ModalShare>

            {
            <Modal open={addFileOpen} onClose={()=>SetAddFileOpen(false)}>
                <label className={styles.modalLabel}>Zmień nazwę</label>
                <input value={fileName} className={styles.modalInput} onChange={(e)=> SetFileName(e.target.value)}></input>
                <div className={styles.modalButtons}>
                <button className={styles.modalButton} onClick={()=>SetAddFileOpen(false)}>Anuluj</button>
                <button className={styles.modalButton} onClick={()=>{handleRename(file.id,fileName);SetAddFileOpen(false)}}>
                    Ok
                </button>
                </div>
            </Modal>
            }

            <div className={`${styles.fileItemListColumn} ${styles.fileItemListName}`}>{icon} {file.name} {file.starred && <Star size={10} fill="black"/>}</div>
            {owner && <div className={`${styles.fileItemListColumn} ${styles.fileItemListOwner}`}>{file.ownerId}</div>}
            {deletedAt && file.deletedAt && <div className={`${styles.fileItemListColumn} ${styles.fileItemListDate}`}>{file.deletedAt.toLocaleDateString()}</div>}
            {dateModified && file.modifiedDate && <div className={`${styles.fileItemListColumn} ${styles.fileItemListDate}`}>{file.modifiedDate.toLocaleDateString()}</div>}
            {fileSize && <div className={`${styles.fileItemListColumn} ${styles.fileItemListSize}`}>{formatFilebytes(file.size ?? 0)}</div>}
            <div className={styles.fileItemListHoverActions}>
                <div className={styles.hoverIcon} data-tooltip='Udostępnij' onClick={()=>{handleShareClick()}}>
                    <Share2 size={14} strokeWidth={2.5}/>
                </div>
                <div className={styles.hoverIcon} data-tooltip='Pobierz' onClick={()=>{downloadFile(file.id)}}>
                    <Download size={14}strokeWidth={2.5}/>
                </div>
                <div className={styles.hoverIcon} data-tooltip='Zmień nazwę' onClick={()=>{handleRenameClick()}}>
                    <Edit size={14} strokeWidth={2.5}/>
                </div>
                <div className={styles.hoverIcon} data-tooltip={!file.starred ? 'Dodaj do oznaczonych gwiazdką' : 'Usuń do oznaczonych gwiazdką'} onClick={()=>{handleToggleStarred(file.id)}}>
                    <Star size={14}strokeWidth={2.5} fill={file.starred ? 'black' : 'none'}/>
                </div>
            </div>
            <div className={`${styles.fileItemListColumn} ${styles.fileItemListOptions}`}>
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

export default FileItemList;

function async() {
    throw new Error("Function not implemented.");
}
