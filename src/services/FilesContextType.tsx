import { act, createContext, useContext, useEffect, useState } from "react";
import type { FileItem } from "../types/FileItem";
import { filesService } from ".";


type FilterType = 'folder' | 'doc' | 'pdf' | 'none';

interface FilesContextType{

    //Opisujemu State - Dane które będa sie zmieniać 
    allFiles: FileItem[];
    displayedFiles: FileItem[];
    deletedFiles:FileItem[];
    loading: boolean;
    activeFilter: FilterType;
    sortBy: 'name'|'date' | null;
    sortAscending: boolean;

    //Tutaj akcje czyli funkcje które będa zmieniać te state'y
    handleAdd: (name:string,type:FileItem['type']) =>Promise<void>;
    handleDelete: (id:string) => Promise<void>;
    handleUpdate: (id:string,updates: Partial<FileItem>) => Promise<void>;
    handleFilter: (filter: Exclude<FilterType,'none'>) => void;
    handleClearFilter: () => void;
    handleSort: (type:'name'|'date') => void;
    refreshFiles: () => Promise<void>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);
//nie ma implements bo to funkcja 

//2.Provider recznie wypelnia calosc 
export const FilesProvider = ({children} : {children:React.ReactNode}) => {

    const [allFiles,setAllFiles] = useState<FileItem[]>([]); // zwraca dane 
    const [displayedFiles,setDisplayedFiles] = useState<FileItem[]>([]);// zwraca dane 

    const [deletedFiles,setDeletedFiles] = useState<FileItem[]>([]);
    const [loading,setLoading] = useState(true);// zwraca dane 
    const [activeFilter,setActiveFilter] = useState<FilterType>('none');// zwraca dane 

    const [sortBy,setSortBy] = useState<'name' | 'date'>('name');
    const [sortAscending,setSortAscening] = useState(true);

    useEffect(()=>{
        loadFiles();
    },[])

    const loadFiles = async () => {
        try{
            setLoading(true);
            const data = await filesService.getAll();
            setAllFiles(data);
            setDisplayedFiles(data);

        }catch(err){
            console.error('Error loading files',err)
        }finally{
            setLoading(false);
        }
    }


    const handleAdd = async (name:string,type:FileItem['type']) => {
        try {
            const newFile = await filesService.add({
                name,
                type,
                modifiedDate: new Date()
            });
            //w tym miejscu juz utworzysz nowy plik w bazie lub w mocku, ale trzeba jeszcze zrobic tak zeby sie poprawnie wyswietlalo

            const updatedFiles = [...allFiles,newFile];
            setAllFiles(updatedFiles);

            if(activeFilter!=='none'){
                setDisplayedFiles(updatedFiles.filter(e=>e.type===activeFilter));
            } else {
                setDisplayedFiles(updatedFiles);
            }
        }catch(err){
            console.error('Error adding file: ',err);
            throw err;
        }
    }

    const handleDelete = async (id:string) => {
        try{
            if(await filesService.delete(id)){
                //Zapamietaj usuwany
                const deletedFile = allFiles.find(e => e.id === id);
      
                //Przenies do usunietych
                if (deletedFile) {  
                    setDeletedFiles([...deletedFiles, deletedFile]);
                }

                //Usun z bazy/mocka i zaktualizuj AllFiles
                const updatedFiles = allFiles.filter(e=>e.id !== id);
                setAllFiles(updatedFiles);
                
                //Jeśli wyświetlamy co innego niz AllFiles, to zaktualizuj widok
                if(activeFilter !=='none'){
                    setDisplayedFiles(updatedFiles.filter(e=>e.type===activeFilter))
                }else{
                    setDisplayedFiles(updatedFiles);
                }
            }
        }catch(err){
            console.error('Error adding file: ',err);
            throw err;
        }
    }

    const handleUpdate = async (id:string,updates: Partial<FileItem>) => {
        try{
            const updateFile = await filesService.update(id,updates);
            
            const updatedFiles = allFiles.map(e=>e.id===id ? updateFile : e)
            
            setAllFiles(updatedFiles)
            if(activeFilter !=='none'){
                setDisplayedFiles(updatedFiles.filter(e=>e.type===activeFilter));
            }else{
                setDisplayedFiles(updatedFiles);
            }
        }catch(err){
            console.log('Error updating file:',err)
        }
    }
    
    const handleSort = (type:'name' | 'date')  => {
        
        setSortBy(type);

        const sorted = [...displayedFiles].sort((a,b)=>{
            if(type==='name'){
                return !sortAscending 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
            }else {
                const diff = new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime()
                return !sortAscending
                ? diff
                : -diff;
            }
        })
        
        setSortAscening(!sortAscending);
        setDisplayedFiles(sorted);
    }

    const handleFilter = (filter: Exclude<FilterType,'none'>) => { 
        setActiveFilter(filter);
        setDisplayedFiles([...allFiles].filter(e=>e.type === filter))
    }
    
    const handleClearFilter = () => {
        setActiveFilter('none');
        setDisplayedFiles([...allFiles])
    }

    const refreshFiles = async () => { 
        await loadFiles();
    };

    return (
        <FilesContext.Provider value={{
            allFiles,
            displayedFiles,
            deletedFiles,
            loading,
            activeFilter,
            sortBy,
            sortAscending,
            handleAdd,
            handleDelete,
            handleUpdate,
            handleFilter,
            handleClearFilter,
            handleSort,
            refreshFiles
        }}>
        {children}
        </FilesContext.Provider>
    );
    
};

export const useFiles = () => {
    const context = useContext(FilesContext);
    if(!context) {
        throw new Error('useFiles must be used withing FIlesProvider');
    }
    return context; 
}
