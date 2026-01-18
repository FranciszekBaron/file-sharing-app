import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "../DropDownSearch/DropDownSearch.module.css"
import { ChevronDown, X } from "lucide-react";
import type { UserGetDto } from "../../types/UserGetDto";
import { Profile } from "../Common/Profile";


interface Props { 
  items: UserGetDto[],
  selectedItems: string[],
  onSelectionChange: (items: string[]) => void;
}

const DropDownButton = ({items,selectedItems,onSelectionChange}: Props) => {

  const ref = useRef<HTMLUListElement>(null);
      
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');


  const handleAddUser = (user:string) => {

    if (!user.trim()) return; // Ignoruj puste
    if (selectedItems.includes(user)) return; // Już dodany
    
    // ✅ Walidacja email - regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user)) {
        alert('Nieprawidłowy format email');
        return;
    }

    onSelectionChange([...selectedItems,user])
    setSearchTerm('');
  }

  const handleRemoveUser = (user:string) => {
    onSelectionChange(selectedItems.filter(u => u !== user));
  }
  

  const filteredUsers = items.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedItems.includes(user.email)  // ✅ nie pokazuj już wybranych
  );

  // ✅ Obsługa Enter i Spacji
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          e.preventDefault(); // Nie dodawaj spacji do inputu
          
          // Jeśli jest jakaś sugestia - dodaj pierwszą
          if (filteredUsers.length > 0) {
              handleAddUser(filteredUsers[0].email);
          } 
          // Jeśli nie ma sugestii - dodaj to co wpisano (custom email)
          else if (searchTerm.trim()) {
              handleAddUser(searchTerm.trim());
          }
      }
  }

  const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
  }

  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside);
    return () => document.removeEventListener("mousedown",handleClickOutside);
  },[]);

  return (
    <div className={styles.dropdownContainer}>
      {/* Wyświetlanie wybranych */}
      <div className={styles.selectedUsers}>
        {selectedItems.map(user => (
          <span key={user} className={styles.tag}>
            {user}
            <button onClick={() => handleRemoveUser(user)}>×</button>
          </span>
        ))}
      </div>

      {/* Input do wyszukiwania */}
        <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // ✅ Obsługa Enter/Spacja
            onFocus={() => setIsOpen(true)}
            placeholder="Dodaj osoby lub grupy użytkowników..."
            className={styles.modalInput}
        />

      {/* Dropdown lista */}
      {isOpen && (
        <ul className={styles.dropdown} ref={ref}>
          {filteredUsers.map(user => (
              <div className={styles.dropdownItem} key={user.email} onClick={() => handleAddUser(user.email)}>
                <div>
                  <Profile image={user.avatar}/>
                </div>
                <div className={styles.dropdownItemEmail}>
                  <div>{user.email}</div>
                  <div>{user.email}</div>
                </div>
              </div>
          ))}
        </ul>
      )}
    </div>
  );
    
}

export default DropDownButton;