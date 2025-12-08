import { useState, type CSSProperties } from "react";
import styles from "./Searchbar.module.css";
import { Search } from 'lucide-react';
import type { FileItem } from "../../types/FileItem";

interface Props {
  items: FileItem[];
  style?: CSSProperties;
}

export const Searchbar = ({items,style}: Props) => {
  const [isActive, setToActive] = useState(false);
  const [query, SetQuery] = useState("");
  const isSearching = query.length > 0;
  const [foundedItems,SetFoundItems] = useState<FileItem[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    SetQuery(value);
    
    if(value === "") {
      console.log("No longer searching");
      return;
    }
    
    console.log("Searching..");
    const foundItems = items.filter(
      item => item.name.toLowerCase().startsWith(value)
    );

    SetFoundItems(foundItems);
    
    if (foundItems.length > 0) {
      foundItems.forEach(item => {
        console.log("Znaleziono", item.name);
      });
    } else {
      console.log("Nie znaleziono");
    }
  }

  return (
    <div className={styles.searchbarWrapper}>
      {/* Górna część - input */}
      <div className={`
        ${styles.searchbar} 
        ${isSearching ? styles.searching : isActive ? styles.active : ''}
        ${isSearching ? styles.searchbarExpanded : ''}
      `}
      style={{...style}}>
        <Search className={styles.searchIcon} size={20} strokeWidth={2}/>
        <input 
          placeholder="Szukaj w plikach"
          className={styles.searchInput}
          value={query}
          onFocus={() => {
            console.log('Focus!');
            setToActive(true);
          }}
          onBlur={() => {
            console.log('Blur!');
            if(query.length === 0) {
              setToActive(false);
            }
          }}
          onChange={handleChange}
        />
      </div>
      
      {/* Menu - rozwijane w dół */}
      {isSearching && (
        <div className={styles.menu}>
          <div className={styles.menuContent}>
            {foundedItems.map(item => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};