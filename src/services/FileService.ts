import type { FileItem } from "../types/FileItem";
import type { IFileService } from "./IFileService";

export class FileService implements IFileService {
    
    
    // FILE CONTENT TODO!!!!!
    addFileContent(id: string, content: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateFileContent(id: string, content: string): Promise<void> {
        throw new Error("Method not implemented.");
    }



    private baseUrl = 'http://localhost:5239/api/FileItem'; 

    private parseStringToDate(item:any) : FileItem {
        if (!item || typeof item !== 'object') {
            return item;  
        }

        return {...item,
            modifiedDate:new Date(item.modifiedDate),
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : undefined};
    }


    private async fetchWrapper<T>(url: string,options?: RequestInit) : Promise<T> {
        
        const response = await fetch(url,options);

        if(!response.ok){
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json()
        
        if (Array.isArray(data)) {
            return data.map(item => this.parseStringToDate(item)) as T;  // Array
        }

        return (this.parseStringToDate(data) as T);
    }

    async getAll(): Promise<FileItem[]> {
        return this.fetchWrapper<FileItem[]>(this.baseUrl);
    }
    async getById(id: string): Promise<FileItem | null> {
        try
        {
            return await this.fetchWrapper<FileItem>(`${this.baseUrl}/${id}`)
            //tutaj await teopretycznie jest juz w fetch wrapper, ale jesli damy je tutaj, to mamy mozliwosc przechwycenia bledu w catch
        }
        catch (err)
        {
            return null;
        }
    }
    
    async add(file: Omit<FileItem, "id">): Promise<FileItem> {
        return this.fetchWrapper<FileItem>(this.baseUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(file)
        })
    }

    async update(id: string, updates: Partial<FileItem>): Promise<FileItem> {
        return this.fetchWrapper<FileItem>(`${this.baseUrl}/${id}`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updates)
        })
    }

    

    async delete(id: string): Promise<boolean> {
    try {
        console.log(`Wołam endpoint DELETE z id ${id}`);
        await this.fetchWrapper(`${this.baseUrl}/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
            // Bez body!
        });
        return true;
    } catch(err) {
        console.error('Błąd podczas usuwania:', err);
        return false;
    }
}

    async search(query:string): Promise<FileItem[]> {
        return this.fetchWrapper<FileItem[]>(
            `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
        );
    }

    async getFileContent(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}