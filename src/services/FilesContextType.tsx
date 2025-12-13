import { act, createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FileItem } from "../types/FileItem";
import { filesService } from ".";
import { useNavigation } from "./NavigationContext";




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
    breadcrumbPath: FileItem[];

    //Tutaj akcje czyli funkcje które będa zmieniać te state'y
    setSortBy: (sortBy:'name' | 'date' | 'deletedAt') => void;
    setSortAscending: (ascending:boolean) => void;
    setSortWithFoldersUp: (sorted:boolean) => void;
    setActiveLayout: (layout: 'list'|'grid') => void;
    handleAdd: (name:string,type:FileItem['type']) =>Promise<void>;
    handleSoftDelete: (id:string) => Promise<void>;
    handlePermanentDelete: (id:string) => Promise<void>;
    handleRestore: (id:string) => Promise<void>;
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

    const { currentFolderId } = useNavigation();
    
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
        let filtered = allFiles.filter(f=>!f.deleted && f.parentId === currentFolderId);

        if(activeFilter!=='none'){
            filtered = filtered.filter(f=>f.type===activeFilter);
        }

        const sortType = sortBy === 'deletedAt' ? 'date' : sortBy;
        return sortFiles(filtered,sortType,sortAscending,sortWithFoldersUp)
    },[allFiles,sortBy,sortAscending,activeFilter,currentFolderId]);

    const deletedFiles = useMemo(() => {
        const filtered = allFiles.filter(f=>f.deleted && f.parentId === currentFolderId);
        return sortFiles(filtered,sortBy,sortAscending,false);
    },[allFiles,sortBy,sortAscending,currentFolderId]);
    
    const starredFiles = useMemo(()=>{
        const filtered = allFiles.filter(f=>!f.deleted && f.parentId === currentFolderId && f.starred);

        const sortType = sortBy === 'deletedAt' ? 'date' : sortBy;
        return sortFiles(filtered,sortType,sortAscending,sortWithFoldersUp);

    },[allFiles,sortBy,sortAscending,sortWithFoldersUp,currentFolderId])

    const breadcrumbPath = useMemo(()=> {
        if(!currentFolderId) return [];

        const path: FileItem[] = [];

        let current = allFiles.find(f=>f.id === currentFolderId);

        while(current){
            path.unshift(current);
            current = allFiles.find(f=>f.id === current?.parentId);
        }
        

        console.log("ACTUAL PATH: " + JSON.stringify(path,null,2));
        return path;

    },[allFiles,currentFolderId])

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
                modifiedDate: new Date(),
                parentId: currentFolderId
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

    const handleRestore = async (id:string) => {
        try{
            await filesService.update(id,{deleted:undefined,deletedAt:undefined});

            setAllFiles(prev=>{
                const updatedFiles = prev.map(f=>f.id === id
                    ?  {...f,deleted:undefined,deletedAt:undefined}
                    : f
                )
                return updatedFiles
            });
        }catch(err){
            console.error('Error restoring file: ', err);
            throw err;
        }
    }

    const handlePermanentDelete = async (id:string) => {
        try{
            await filesService.delete(id);

            setAllFiles(prev=>{
                const updatedFiles = prev.filter(f=>f.id !== id);
                return updatedFiles;
            })

        }catch(err){
            console.error('Error permanently deleting file: ', err);
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
            breadcrumbPath,
            setSortBy,
            setSortAscending,
            setSortWithFoldersUp,
            setActiveLayout,
            handleAdd,
            handleSoftDelete,
            handleRestore,
            handlePermanentDelete,
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
