import { useState } from "react";
import styles from "..//MyFiles/MyFiles.module.css"
import type { FileItem as FileItemType} from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";
import DropDownButton from "../../components/DropDownButton/DropDownButton";
import MenuItem from "../../components/Common/MenuItem/MenuItem";
import { FolderPlus, Upload, FileUp , Folder, FileText , AlertCircle, Key, TrendingUp} from "lucide-react";
import MenuDivider from "../../components/Common/MenuDivider/MenuDivider";
import { Button } from "../../components/Common/Button";
import buttonStyles from "../../components/Common/Button.module.css";
import {SortIcon} from "../../icons/SortIcon";
import FileItemDivider from "../../components/FileItem/FileItemDivider/FileItemDivider";
import FileItemList from "../../components/FileItem/FileItemList/FileItemList";
import React from "react";

import {SquareDocumentIcon} from "..//../icons//SquareDocumentIcon";
import {PdfIcon} from "..//../icons//PdfIcon";
import { ArrowCircled } from "..//..//icons//ArrowCircled";


import { filterLabels } from "../../types/FilterType";
import Modal from "../../components/Modal/Modal";
import { useFiles } from "../../services/FilesContextType";



const MyFiles = () => {

  const {
    displayedFiles,
    loading,
    activeFilter,
    handleAdd,
    handleFilter,
    handleClearFilter,
    handleSort
  } = useFiles()


  const [acitveIndexFileItems,SetActiveIndexFileItems] = useState<string| null>()
  const [activeIndexFiltersItems,SetActiveIndexFiltersItems] = useState<string | null>()
  const [addFileOpen,SetAddFileOpen] = useState(false);

  const [fileName,SetFileName] = useState("");

  const addFileIcon = <FolderPlus size={20}/>
  const uploadFileIcon = <Upload size={20}/>
  const FileUpIcon = <FileUp size={20}/>
  const alertIcon = <AlertCircle size={20}/>

  
  const [nameSortActive,setNameSortActive] = useState(true);
  const [dateSortActive,setDateSortActive] = useState(true);
  const [nameClicked,setNameClicked] = useState(true);
  const [dateClicked,setDateClicked] = useState(false);


  const handleUploadFile = () => {}; // TODO
  const handleUploadFolder = () => {}; // TODO

  const filterItems = [
    {id: 'folder', label: 'Foldery',icon: <Folder size={20}/>},
    {id: 'doc',label: 'Dokumenty',icon: <SquareDocumentIcon size={20}/>},
    {id: 'pdf',label: 'Pliki PDF',icon: <PdfIcon size={20}/>}
  ] 
  
  return (
    <div className={styles.contentWrapper}>
      {
      <Modal open={addFileOpen} onClose={()=>SetAddFileOpen(false)}>
        <label className={styles.modalLabel}>Nowy Folder</label>
        <input value={fileName} placeholder="Folder bez nazwy" className={styles.modalInput} onChange={(e)=> SetFileName(e.target.value)}></input>
        <div className={styles.modalButtons}>
          <button className={styles.modalButton} onClick={()=>SetAddFileOpen(false)}>Anuluj</button>
          <button className={styles.modalButton} onClick={()=>{
            handleAdd("",'folder')
            SetAddFileOpen(false)
            }}>
            Zapisz
          </button>
        </div>
      </Modal>
      }
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
            <DropDownButton label="Mój dysk" menuVariant="operations">
                <MenuItem icon = {addFileIcon} label="Nowy Folder" gap={14} size={14} variant="operations" onActivate={()=>{SetAddFileOpen(true)}} />
                <MenuDivider/>
                <MenuItem icon = {uploadFileIcon} label= "Prześlij Plik" gap={14} size={14} variant="operations" onActivate={handleUploadFile}/>
                <MenuItem icon = {FileUpIcon} label= "Prześlij Folder" gap={14} size={14} variant="operations" onActivate={handleUploadFolder}/> 
                <MenuDivider/>
                <MenuItem icon = {alertIcon} label= "..." gap={14} size={14} variant="operations" 
                style={{color:"lightgray", cursor:"not-allowed",pointerEvents:"none"}}/> 
            </DropDownButton>
            <h1 className={styles.label}>Opcje widoku</h1>
        </div>
        <div className={styles.filtersWrapper}>
            <DropDownButton label={activeFilter !=='none' ? filterLabels[activeFilter] : "Typ elementu"} textSize={14} variant="filters" menuVariant="elements" selected={activeFilter!=='none'} onClear={()=>handleClearFilter()}>
              {filterItems.map((item) => (
                <React.Fragment key={item.id}>
                  <MenuItem icon={item.icon} label={item.label} size={14} gap={14} clicked={activeFilter===item.id} onActivate={
                    ()=>{
                      handleClearFilter()
                      handleFilter(item.id as 'folder' | 'doc' | 'pdf')
                    }}>
                  </MenuItem>
                </React.Fragment>
              ))}
            </DropDownButton> 
          
          <DropDownButton label="Osoby" textSize={14} variant="filters" menuVariant="elements"></DropDownButton> 
          <DropDownButton label="Zmodyfikowano" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
          <DropDownButton label="Źródło" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.mainContentTopbar}>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarName}`} onClick={()=>{
              setNameClicked(true);
              setDateClicked(false);
              handleSort("name")}}>
              <span className={styles.label} style={{fontSize:14, fontWeight:500,color:"#383838ff"}}>
                Nazwa
              </span>
              {nameClicked && 
              <div className={nameSortActive ? styles.icon : styles.iconReversed}>
                <ArrowCircled size={24}></ArrowCircled>
              </div>
              }
              
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarDate}`}>
              <span className={styles.label} style={{fontSize:14, fontWeight:500,color:"#636363ff"}} onClick={()=>{
                setNameClicked(false);
                setDateClicked(true);
                handleSort("date");
              }}>
                Data modyfikacji
              </span>
              {dateClicked && 
              <div className={dateSortActive ? styles.icon : styles.iconReversed}>
                <ArrowCircled size={24}></ArrowCircled>
              </div>
              }           
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarOptions}`}>
              <Button className={buttonStyles.iconOnly}icon={<SortIcon/>}></Button>
            </div>
          </div>
          <FileItemDivider/>
          <div className={styles.fileList}>
            {displayedFiles.map(item=>(
              <div key={item.id}>
                <FileItemList file={item} isActive={acitveIndexFileItems === item.id} onActivate={()=>{SetActiveIndexFileItems(item.id)}}/>
                <FileItemDivider/>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MyFiles;