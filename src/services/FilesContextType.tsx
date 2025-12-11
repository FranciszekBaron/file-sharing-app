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
    activeLayout: 'list' | 'grid';
    sortBy: 'name'|'date' | 'deletedAt';
    sortAscending: boolean;
    sortWithFoldersUp: boolean;

    //Tutaj akcje czyli funkcje które będa zmieniać te state'y
    setSortBy: (sortBy:'name' | 'date' | 'deletedAt') => void;
    setSortAscending: (ascending:boolean) => void;
    setSortWithFoldersUp: (sorted:boolean) => void;
    setActiveLayout: (layout: 'list'|'grid') => void;
    handleAdd: (name:string,type:FileItem['type']) =>Promise<void>;
    handleSoftDelete: (id:string) => Promise<void>;
    handleUpdate: (id:string,updates: Partial<FileItem>) => Promise<void>;
    handleFilter: (filter: Exclude<FilterType,'none'>) => void;
    handleClearFilter: () => void;
    handleSort: (type:'name'|'date'|'deletedAt',ascending:boolean,foldersUp:boolean) => void;
    refreshFiles: () => Promise<void>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);
//nie ma implements bo to funkcja 

//2.Provider recznie wypelnia calosc 
export const FilesProvider = ({children} : {children:React.ReactNode}) => {

    const [allFiles,setAllFiles] = useState<FileItem[]>([]); // zwraca dane 


    
    const [loading,setLoading] = useState(true);// zwraca dane 
    const [activeFilter,setActiveFilter] = useState<FilterType>('none');// zwraca dane 
    const [activeLayout,setActiveLayout] = useState<'list'|'grid'>('list');
    
    const [sortBy,setSortBy] = useState<'name' | 'date' | 'deletedAt'>('name');
    const [sortAscending,setSortAscending] = useState(true);
    const [sortWithFoldersUp,setSortWithFoldersUp] = useState(true);

    const sortFiles = (files:FileItem[],type:'name'|'date' | 'deletedAt',ascending:boolean,foldersUp:boolean) => {

        const sorted = files.sort((a,b) => {
            if(type==='name'){
                return ascending ?
                a.name.localeCompare(b.name) : 
                b.name.localeCompare(a.name);
            }else if(type === 'deletedAt'){
                const deleted = files.filter(f=>f.deleted);
                if(a.deletedAt && b.deletedAt){
                    const diff = a.deletedAt.getTime() - b.deletedAt.getTime();
                    return ascending ? diff : -diff;
                }else{
                    alert('nie udało się posortować po datach usunięcia, posortowano po nazwach');
                    return ascending ?
                    a.name.localeCompare(b.name) : 
                    b.name.localeCompare(a.name);
                }   
            }else{
                const diff = a.modifiedDate.getTime() - b.modifiedDate.getTime();
                return ascending ? diff : -diff;
            }
        })
        
        console.log("sortWithFolderUp = " + sortWithFoldersUp + "[FROM FilesContext]")

        if(foldersUp){
            const allFolders = sorted.filter(f=>f.type === 'folder');
            const allFilesNoFolders = sorted.filter(f=>f.type !== 'folder');
            console.log("!!!! robie sie kurde !!!!")
            return [...allFolders,...allFilesNoFolders];
        }

        return sorted;
    }

    //AUTOMATYCZNE PRZELICZANIE KIEDY KTORAS Z WARTOSCI W [] SIE ZMIENI
    //SWIETNA RZECZ 
    const displayedFiles = useMemo(()=>{
        let filtered = allFiles.filter(f=>!f.deleted);

        if(activeFilter!=='none'){
            filtered = filtered.filter(f=>f.type===activeFilter);
        }

        const sortType = sortBy === 'deletedAt' ? 'date' : sortBy;
        return sortFiles(filtered,sortType,sortAscending,sortWithFoldersUp)
    },[allFiles,sortBy,sortAscending,activeFilter]);

    const deletedFiles = useMemo(() => {
        const filtered = allFiles.filter(f=>f.deleted);
        return sortFiles(filtered,sortBy,sortAscending,false);
    },[allFiles,sortBy,sortAscending]);
    
    const starredFiles = useMemo(()=>{
        const filtered = allFiles.filter(f=>f.starred && !f.deleted);

        const sortType = sortBy === 'deletedAt' ? 'date' : sortBy;
        return sortFiles(filtered,sortType,sortAscending,sortWithFoldersUp);

    },[allFiles,sortBy,sortAscending,sortWithFoldersUp])

    console.log("ascending: " + sortAscending);

    useEffect(()=>{
        loadFiles();
    },[])


    const loadFiles = async () => {
        try{
            setLoading(true);
            const data = await filesService.getAll();

            setAllFiles(data);
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
                const updatedFiles = prev.map(e=>e.id===id ? updateFile : e);
                return updatedFiles;
            });
        }catch(err){
            console.log('Error updating file:',err)
        }
    }

    const handleStarred = async (id:string, updates: Partial<FileItem>) => {

    }
    
    const handleSort = (type:'name' | 'date' | 'deletedAt',ascending:boolean,foldersUp:boolean)  => {
        setSortBy(type);
        setSortAscending(ascending);
        setSortWithFoldersUp(foldersUp);
    }

    const handleFilter = (filter: Exclude<FilterType,'none'>) => { 
        setActiveFilter(filter);
    }
    
    const handleClearFilter = () => {
        setActiveFilter('none');
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
            activeLayout,
            sortBy,
            sortAscending,
            sortWithFoldersUp,
            setSortBy,
            setSortAscending,
            setSortWithFoldersUp,
            setActiveLayout,
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
