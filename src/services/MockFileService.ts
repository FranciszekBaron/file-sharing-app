
import { mockFiles } from "../data/mockFiles";
import type { FileItem } from "../types/FileItem";
import type { IFileService } from "./IFileService";


export class MockFilesService implements IFileService {

    private files: FileItem[] = [...mockFiles]; //kopia nowej tablocy
    private nextId: number = mockFiles.length+1;

    private delay(ms:number = 300): Promise<void> {
        return new Promise(resolve => setTimeout(resolve,ms));
    }
    //symulacja czekania na odpowiedz od API



    async getAll():  Promise<FileItem[]> {
        await this.delay;
        return [...this.files];
    }

    async getById(id: string): Promise<FileItem | null> {
        await this.delay;
        return this.files.find(e=>e.id==id) || null;
    }
    
    async add(file: Omit<FileItem, "id">): Promise<FileItem> {
        await this.delay;
        
        const newFile: FileItem = {
            ...file,
            id: (this.nextId).toString(),
            modifiedDate: new Date()
        };

        this.nextId++;
        this.files.push(newFile);

        return newFile;
    }

    
    async update(id: string, updates: Partial<FileItem>): Promise<FileItem> {
        
        await this.delay;
        
        const updateFileIndex =this.files.findIndex(e=>e.id==id);

        if(updateFileIndex ===-1){
            throw new Error(`File with id ${id} not found`);
        }

        this.files[updateFileIndex] = {
            ...this.files[updateFileIndex],
            ...updates,
            modifiedDate: new Date()
        };

        return this.files[updateFileIndex];
    }


    async delete(id: string): Promise<boolean> {
        
        await this.delay;

        const deleteFileIndex = this.files.findIndex(e=>e.id==id);

        if(deleteFileIndex===-1){
            return false;
        }

        this.files.splice(deleteFileIndex,1);
        return true;
    }
    
}