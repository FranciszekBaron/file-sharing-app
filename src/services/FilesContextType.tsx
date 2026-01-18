import { act, createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FileItem } from "../types/FileItem";
import { filesService } from ".";
import { useNavigation } from "./NavigationContext";
import { useAuth } from "./AuthContext";
import type { UserGetDto } from "../types/UserGetDto";


type FilterType = 'folder' | 'doc' | 'pdf' | 'none';

interface FilesContextType{

    //Opisujemu State - Dane które będa sie zmieniać 
    allFiles: FileItem[];
    displayedFiles: FileItem[];
    deletedFiles:FileItem[];
    starredFiles:FileItem[];
    sharedFiles:FileItem[];
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
    getFileById:(id:string) => Promise<FileItem>;
    handleAdd: (name:string,type:FileItem['type'],parentId:string | null) =>Promise<FileItem>;
    handleSoftDelete: (id:string) => Promise<void>;
    handlePermanentDelete: (id:string) => Promise<void>;
    handleRestore: (id:string) => Promise<void>;
    handleUpdate: (id:string,updates: Partial<FileItem>) => Promise<void>;
    handleFilter: (filter: Exclude<FilterType,'none'>) => void;
    handleClearFilter: () => void;
    handleSort: (type:'name'|'date'|'deletedAt',ascending:boolean,foldersUp:boolean) => void;
    handleGetContent: (id:string) => Promise<Blob>;
    handleUpdateContent: (id:string,content:string) => Promise<void>;
    handleAddContent: (id:string,content:string) => Promise<void>;
    handleToggleStarred: (id:string) => Promise<void>;
    handleRename: (id:string,newName:string) => Promise<void>;
    handleShare: (id:string,userEmail:string[], permissionType:string) => Promise<void>;
    handleUploadFile: (file:File,paretnId:string | null) => Promise<void>;
    handleGetSharingUsers: () => Promise<UserGetDto[]>;
    handleGetUsersWithAccess: (id:string) => Promise<UserGetDto[]>;
    refreshFiles: () => Promise<void>;
}

const FilesContext = createContext<FilesContextType | undefined>(undefined);
//nie ma implements bo to funkcja 

//2.Provider recznie wypelnia calosc 
export const FilesProvider = ({children} : {children:React.ReactNode}) => {

    const [allFiles,setAllFiles] = useState<FileItem[]>([]); // zwraca dane 

    const { currentFolderId } = useNavigation();

    const { isLoading
        ,currentUser } = useAuth()
    
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
                if(a.modifiedDate && b.modifiedDate){
                    const diff = a.modifiedDate.getTime() - b.modifiedDate.getTime();
                    return ascending ? diff : -diff;
                }
                else{
                    return ascending ? 
                    a.name.localeCompare(b.name) : 
                    b.name.localeCompare(a.name);
                }
            }
        })
        
        

        if(foldersUp){
            const allFolders = sorted.filter(f=>f.type === 'folder');
            const allFilesNoFolders = sorted.filter(f=>f.type !== 'folder');
            return [...allFolders,...allFilesNoFolders];
        }

        return sorted;
    }

    //AUTOMATYCZNE PRZELICZANIE KIEDY KTORAS Z WARTOSCI W [] SIE ZMIENI
    //SWIETNA RZECZ 
    const displayedFiles = useMemo(()=>{
        let filtered = allFiles.filter(f=>!f.deleted && f.parentId === currentFolderId && f.ownerId === currentUser?.id);

        if(activeFilter!=='none'){
            filtered = filtered.filter(f=>f.type===activeFilter);
        }
    
        const sortType = sortBy === 'deletedAt' ? 'date' : sortBy;
        return sortFiles(filtered,sortType,sortAscending,sortWithFoldersUp)
    },[allFiles,sortBy,sortAscending,activeFilter,currentFolderId]);

    const deletedFiles = useMemo(() => {
        const filtered = allFiles.filter(f=>f.deleted && f.ownerId === currentUser?.id);

        console.log(filtered);
        return sortFiles(filtered,sortBy,sortAscending,false);
    },[allFiles,sortBy,sortAscending,currentFolderId]);
    
    const starredFiles = useMemo(()=>{
        const filtered = allFiles.filter(f=>!f.deleted && f.parentId === currentFolderId && f.starred);

        const sortType = sortBy === 'deletedAt' ? 'date' : sortBy;
        return sortFiles(filtered,sortType,sortAscending,sortWithFoldersUp);

    },[allFiles,sortBy,sortAscending,sortWithFoldersUp,currentFolderId])


    const sharedFiles = useMemo(()=>{
        const filtered = allFiles.filter(f=>!f.deleted && f.parentId === currentFolderId && f.ownerId !== currentUser?.id);
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
        return path;

    },[allFiles,currentFolderId])


    useEffect(() => {
        if (isLoading) return;  
        if (!currentUser) return; 
        loadFiles();
    }, [isLoading, currentUser]);


    const loadFiles = async () => {
        try{
            setLoading(true);
            const data = await filesService.getAll();
            console.log("data");
            console.log(data);
            setAllFiles(data);
        }catch(err){
            console.error('Error loading files',err)
        }finally{
            setLoading(false);
        }
    }

    const getFileById = async (id:string) => {
        try{
            const fileItem = await filesService.getById(id);
            if (!fileItem) {
                throw new Error(`File with id ${id} not found`);
            }
            return fileItem;
        }catch(err){
            console.error(`Error loading file:${id}: `, err)
            throw err;
        }
    }

    

    const handleAdd = async (name:string,type:FileItem['type'],parentId:string|null) => {
        try {

            if(type === 'folder'){
                const newFolder = await filesService.addFolder(name, parentId);
            
                // Optymistyczny update
                setAllFiles(prev => [...prev, newFolder]);
                return newFolder;
            }

            throw new Error('File upload not implemented yet');
        }catch(err){
            console.error('Error adding file: ',err);
            throw err;
        }
    }

    const handleToggleStarred = async (id:string) => {
        try {
            await filesService.toggleStarred(id);

            setAllFiles(prev => {
                
                const updatedFiles = prev.map(f=>f.id === id
                    ? {...f,starred:!f.starred} 
                    : f
                );

                return updatedFiles;
            });

        }catch(err){
            console.error('Error toggling starred on file: ',err);
            throw err;
        }
    }
    
    const handleShare = async (id:string,userEmail:string[], permissionType:string) => {
        try{
            await filesService.share(id,userEmail,permissionType);
        }catch(err){
            console.error('Error sharing file: ',err);
            throw err;
        }

    }

    const handleGetSharingUsers = async ()  => {
        const allSharedUsers = await filesService.getAllShared();
        return allSharedUsers; 
    }

    const handleSoftDelete = async (id:string) => {
        try{

            await filesService.delete(id);
            // Zapamietaj usuwany
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
            await filesService.restore(id);
            setAllFiles(prev=>{
                const updatedFiles = prev.map(f=>f.id === id
                    ?  {...f,deleted:undefined,deletedAt:undefined,modifiedDate:new Date()}
                    : f
                )
                return updatedFiles
            });
        }catch(err){
            console.error('Error restoring file: ', err);
            throw err;
        }
    }

    const handleRename = async (id:string,newName:string) => {
        try {
            const updatedFile = await filesService.rename(id,newName);
            setAllFiles(prev=>{
                const updatedFiles = prev.map(f=>f.id === id
                    ?  updatedFile
                    : f
                );
                return updatedFiles;
            });
        }catch(err){

        }
    }

    const handlePermanentDelete = async (id:string) => {
        try{
            await filesService.permanentDelete(id);
        
            //dla mocka, ale tez optymistyczny update
            setAllFiles(prev=>{
                const updatedFiles = prev.filter(f=>f.id !== id);
                return updatedFiles;
            })

        }catch(err){
            console.error('Error permanently deleting file: ', err);
            throw err;
        }
    }


    const handleGetContent = async  (id:string) => {
        try{    
            return await filesService.getFileContent(id);
        }catch(err){
            console.error('Error getting file contnet:', err);
            throw err;
        }
    }
    

    const handleUpdateContent = async (id:string,newContent: string) => {
        try{
            await filesService.updateFileContent(id,newContent);

            setAllFiles(prev=>{
                const updatedFiles = prev.map(f=>f.id === id 
                    ? {...f,dateModified: new Date()}
                    : f
                )
                return updatedFiles
            })
        }catch(err){
            console.error('Error updating file content:',err);
            throw err;
        }

    }

    const handleUploadFile = async (file:File,parentId:string|null) => {
        try{
            await filesService.upload(file,parentId);
        }catch(err){
            console.error('Error uploading file content: ', err);
            throw err;
        }
    }

    const handleAddContent = async (id:string,content:string) => {
        try{
            await filesService.addFileContent(id,content);
        }catch(err){
            console.error('Error uploading file content: ', err);
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

    const handleGetUsersWithAccess = async (id:string) => { 
        const usersWithAccess = await filesService.getUsersWithAcces(id);
        return usersWithAccess;
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
            sharedFiles,
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
            getFileById,
            handleAdd,
            handleSoftDelete,
            handleRestore,
            handlePermanentDelete,
            handleUpdate,
            handleFilter,
            handleClearFilter,
            handleSort,
            handleGetContent,
            handleGetSharingUsers,
            handleUpdateContent,
            handleAddContent,
            handleToggleStarred,
            handleRename,
            handleShare,
            handleUploadFile,
            handleGetUsersWithAccess,
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
