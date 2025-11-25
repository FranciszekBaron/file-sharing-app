import { useState } from "react";
import styles from "./Searchbar.module.css";
import { Search, X } from 'lucide-react';

export const Searchbar = () => {
  const [isActive, setToActive] = useState(false);


  // Debug - zobacz co zwraca styles.active
  console.log('styles.active:', styles.searchbarActive);
  console.log('Pełny className:', `${isActive ? styles.searchbarActive : styles.searchbar}`);
  
  return (
   <div className={`${styles.searchbar} ${isActive ? styles.active : ''}`}>
      <Search className={styles.searchIcon} size={20}/>
      <input 
        placeholder="Szukaj w plikach"
        className={styles.searchInput}
        onFocus={() => {
          console.log('Kliknięto w input!');  // ← DODAJ TO
          setToActive(true);
        }}
        onBlur={() => {
          console.log('Kliknięto poza input');  // ← DODAJ TO
          setToActive(false);
        }}
      />
    </div>
  );
};