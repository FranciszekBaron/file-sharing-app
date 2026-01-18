import { useState, type CSSProperties } from "react";
import styles from "./Searchbar.module.css";
import { SearchIcon } from "../../icons/Search";
import { useFiles } from "../../services/FilesContextType";
import { useNavigation, ViewType } from "../../services/NavigationContext";
import { FileContentViewer } from "../FileContentViewer/FileContentViewer";
import type { FileItem } from "../../types/FileItem";
import type { User } from "../../types/User";
import { isFileItem, isUser, type SearchableItem } from "..//..//types//SearchableItem"
import { Folder } from "lucide-react";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { PdfIcon } from "../../icons/PdfIcon";

interface Props {
    items: SearchableItem[];  
    style?: CSSProperties;
    searchType?: 'files' | 'users' ;
    onUserSelect?: (user: User) => void; 
}

export const Searchbar = ({ items, style,searchType, onUserSelect }: Props) => {
    const { handleGetContent } = useFiles();
    const { navigateTo } = useNavigation();
    
    const [contentOpen, setContentOpen] = useState(false);
    const [fileContent, setFileContent] = useState("");
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const [isActive, setToActive] = useState(false);
    const [query, setQuery] = useState("");
    const [foundedItems, setFoundItems] = useState<SearchableItem[]>([]);
    
    const isSearching = query.length > 0;


    const handleIcon = (file: FileItem) =>{
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setQuery(value);
        
        if (value === "") {
            console.log("No longer searching");
            setFoundItems([]);
            return;
        }
        
        console.log("Searching...");
        
        const foundItems = items.filter(item => 
            item.name.toLowerCase().startsWith(value)
        );
        
        setFoundItems(foundItems);
        
        if (foundItems.length > 0) {
            foundItems.forEach(item => {
                console.log("Znaleziono:", item.name);
            });
        } else {
            console.log("Nie znaleziono");
        }
    };
    
    
    const handleItemDoubleClick = async (item: SearchableItem) => {
        if (isFileItem(item)) {
            
            if (item.type === 'folder') {
                navigateTo(ViewType.GENERAL_SEARCH, item.id);
            } else if (item.type === 'txt' || item.type === 'doc' || item.type === 'pdf') {
                const content = await handleGetContent(item.id);
                setContentOpen(true);
                setSelectedFileId(item.id);
                setFileContent(await content.text()); 
            }
        } else if (isUser(item)) {
            console.log("Wybrano użytkownika:", item.name, item.email);
            onUserSelect?.(item);  
        }
    };
    
    
    return (
        <div className={styles.searchbarWrapper}>
            <FileContentViewer 
                contentOpen={contentOpen}
                fileContent={fileContent}
                selectedFileId={selectedFileId}
                onActivate={() => setContentOpen(false)}
                onClose={() => setContentOpen(false)}
                onEditing={(e) => setFileContent(e.target.value)}
            />
            
            {/* Input */}
            <div 
                className={`
                    ${styles.searchbar} 
                    ${isSearching ? styles.searching : isActive ? styles.active : ''}
                    ${isSearching ? styles.searchbarExpanded : ''}
                `}
                style={{ ...style }}
            >
                <SearchIcon size={20} color="#5f6368" strokeWidth={2} />
                <input 
                    placeholder={searchType == 'users' ? 'Szukaj w plikach i folderach' : 'Dodaj osoby'}
                    className={styles.searchInput}
                    value={query}
                    onFocus={() => {
                        console.log('Focus!');
                        setToActive(true);
                    }}
                    onBlur={() => {
                        console.log('Blur!');
                        if (query.length === 0) {
                            setToActive(false);
                        }
                    }}
                    onChange={handleChange}
                />
            </div>
            
            {/* Menu wyników */}
            {isSearching && (
                <div className={styles.menu}>
                    <div className={styles.menuContent}>
                        {foundedItems.length === 0 ? (
                            <div className={styles.noResults}>
                                Nie znaleziono wyników
                            </div>
                        ) : (
                            foundedItems.map(item => (
                                <div 
                                    key={item.id} 
                                    className={styles.searchResult}
                                    onDoubleClick={() => handleItemDoubleClick(item)}
                                >
                                    <span className={styles.itemIcon}>
                                        {handleIcon(item as FileItem)}
                                    </span>
                                    <span className={styles.itemName}>
                                        {item.name}
                                    </span>
                                    {isUser(item) && (
                                        <span className={styles.itemEmail}>
                                            {item.email}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};