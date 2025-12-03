import type { FileItem } from "../types/FileItem";

//Narazie bez wrapper bo yagni

export interface IFileService {
    
    getAll(): Promise<FileItem[]>;
    
    getById(id: string): Promise<FileItem | null>;// Promise to jak Task w C#

    add(file: Omit<FileItem,'id'>): Promise<FileItem>;

    update(id:string,updates:Partial<FileItem>): Promise<FileItem>;

    delete(id: string) : Promise<boolean>;
    
}