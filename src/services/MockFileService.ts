
import { mockFiles, mockSharedFiles } from "../data/mockFiles";
import type { FileItem } from "../types/FileItem";
import type { IFileService } from "./IFileService";
import { MOCK_FILES_CONTENTS } from "../data/mockFiles";
import type { UserGetDto } from "../types/UserGetDto";


export class MockFilesService implements IFileService {
    getUsersWithAcces(id: string): Promise<UserGetDto[]> {
        throw new Error("Method not implemented.");
    }
    getAllShared(): Promise<UserGetDto[]> {
        throw new Error("Method not implemented.");
    }
    permanentDelete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getFileContent(id: string): Promise<Blob> {
        throw new Error("Method not implemented.");
    }
    upload(file: File, parentId: string | null): Promise<FileItem> {
        throw new Error("Method not implemented.");
    }
    share(id: string, userEmail: string[], permissionType: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    rename(id: string, newName: string): Promise<FileItem> {
        throw new Error("Method not implemented.");
    }
    toggleStarred(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addFolder(name: string, parentId: string | null): Promise<FileItem> {
        throw new Error("Method not implemented.");
    }
    
    restore(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    

    private files: FileItem[] = [...mockFiles,...mockSharedFiles]; //kopia nowej tablocy
    private filesContents = new Map([...MOCK_FILES_CONTENTS]);
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
    
    //symulacja działania z baza, w bazie dzwonimy do uplouds na serwerze
    
    

    async updateFileContent(id: string, newContent: string): Promise<void> {
       await this.delay();
       this.filesContents.set(id,newContent)
    }

    async addFileContent(id: string, content: string): Promise<void> {
        await this.delay();
        this.filesContents.set(id,content);
    }

    
}