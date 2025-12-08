import { act, createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FileItem } from "../types/FileItem";
import { filesService } from ".";


type FilterType = 'folder' | 'doc' | 'pdf' | 'none';

interface FilesContextType{

    //Opisujemu State - Dane które będa sie zmieniać 
    allFiles: FileItem[];
    displayedFiles: FileItem[];
    deletedFiles:FileItem[];
    starredFiles:FileItem[];
    loading: boolean;
    activeFilter: FilterType;
    sortBy: 'name'|'date' | null;
    sortAscending: boolean;

    //Tutaj akcje czyli funkcje które będa zmieniać te state'y
    handleAdd: (name:string,type:FileItem['type']) =>Promise<void>;
    handleSoftDelete: (id:string) => Promise<void>;
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
    console.log("Robie re-render" + this);
    const [allFiles,setAllFiles] = useState<FileItem[]>([]); // zwraca dane 
    const [displayedFiles,setDisplayedFiles] = useState<FileItem[]>([]);// zwraca dane 

    const deletedFiles = useMemo(() => allFiles.filter(f=>f.deleted),[allFiles])
    const starredFiles = useMemo(()=>allFiles.filter(f=>!f.deleted && f.starred),[allFiles])

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
            const toDisplay = data.filter(f=>!f.deleted)
            setDisplayedFiles(toDisplay);
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
            
            setAllFiles(prev=> [...prev,newFile]);

            if(activeFilter!=='none'){
                setDisplayedFiles(prev=>[...prev,newFile].filter(e=>e.type===activeFilter));
            } else {
                setDisplayedFiles(prev => [...prev,newFile]);
            }
        }catch(err){
            console.error('Error adding file: ',err);
            throw err;
        }
    }

    const handleSoftDelete = async (id:string) => {
        try{

            await filesService.update(id,{deleted: true, deletedAt: new Date()})
            //Zapamietaj usuwany
            setAllFiles(prev=> {
            
            //Usun z bazy/mocka i zaktualizuj AllFiles
            const updatedFiles = prev.map(f=>f.id === id
                ? {...f,deleted:true,deletedAt: new Date()}
                : f
            );
            
            //Jeśli wyświetlamy co innego niz AllFiles, to zaktualizuj widok
            if(activeFilter !=='none'){
                setDisplayedFiles(updatedFiles.filter(f=>f.type===activeFilter && !f.deleted))
            }else{
                setDisplayedFiles(updatedFiles.filter(f=>!f.deleted));
            }
            return updatedFiles;
            }); 
        }catch(err){
            console.error('Error deleting file: ',err);
            throw err;
        }
    }

    const handleUpdate = async (id:string,updates: Partial<FileItem>) => {
        try{
            const updateFile = await filesService.update(id,updates);
            
            setAllFiles(prev => { 
                const updatedFiles = prev.map(e=>e.id===id ? updateFile : e)

                if(activeFilter !=='none'){
                    setDisplayedFiles(updatedFiles.filter(f=>f.type===activeFilter && !f.deleted));
                }else{
                    setDisplayedFiles(updatedFiles.filter(f=>!f.deleted));
                }
                return updatedFiles;
            });
        }catch(err){
            console.log('Error updating file:',err)
        }
    }

    const handleStarred = async (id:string, updates: Partial<FileItem>) => {

    }
    
    const handleSort = (type:'name' | 'date')  => {
        
        setSortBy(type);

        const sorted = [...displayedFiles.filter(f=>!f.deleted)].sort((a,b)=>{
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
        
        setSortAscening(prev => !prev);
        setDisplayedFiles(sorted);
    }

    const handleFilter = (filter: Exclude<FilterType,'none'>) => { 
        setActiveFilter(filter);
        setDisplayedFiles([...allFiles.filter(f=>!f.deleted)].filter(e=>e.type === filter))
    }
    
    const handleClearFilter = () => {
        setActiveFilter('none');
        setDisplayedFiles([...allFiles.filter(f=>!f.deleted)])
    }

    const refreshFiles = async () => { 
        await loadFiles();
    };

    return (
        <FilesContext.Provider value={{
            allFiles,
            displayedFiles,
            deletedFiles,
            starredFiles,
            loading,
            activeFilter,
            sortBy,
            sortAscending,
            handleAdd,
            handleSoftDelete,
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
