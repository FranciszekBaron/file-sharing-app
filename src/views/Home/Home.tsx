import { useEffect, useState } from "react";
import styles from "..//Home//Home.module.css";
import { Searchbar } from "../../components/Searchbar/Searchbar";
import { useFiles } from "../../services/FilesContextType";
import DropDownButton from "../../components/DropDownButton/DropDownButton";
import { filterLabels } from "../../types/FilterType";
import { Folder , User, File, Calendar, ChevronDown} from "lucide-react";
import { SquareDocumentIcon } from "../../icons/SquareDocumentIcon";
import React from "react";
import MenuItem from "../../components/Common/MenuItem/MenuItem";
import { PdfIcon } from "../../icons/PdfIcon";

import  menuStyles  from "..//MyFiles//MyFiles.module.css";
import FileItemGrid from "../../components/FileItem/FileItemGrid/FileItemGrid";
import { useFileSelection } from "../../hooks/useFileSelection";
import { useNavigation, ViewType } from "..//..//services//NavigationContext";
import FileItemList from "../../components/FileItem/FileItemList/FileItemList";
import FileItemDivider from "../../components/FileItem/FileItemDivider/FileItemDivider";
import DoubleItemButton from "../../components/Common/DoubleItemButton/DoubleItemButton";


const MyFiles = () => {

  const  {
    allFiles,
    displayedFiles,
    activeFilter,
    activeLayout,
    setActiveLayout,
    handleClearFilter,
    handleFilter
  } = useFiles()


  const {
      selectedItems,
      handleClickItem,
      clearSelection,
      hasSelection
  } = useFileSelection();

  const { 
    navigateTo,
    setCurrentFolderId
  } = useNavigation()

  const [active,setToActive] = useState(false);

  const [isRecommendedFilesActive,SetRecommendedFilesActive] = useState(true);
  const [isRecommendedFoldersActive,SetRecommendedFoldersActive] = useState(true);


  useEffect(()=>{
      handleClearFilter();
      setCurrentFolderId(null);
  },[])

  const filterItems = [
    {id: 'folder', label: 'Foldery',icon: <Folder size={20}/>},
    {id: 'doc',label: 'Dokumenty',icon: <SquareDocumentIcon size={20}/>},
    {id: 'pdf',label: 'Pliki PDF',icon: <PdfIcon size={20}/>}
  ] 

  

  return (
    <div className={`${styles.contentWrapper} ${active ? styles.active : ''}`}>
      <div className={styles.contentTitleWrapper}>
        <label className={styles.label}></label>
      </div>
      <div className={styles.contentSearchbarWrapper}>
        <Searchbar items={allFiles}></Searchbar>
      </div>
      <div className={styles.contentFiltersWrapper}>
        <DropDownButton icon={<File size={18} />} label={activeFilter !=='none' ? filterLabels[activeFilter] : "Typ elementu"} textSize={14} variant="filters" menuVariant="elements" selected={activeFilter!=='none'} onClear={()=>handleClearFilter()}
          style={{
            borderRadius:50,
            backgroundColor:"#eaeef5",
            border: "none"
          }}
        >
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
          
          <DropDownButton icon={<User size={18} />} label="Osoby" textSize={14} variant="filters" menuVariant="elements" 
          style={{
            borderRadius:50,
            backgroundColor:"#eaeef5",
            border: "none"
          }}
          >
          </DropDownButton> 
          <DropDownButton icon={<Calendar size={18} />}  label="Zmodyfikowano" textSize={14} variant="filters" menuVariant="elements" 
          style={{
            borderRadius:50,
            backgroundColor:"#eaeef5",
            border: "none"
          }}
          >
          </DropDownButton>
          <DropDownButton icon={<Folder size={18} />} label="Lokalizacja" textSize={14} variant="filters" menuVariant="elements" 
          style={{
            borderRadius:50,
            backgroundColor:"#eaeef5",
            border: "none"
          }}
          >
          </DropDownButton>
      </div>

      <div className={styles.contentRecommendedWrapper}>
        
        <div className={styles.recommendedButton} onClick={()=>{SetRecommendedFoldersActive(!isRecommendedFoldersActive)}}>
            <div className={`${styles.icon} ${isRecommendedFoldersActive ? styles.iconOpen : ""}`}>
              <ChevronDown 
                size={18}  
              />
            </div>
            <div className={styles.labelRecommended}>Sugerowane foldery</div>
        </div>
        <div className={`${styles.recommendedButtonMenu} ${isRecommendedFoldersActive ? styles.active : ''}`}>
            {isRecommendedFoldersActive && 
            <div className={styles.fileGrid}>
                {displayedFiles.filter(f=>f.type === "folder")
                .sort((a, b) =>  new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime())
                .slice(0,4).map((item,index)=>(
                  <div key={index}>
                    <FileItemGrid file={item} isActive={selectedItems.has(`folder-${index}`)} 
                    onActivate={(e)=>{ 
                      e.preventDefault();
                      handleClickItem(item.id, `folder-${index}`, e)}}
                      onDoubleClick={()=>{
                      if(item.type==='folder'){
                        navigateTo(ViewType.GENERAL_SEARCH,item.id)
                      }else{
                        //open TODO 
                      }
                      }}
                      location={true}
                      style={{height:55}}/>
                  </div>
                ))}
            </div>
            }
        </div>
      </div>
      <div className={styles.contentRecommendedWrapper}>
        <div className={styles.contentRecommendedTopbarWrapper}>
          <div className={styles.recommendedButton} onClick={()=>{SetRecommendedFilesActive(!isRecommendedFilesActive)}}>
            <div className={`${styles.icon} ${isRecommendedFilesActive ? styles.iconOpen : ""}`}>
              <ChevronDown 
                size={18} 
              />
            </div>
          <div className={styles.labelRecommended}>Sugerowane pliki</div>
          </div>
        {isRecommendedFilesActive && 
          <div className={styles.viewButtonWrapper}>
                <DoubleItemButton size={32} activeLayout={activeLayout} onActivateLeft={()=>{setActiveLayout('list')}} onActivateRight={()=>{setActiveLayout('grid')}}></DoubleItemButton>
        </div>}
        </div>
        <div className={`${styles.recommendedButtonMenu} ${isRecommendedFilesActive ? styles.active : ''}`}>
        {isRecommendedFilesActive && (
          activeLayout === 'list' ? 
            <div className={menuStyles.mainContent}>
              <div className={menuStyles.mainContentTopbar}>
                <div className={`${menuStyles.mainContentTopbarColumn} ${menuStyles.mainContentTopbarName}`}
                  data-tooltip='Sortuj od Z do A'>
                  <span className={menuStyles.label} style={{fontSize: 14, fontWeight: 500, color: "#393939ff"}}>
                    Nazwa
                  </span>
                </div>
                <div className={`${menuStyles.mainContentTopbarColumn} ${menuStyles.mainContentTopbarSize}`}>
                  <span className={menuStyles.label} style={{fontSize:14, fontWeight:500, color:"#636363ff"}}>
                    Przyczyna zasugerowania
                  </span>           
                </div>
                <div className={`${menuStyles.mainContentTopbarColumn} ${menuStyles.mainContentTopbarOptions}`}>
                </div>
              </div>
              <FileItemDivider/>
              <div className={styles.fileList}>
                {displayedFiles.filter(f=>f.type !== "folder")
                  .sort((a, b) =>  new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime())
                  .slice(0,10).map((item,index)=>(
                    <div key={index}>
                      <FileItemList file={item} isActive={selectedItems.has(`file-${index}`)} 
                        onActivate={(e)=>{ 
                          e.preventDefault();
                          handleClickItem(item.id, `file-${index}`, e)}}
                        onDoubleClick={()=>{
                          if(item.type==='folder'){
                            navigateTo(ViewType.GENERAL_SEARCH,item.id)
                          }else{
                            //open TODO 
                          }
                        }}
                      />
                      <FileItemDivider/>
                    </div>
                  ))}
              </div>
            </div>
            :
            <div className={styles.fileGrid}>
              {displayedFiles.filter(f=>f.type !== "folder")
                .sort((a, b) =>  new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime())
                .slice(0,10).map((item,index)=>(
                  <div key={index}>
                    <FileItemGrid file={item} isActive={selectedItems.has(`file-${index}`)} 
                      onActivate={(e)=>{ 
                        e.preventDefault();
                        handleClickItem(item.id, `file-${index}`, e)}}
                      onDoubleClick={()=>{
                        if(item.type==='folder'){
                          navigateTo(ViewType.GENERAL_SEARCH,item.id)
                        }else{
                          //open TODO 
                        }
                      }}
                    />
                  </div>
                ))}
            </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyFiles;