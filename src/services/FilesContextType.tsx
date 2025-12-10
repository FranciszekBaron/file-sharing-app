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
    sortBy: 'name'|'date';
    sortAscending: boolean;
    sortWithFoldersUp: boolean;

    //Tutaj akcje czyli funkcje które będa zmieniać te state'y
    setSortBy: (sortBy:'name' | 'date') => void;
    setSortAscending: (ascending:boolean) => void;
    setSortWithFoldersUp: (sorted:boolean) => void;
    handleAdd: (name:string,type:FileItem['type']) =>Promise<void>;
    handleSoftDelete: (id:string) => Promise<void>;
    handleUpdate: (id:string,updates: Partial<FileItem>) => Promise<void>;
    handleFilter: (filter: Exclude<FilterType,'none'>) => void;
    handleClearFilter: () => void;
    handleSort: (type:'name'|'date',ascending:boolean,foldersUp:boolean) => void;
    refreshFiles: () => Promise<void>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);
//nie ma implements bo to funkcja 

//2.Provider recznie wypelnia calosc 
export const FilesProvider = ({children} : {children:React.ReactNode}) => {

    const [allFiles,setAllFiles] = useState<FileItem[]>([]); // zwraca dane 
    const [displayedFiles,setDisplayedFiles] = useState<FileItem[]>([]);// zwraca dane 

    const deletedFiles = useMemo(() => allFiles.filter(f=>f.deleted),[allFiles])
    const starredFiles = useMemo(()=>allFiles.filter(f=>!f.deleted && f.starred),[allFiles])

    const [loading,setLoading] = useState(true);// zwraca dane 
    const [activeFilter,setActiveFilter] = useState<FilterType>('none');// zwraca dane 

    const [sortBy,setSortBy] = useState<'name' | 'date'>('name');
    const [sortAscending,setSortAscending] = useState(true);
    const [sortWithFoldersUp,setSortWithFoldersUp] = useState(true);


    console.log("ascending: " + sortAscending);

    useEffect(()=>{
        loadFiles();
    },[])


    const loadFiles = async () => {
        try{
            setLoading(true);
            const data = await filesService.getAll();

            setAllFiles(data);

            const toDisplay = sortFiles(data.filter(f=>!f.deleted),sortBy,sortAscending,sortWithFoldersUp);
            
            toDisplay.forEach(element => {
                console.log(element.id + " " + element.name + " " + element.modifiedDate);
            });
            setDisplayedFiles(toDisplay)
        }catch(err){
            console.error('Error loading files',err)
        }finally{
            setLoading(false);
        }
    }


    const sortFiles = (files:FileItem[],type:'name'|'date' | 'deletetedAt',ascending:boolean,foldersUp:boolean) => {

        const sorted = files.filter(f=>!f.deleted).sort((a,b) => {
            if(type==='name'){
                return ascending ?
                a.name.localeCompare(b.name) : 
                b.name.localeCompare(a.name);
            }else if(type === 'deletetedAt'){
                if(a.deletedAt && b.deletedAt){
                    const diff = a.deletedAt.getTime() - b.deletedAt.getTime();
                    return ascending ? diff : -diff;
                }else{
                    alert('nie udało się posortować po datach usunięcia, posortowano po nazwach')
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
    
    const handleSort = (type:'name' | 'date',ascending:boolean,foldersUp:boolean)  => {
        
        setSortBy(type);
        setSortAscending(ascending);
        setSortWithFoldersUp(foldersUp);

        const sorted = sortFiles(displayedFiles.filter(f=>!f.deleted),type,ascending,foldersUp);
        setDisplayedFiles(sorted);
    }

    const handleFilter = (filter: Exclude<FilterType,'none'>) => { 
        setActiveFilter(filter);
        setDisplayedFiles([...allFiles.filter(f=>!f.deleted)].filter(e=>e.type === filter))
    }
    
    const handleClearFilter = () => {
        setActiveFilter('none');

        const filtered = allFiles.filter(f=>!f.deleted);
        const sorted = sortFiles(filtered,sortBy,sortAscending,sortWithFoldersUp);

        setDisplayedFiles(sorted);
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
            sortWithFoldersUp,
            setSortBy,
            setSortAscending,
            setSortWithFoldersUp,
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
