import { useEffect, useState } from "react";
import styles from "..//MyFiles//MyFiles.module.css"
import type { FileItem as FileItemType } from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";
import DropDownButton from "../../components/DropDownButton/DropDownButton";
import MenuItem from "../../components/Common/MenuItem/MenuItem";
import { FolderPlus, Upload, FileUp, Folder, FileText, AlertCircle, Key, TrendingUp, X, Download, Share2, Trash, ChevronRight } from "lucide-react";
import MenuDivider from "../../components/Common/MenuDivider/MenuDivider";
import { Button } from "../../components/Common/Button";
import buttonStyles from "../../components/Common/Button.module.css";
import { SortIcon } from "../../icons/SortIcon";
import FileItemDivider from "../../components/FileItem/FileItemDivider/FileItemDivider";
import FileItemList from "../../components/FileItem/FileItemList/FileItemList";
import React from "react";

import { SquareDocumentIcon } from "../../icons/SquareDocumentIcon";
import { PdfIcon } from "../../icons/PdfIcon";
import { ArrowCircled } from "../../icons/ArrowCircled";


import { filterLabels } from "../../types/FilterType";
import Modal from "../../components/Modal/Modal";
import { useFiles } from "../../services/FilesContextType";
import { useFileSelection } from "../../hooks/useFileSelection";
import MenuHeader from "../../components/Common/MenuHeader/MenuHeader";


import { sortByItems,sortFoldersItem,sortOrderItems } from "../../types/SortOptions";
import FileItemGrid from "../../components/FileItem/FileItemGrid/FileItemGrid";
import { filterItems } from "..//..//types//FilterOptions.ts";
import DoubleItemButton from "../../components/Common/DoubleItemButton/DoubleItemButton.tsx";
import { useNavigation } from "../../services/NavigationContext.tsx";
import { ViewType } from '..//..//services//NavigationContext.tsx';
import { FileContentViewer } from "../../components/FileContentViewer/FileContentViewer.tsx";



const Starred = () => {

  const {
    displayedFiles,
    starredFiles,
    loading,
    activeFilter,
    sortBy,
    sortAscending,
    sortWithFoldersUp,
    activeLayout,
    breadcrumbPath,
    setSortBy,
    setSortWithFoldersUp,
    setActiveLayout,
    handleAdd,
    handleFilter,
    handleClearFilter,
    handleSort,
    handleGetContent
  } = useFiles()

  const {
    selectedItems,
    handleClickItem,
    clearSelection,
    hasSelection
  } = useFileSelection();


  const  {
    setActiveView,
    setCurrentFolderId,
    navigateTo
  } = useNavigation()

  const [addFileOpen,SetAddFileOpen] = useState(false);
  const [isNameFilterActive, SetNameFilterActive] = useState(true);
  const [isDateFilterActive, SetDateFilterActive] = useState(true);
  const [contentOpen,setContentOpen] = useState(false);
  const [fileContent,setFileContent] = useState("");

  const [selectedFileId,setSelectedFileId] = useState("");

  useEffect(()=>{
      handleClearFilter();
      setCurrentFolderId(null);
  },[])

  const addFileIcon = <FolderPlus size={20}/>
  const uploadFileIcon = <Upload size={20}/>
  const FileUpIcon = <FileUp size={20}/>
  const alertIcon = <AlertCircle size={20}/>

  const filterIcons = {
    folder: <Folder size={20} />,
    doc: <SquareDocumentIcon size={20} /> ,
    pdf: <PdfIcon size={20}/>
  }
  const chevRightIcon = <ChevronRight size={16} />;

  if (loading) {
    return <div className={styles.contentWrapper}>Ładowanie...</div>;
  }

  const handleAddFolderClick = () => {
      SetAddFileOpen(true);
  }
  const handleUploadFile = () => {}; // TODO
  const handleUploadFolder = () => {}; // TODO

  return (
    <div className={styles.contentWrapper}>
      {
        <FileContentViewer contentOpen={contentOpen} fileContent={fileContent} selectedFileId={selectedFileId} onActivate={()=>setContentOpen(false)} onClose={()=>{setContentOpen(false)}} onEditing={(e)=>setFileContent(e.target.value)} ></FileContentViewer>
      }
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
          <div className={styles.breadcrumbWrapper}>
            {breadcrumbPath.length === 0 ?
            <div className={styles.titleOnly}>Oznaczone gwiazdką</div>
            :
            <div className={styles.breadcrumbWrapper}>
              <button className={styles.breadcrumbButton} onClick={()=>{setCurrentFolderId(null); setActiveView(ViewType.MY_FILES)}}>Mój Dysk</button>
              {chevRightIcon}
              {breadcrumbPath.slice(0,breadcrumbPath.length-1).map((item) => (
                <React.Fragment key={item.id}>
                    <button className={styles.breadcrumbButton} onClick={()=>{setCurrentFolderId(item.id)}}>{item.name}</button>
                    {chevRightIcon}
                </React.Fragment>
              ))}
              
              <DropDownButton label={breadcrumbPath[breadcrumbPath.length-1].name} menuVariant="operations" chevron={true}>
                <MenuItem icon = {addFileIcon} label="Nowy Folder" gap={14} size={14} variant="operations" onActivate={()=>{handleAddFolderClick()}} />
                <MenuDivider/>
                <MenuItem icon = {uploadFileIcon} label= "Prześlij Plik" gap={14} size={14} variant="operations" onActivate={()=>SetAddFileOpen(true)}/>
                <MenuItem icon = {FileUpIcon} label= "Prześlij Folder" gap={14} size={14} variant="operations" onActivate={handleUploadFolder}/> 
                <MenuDivider/>
                <MenuItem icon = {alertIcon} label= "..." gap={14} size={14} variant="operations" 
                style={{color:"lightgray", cursor:"not-allowed",pointerEvents:"none"}}/> 
            </DropDownButton>
            </div>
            }
          </div>
          <div className={styles.viewButtonWrapper}>
                <DoubleItemButton size={32} activeLayout={activeLayout} onActivateLeft={()=>{setActiveLayout('list')}} onActivateRight={()=>{setActiveLayout('grid')}}></DoubleItemButton>
          </div>
        </div>
        {hasSelection ? 
        <div className={styles.filtersWrapper}>
            <div className={styles.ItemSelected}>
                <div className={styles.hoverIcon} data-tooltip='Odznacz' onClick={()=>{clearSelection()}}>
                    <X size={20} strokeWidth={1.6}/>
                </div>
                <span className={styles.ItemSelectedLabel}>wybrano {selectedItems.size}</span>
                <div className={styles.hoverIcon} data-tooltip='Udostępnij'>
                    <Share2 size={14} strokeWidth={2}/>
                </div>
                <div className={styles.hoverIcon} data-tooltip='Pobierz'>
                    <Download size={14}strokeWidth={2}/>
                </div>
                <div className={styles.hoverIcon} data-tooltip='Zmień nazwę' onClick={()=>{}}>
                    <Trash size={14} strokeWidth={2}/>
                </div>
            
            </div>
        </div>
        :
        <div className={styles.filtersWrapper}>
            <DropDownButton label={activeFilter !=='none' ? filterLabels[activeFilter] : "Typ elementu"} textSize={14} variant="filters" menuVariant="elements" chevron={true} selected={activeFilter!=='none'} onClear={()=>handleClearFilter()}>
              {filterItems.map((item) => (
                <React.Fragment key={item.id}>
                  <MenuItem icon={filterIcons[item.id]} label={item.label} size={14} gap={14} clicked={activeFilter===item.id} onActivate={
                    ()=>{
                      handleClearFilter()
                      handleFilter(item.id as 'folder' | 'doc' | 'pdf')
                    }}>
                  </MenuItem>
                </React.Fragment>
              ))}
            </DropDownButton> 
          
          <DropDownButton label="Osoby" textSize={14} variant="filters" menuVariant="elements" chevron={true}></DropDownButton> 
          <DropDownButton label="Zmodyfikowano" textSize={14} variant="filters" menuVariant="elements" chevron={true}></DropDownButton>
          <DropDownButton label="Źródło" textSize={14} variant="filters" menuVariant="elements" chevron={true}></DropDownButton>
        </div>
        }
      </div>

      {activeLayout === 'list' ? 
      //===================LIST VIEW========================
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.mainContentTopbar}>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarName}`}
            data-tooltip= {sortAscending ? 'Sortuj od Z do A' : 'Sortuj od A do Z'}
             onClick={()=>{handleSort('name',!sortAscending,sortWithFoldersUp)
              SetNameFilterActive(true);
              SetDateFilterActive(false);
             }}>
              <span className={styles.label} style={isNameFilterActive ? {fontSize: 14, fontWeight: 500, color: "#393939ff"} : {fontSize: 14, fontWeight: 500, color: "#636363ff"}}>
                Nazwa
              </span>
              
              <div 
                className={sortAscending ? styles.icon : styles.iconReversed}
                style={{ opacity: sortBy === 'name' ? 1 : 0 }} 
              >
                <ArrowCircled size={24}></ArrowCircled>
              </div>
            </div>

            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarOwner}`}>
              <span className={styles.label} style={{fontSize:14, fontWeight:500,color:"#636363ff"}} onClick={()=>{handleSort('date',!sortAscending,sortWithFoldersUp)}}>
                Właściciel
              </span>           
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarDate}`}
            data-tooltip= {sortAscending ? 'Sortuj od Z do A' : 'Sortuj od A do Z'}
            onClick={()=>{handleSort('date',!sortAscending,sortWithFoldersUp)
              SetNameFilterActive(false);
              SetDateFilterActive(true);
            }}>
              <span className={styles.label} style={isDateFilterActive ? {fontSize: 14, fontWeight: 500, color: "#393939ff"} : {fontSize: 14, fontWeight: 500, color: "#636363ff"}}>
                Data modyfikacji
              </span>
              <div 
                className={sortAscending ? styles.icon : styles.iconReversed}
                style={{ opacity: sortBy === 'date' ? 1 : 0   }} 
              >
                <ArrowCircled size={24}></ArrowCircled>
              </div>          
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarSize}`}>
              <span className={styles.label} style={{fontSize:14, fontWeight:500,color:"#636363ff"}} onClick={()=>{handleSort('date',!sortAscending,sortWithFoldersUp)}}>
                Rozmiar pliku
              </span>           
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarOptions}`}>
            
            
            {/* ==== PRZYCISK OPCJI SORTOWANIA ==== */}
            <DropDownButton 
              label={
                <div>
                  <SortIcon size={18}/>
                  <span className={styles.label}>Sortuj</span>
                </div>
              } 
              textSize={14} 
              menuVariant="sortOptions" 
              style={{fontWeight:400}}
              position="leftOpt"
              >
              <MenuHeader>Sortuj według</MenuHeader>
                {sortByItems.map((item,index)=>(
                  <React.Fragment key={index}>
                      <MenuItem gap={14} size={14} variant="sortOptions" clicked={sortBy === item.id} onActivate={()=>{
                        {
                          if(item.id === sortBy){
                            handleSort(item.id as 'name' | 'date',!sortAscending,sortWithFoldersUp)
                          }else {
                            handleSort(item.id as 'name' | 'date',true,sortWithFoldersUp) //Wracamy do default state
                          }
                        }}}>
                      <span style={{whiteSpace:"nowrap"}}>
                        {item.label}
                      </span>
                      </MenuItem>
                  </React.Fragment>
                ))}
              <MenuDivider/>
              <MenuHeader>Kolejność sortowania</MenuHeader>
                {sortOrderItems.map((item,index)=>(
                  <React.Fragment key={index}>
                      <MenuItem gap={14} size={14} variant="sortOptions" clicked={sortAscending === item.id} onActivate={()=>{
                        handleSort(sortBy as 'date' | 'name',!sortAscending,sortWithFoldersUp)
                      }}>
                        <span style={{whiteSpace:"nowrap"}}>{item.label}
                        </span>
                      </MenuItem>
                  </React.Fragment>
                ))}
              <MenuDivider/>
              <MenuHeader>Foldery</MenuHeader>
                {sortFoldersItem.map((item,index)=>(
                  <React.Fragment key={index}>
                      <MenuItem gap={14} size={14} variant="sortOptions" clicked={sortWithFoldersUp === item.id} onActivate={()=>{
                          handleSort(sortBy,sortAscending,!sortWithFoldersUp);
                        }}
                        >
                        <span style={{whiteSpace:"nowrap"}}>{item.label}
                        </span>
                      </MenuItem>
                  </React.Fragment>
                ))}
            </DropDownButton>
            </div>
          </div>
          <FileItemDivider/>
          <div className={styles.fileList}>
            {starredFiles.map((item,index)=>(
              <div key={index}>
                <FileItemList file={item} isActive={selectedItems.has(index.toString())} 
                onActivate={(e)=>{ 
                  e.preventDefault();
                  handleClickItem(item.id,index.toString(), e)}}
                onDoubleClick={async ()=>{
                  if(item.type==='folder'){
                    navigateTo(ViewType.GENERAL_SEARCH,item.id)
                  }else{
                    if(item.type==='txt' || item.type==='doc' || item.type==='pdf'){
                        const content = await handleGetContent(item.id);
                        setContentOpen(true);
                        setFileContent(content);
                        setSelectedFileId(item.id);
                    }
                  }
                }}
                owner={true}
                dateModified={true}
                fileSize={true}/>
                <FileItemDivider/>
              </div>
            ))}
          </div>
        </div>
      </div>

      :

      //======================GRID VIEW========================
      <div>
          <div className={styles.gridContentTopbar}>
            <DropDownButton 
              label={
                <div className={styles.gridCategoryButton}>
                  <span 
                    className={styles.label} 
                    style={isNameFilterActive ? {fontSize: 14, fontWeight: 500, color: "#393939ff"} : {fontSize: 14, fontWeight: 500, color: "#636363ff"}}
                  >
                    {sortBy === 'name' ? 'Nazwa' : 'Data modyfikacji'}  {/* ← DODAJ TO - dynamiczny tekst */}
                  </span>
                  <div 
                    className={sortAscending ? styles.icon : styles.iconReversed}
                  >
                    <ArrowCircled size={24} />
                  </div> 
                </div>
              } 
              textSize={14} 
              menuVariant="sortOptions" 
              style={{fontWeight:400}}
            
            >
              <MenuHeader>Sortuj według</MenuHeader>
              {sortByItems.map((item,index)=>(
                <React.Fragment key={index}>
                    <MenuItem gap={14} size={14} variant="sortOptions" clicked={sortBy === item.id} onActivate={()=>{
              {
              
              handleSort(item.id as 'name' | 'date',!sortAscending,sortWithFoldersUp)
              SetNameFilterActive(true);
              SetDateFilterActive(false);
             }}}>
                      <span style={{padding:20,whiteSpace:"nowrap"}}>{item.label}
                      </span>
                    </MenuItem>
                </React.Fragment>
              ))}
              <MenuDivider/>
              <MenuHeader>Kolejność sortowania</MenuHeader>
              {sortOrderItems.map((item,index)=>(
                <React.Fragment key={index}>
                    <MenuItem gap={14} size={14} variant="sortOptions" clicked={sortAscending === item.id} onActivate={()=>{
                      handleSort(sortBy as 'date' | 'name',!sortAscending,sortWithFoldersUp)
                    }}>
                      <span style={{padding:20,whiteSpace:"nowrap"}}>{item.label}
                      </span>
                    </MenuItem>
                </React.Fragment>
              ))}
              <MenuDivider/>
              <MenuHeader>Foldery</MenuHeader>
              {sortFoldersItem.map((item,index)=>(
                <React.Fragment key={index}>
                    <MenuItem gap={14} size={14} variant="sortOptions" clicked={sortWithFoldersUp === item.id} onActivate={()=>{
                        handleSort(sortBy,sortAscending,!sortWithFoldersUp)
                      }}
                      >
                      <span style={{padding:20,whiteSpace:"nowrap"}}>{item.label}
                      </span>
                    </MenuItem>
                </React.Fragment>
              ))}
              
            </DropDownButton>
          </div>
          <div className={styles.fileGrid}>
                {starredFiles.map((item,index)=>(
                  <div key={index}>
                    <FileItemGrid file={item} isActive={selectedItems.has(index.toString())} 
                    onActivate={(e)=>{ 
                      e.preventDefault();
                      handleClickItem(item.id,index.toString(), e)}}
                      onDoubleClick={async ()=>{
                      if(item.type==='folder'){
                        navigateTo(ViewType.GENERAL_SEARCH,item.id)
                      }else{
                        if(item.type==='txt' || item.type==='doc' || item.type==='pdf'){
                          const content = await handleGetContent(item.id);
                          setContentOpen(true);
                          setFileContent(content);
                          setCurrentFolderId(item.id);
                        }
                      }
                      }}
                      />
                  </div>
                ))}
              </div>
        </div>
      }

    </div>
  );
};

export default Starred;

function setCurrentFolderId(arg0: null) {
  throw new Error("Function not implemented.");
}
