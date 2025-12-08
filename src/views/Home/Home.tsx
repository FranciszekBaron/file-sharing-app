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


const MyFiles = () => {

  const  {
    allFiles,
    activeFilter,
    handleClearFilter,
    handleFilter
  } = useFiles()

  const [active,setToActive] = useState(false);

  const [isRecommendedFilesActive,SetRecommendedFilesActive] = useState(true);
  const [isRecommendedFoldersActive,SetRecommendedFoldersActive] = useState(true);



  useEffect(()=>{
    handleClearFilter();
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
                color="black" 
              />
            </div>
            <div className={styles.labelRecommended}>Sugerowane foldery</div>
        </div>
        <div className={`${styles.recommendedButtonMenu} ${isRecommendedFoldersActive ? styles.active : ''}`}>
            {isRecommendedFoldersActive && 
            <div>Otwarte foldery</div>
            }
        </div>
        <div className={styles.recommendedButton} onClick={()=>{SetRecommendedFilesActive(!isRecommendedFilesActive)}}>
            <div className={`${styles.icon} ${isRecommendedFilesActive ? styles.iconOpen : ""}`}>
              <ChevronDown 
                size={18} 
                color="black" 
              />
            </div>
            <div className={styles.labelRecommended}>Sugerowane pliki</div>
        </div>
        <div className={`${styles.recommendedButtonMenu} ${isRecommendedFilesActive ? styles.active : ''}`}>
            {isRecommendedFilesActive && 
            <div>Otwarte pliki</div>
            }
        </div>
      </div>
    </div>
  );
};

export default MyFiles;