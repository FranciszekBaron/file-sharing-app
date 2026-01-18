import type { FileItem } from "../types/FileItem";
import type { UserGetDto } from "../types/UserGetDto";

//Narazie bez wrapper bo yagni

export interface IFileService {
    
    getAll(): Promise<FileItem[]>;
    
    getById(id: string): Promise<FileItem | null>;// Promise to jak Task w C#

    add(file: Omit<FileItem,'id'>): Promise<FileItem>;

    addFolder(name:string,parentId:string|null): Promise<FileItem>;

    update(id:string,updates:Partial<FileItem>): Promise<FileItem>;

    delete(id: string) : Promise<boolean>;

    permanentDelete(id: string) : Promise<boolean>;

    restore(id: string) : Promise<boolean>;

    getFileContent(id:string) : Promise<Blob>;

    updateFileContent(id:string,content:string) : Promise<void>;

    addFileContent(id:string,content:string) : Promise<void>;

    toggleStarred(id:string) : Promise<boolean>;

    rename(id:string,newName:string) : Promise<FileItem>;

    share(id:string, userEmail: string[], permissionType: string) : Promise<boolean>;

    upload(file:File,parentId:string|null) : Promise<FileItem>

    getAllShared(): Promise<UserGetDto[]>

    getUsersWithAcces(id:string): Promise<UserGetDto[]>
    
}