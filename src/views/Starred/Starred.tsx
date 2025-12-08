import { useState } from "react";
import styles from "..//MyFiles//MyFiles.module.css"
import type { FileItem as FileItemType } from "../../types/FileItem";
import FileItem from "../../components/FileItem/FileItem";
import DropDownButton from "../../components/DropDownButton/DropDownButton";
import MenuItem from "../../components/Common/MenuItem/MenuItem";
import { FolderPlus, Upload, FileUp, Folder, FileText, AlertCircle, Key, TrendingUp } from "lucide-react";
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



const Starred = () => {

  const {
    displayedFiles,
    starredFiles,
    loading,
    activeFilter,
    sortBy,
    sortAscending,
    handleAdd,
    handleFilter,
    handleClearFilter,
    handleSort
  } = useFiles()

  const {
    selectedItems,
    handleClickItem,
    clearSelection,
    hasSelection
  } = useFileSelection();

  const [acitveIndexFileItems, SetActiveIndexFileItems] = useState<string | null>()
  const [activeIndexFiltersItems, SetActiveIndexFiltersItems] = useState<string | null>()
  const [addFileOpen, SetAddFileOpen] = useState(false);
  const [isNameFilterActive, SetNameFilterActive] = useState(true);
  const [isDateFilterActive, SetDateFilterActive] = useState(true);

  const [fileName, SetFileName] = useState("");

  const addFileIcon = <FolderPlus size={20} />
  const uploadFileIcon = <Upload size={20} />
  const FileUpIcon = <FileUp size={20} />
  const alertIcon = <AlertCircle size={20} />

  const handleUploadFile = () => { }; // TODO
  const handleUploadFolder = () => { }; // TODO

  const filterItems = [
    { id: 'folder', label: 'Foldery', icon: <Folder size={20} /> },
    { id: 'doc', label: 'Dokumenty', icon: <SquareDocumentIcon size={20} /> },
    { id: 'pdf', label: 'Pliki PDF', icon: <PdfIcon size={20} /> }
  ]

  if (loading) {
    return <div className={styles.contentWrapper}>Ładowanie...</div>;
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.topbarWrapper}>
        <div className={styles.titleButtonWrapper}>
          <h1 className={styles.label}>Oznaczone gwiazdką</h1>
          <h1 className={styles.label}>Opcje widoku</h1>
        </div>
        <div className={styles.filtersWrapper}>
          <DropDownButton label={activeFilter !== 'none' ? filterLabels[activeFilter] : "Typ elementu"} textSize={14} variant="filters" menuVariant="elements" selected={activeFilter !== 'none'} onClear={() => handleClearFilter()}>
            {filterItems.map((item) => (
              <React.Fragment key={item.id}>
                <MenuItem icon={item.icon} label={item.label} size={14} gap={14} clicked={activeFilter === item.id} onActivate={
                  () => {
                    handleClearFilter()
                    handleFilter(item.id as 'folder' | 'doc' | 'pdf')
                  }}>
                </MenuItem>
              </React.Fragment>
            ))}
          </DropDownButton>
          <DropDownButton label="Zmodyfikowano" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
          <DropDownButton label="Źródło" textSize={14} variant="filters" menuVariant="elements"></DropDownButton>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.mainContentTopbar}>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarName}`}
              data-tooltip={sortAscending ? 'Sortuj od Z do A' : 'Sortuj od A do Z'}
              onClick={() => {
                handleSort('name')
                SetNameFilterActive(true);
                SetDateFilterActive(false);
              }}>
              <span className={styles.label} style={isNameFilterActive ? { fontSize: 14, fontWeight: 500, color: "#393939ff" } : { fontSize: 14, fontWeight: 500, color: "#636363ff" }}>
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
              <span className={styles.label} style={{ fontSize: 14, fontWeight: 500, color: "#636363ff" }} onClick={() => { handleSort('date') }}>
                Właściciel
              </span>
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarDate}`}
              data-tooltip={sortAscending ? 'Sortuj od Z do A' : 'Sortuj od A do Z'}
              onClick={() => {
                handleSort('date')
                SetNameFilterActive(false);
                SetDateFilterActive(true);
              }}>
              <span className={styles.label} style={isDateFilterActive ? { fontSize: 14, fontWeight: 500, color: "#393939ff" } : { fontSize: 14, fontWeight: 500, color: "#636363ff" }}>
                Data modyfikacji
              </span>
              <div
                className={sortAscending ? styles.icon : styles.iconReversed}
                style={{ opacity: sortBy === 'date' ? 1 : 0 }}
              >
                <ArrowCircled size={24}></ArrowCircled>
              </div>
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarSize}`}>
              <span className={styles.label} style={{ fontSize: 14, fontWeight: 500, color: "#636363ff" }} onClick={() => { handleSort('date') }}>
                Rozmiar pliku
              </span>
            </div>
            <div className={`${styles.mainContentTopbarColumn} ${styles.mainContentTopbarOptions}`}>
              <button className={styles.button}>
                <SortIcon size={18} />
                <span className={styles.label}>Sortuj</span>
              </button>
            </div>
          </div>
          <FileItemDivider />
          <div className={styles.fileList}>
            {displayedFiles.map((item, index) => (
              <div key={index}>
                <FileItemList file={item} isActive={selectedItems.has(index.toString())}
                  onActivate={(e) => {
                    e.preventDefault();
                    handleClickItem(item.id, index.toString(), e)
                  }} />
                <FileItemDivider />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Starred;