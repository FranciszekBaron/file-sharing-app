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

interface Props{
  items: FileItemType[]
}

const MyFiles = ({items}:Props) => {

  const [files,SetFiles] = useState<FileItemType[]>([...items].sort((a,b)=>a.name.localeCompare(b.name)));
  const [acitveIndexFileItems,SetActiveIndexFileItems] = useState<string| null>()
  const [activeIndexFiltersItems,SetActiveIndexFiltersItems] = useState<string | null>()

  const addFileIcon = <FolderPlus size={20}/>
  const uploadFileIcon = <Upload size={20}/>
  const FileUpIcon = <FileUp size={20}/>
  const alertIcon = <AlertCircle size={20}/>

  
  const handleAdd = () => {} // TODO!!!!!
  const handleUploadFile = () => {} //TODO!!!!
  const handleUploadFolder = () => {} //TODO!!!!


  const [nameSortActive,setNameSortActive] = useState(true);
  const [dateSortActive,setDateSortActive] = useState(true);
  const [nameClicked,setNameClicked] = useState(true);
  const [dateClicked,setDateClicked] = useState(false);

  const handleSort= (type:'name'|'date') => {
    if(type === 'name'){
       setNameSortActive(!nameSortActive);
       SetFiles([...files].sort((a, b) => 
        !nameSortActive 
          ? a.name.localeCompare(b.name)   // A→Z
          : b.name.localeCompare(a.name)   // Z→A
      ));
    }else if(type==='date'){
       setDateSortActive(!dateSortActive);
       SetFiles([...files].sort((a, b) => {
          const diff = new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime();
          return !dateSortActive ? diff : -diff;
       }));
    }
  }
  
  type FilterType = 'folder' | 'doc' | 'pdf' | 'none';


  const [activeFilter,SetActiveFilter] = useState<FilterType>('none');

  const handleFilter = (filter:Exclude<FilterType,'none'>) => {
      SetActiveFilter(filter)
      SetFiles([...items].filter(e=>e.type==filter));
  }

  const handleClearFilter = () => {
    SetActiveFilter('none');
    SetFiles([...items].sort((a,b)=>a.name.localeCompare(b.name)));
  }

  const filterItems = [
    {id: 'folder', label: 'Foldery',icon: <Folder size={20}/>},
    {id: 'doc',label: 'Dokumenty',icon: <SquareDocumentIcon size={20}/>},
    {id: 'pdf',label: 'Pliki PDF',icon: <PdfIcon size={20}/>}
  ] 
  
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
            <DropDownButton label="Mój dysk" menuVariant="operations">
                <MenuItem icon = {addFileIcon} label="Nowy Folder" gap={14} size={14} variant="operations" onActivate={handleAdd} />
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
                      SetActiveFilter('none');
                      handleFilter(item.id as Exclude<FilterType,'none'>)
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
            {files.map(item=>(
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