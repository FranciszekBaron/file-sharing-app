
import type { FileItem } from "../types/FileItem";
import type { UserGetDto } from "../types/UserGetDto";
import type { IFileService } from "./IFileService";

import type { IAuthService } from "./IAuthService";

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
        
        
        const token = localStorage.getItem('accesToken');
        
        const headers = new Headers(options?.headers);

        if(token){
            headers.set('Authorization',`Bearer ${token}`);
        }

        const fetchOptions: RequestInit = {
            ...options,
            headers
        }
        
        
        
        const response = await fetch(url,fetchOptions);

        if(!response.ok){
            
            if (response.status === 401 ) {
                console.error('Unauthorized');
                
                
            }
            else
            {
                let errorMessage = `API Error: ${response.status} ${response.statusText}`;

                try {
                    const errorData = await response.json();
                    
                    if (errorData.error) {
                    errorMessage = errorData.error;
                    } else if (typeof errorData === 'string') {
                        errorMessage = errorData;
                    } else if (errorData.message) {
                        errorMessage = errorData.message;
                    } else if (errorData.title) {
                        errorMessage = errorData.title;
                    }
                } catch {
                    // Jeśli nie ma JSON, zostaw domyślny message
                }
                
                throw new Error(errorMessage);
            }

            
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
            console.error('Błąd podczas usuwania:', err);
            throw err;
        }
    }

    async getAllShared(): Promise<UserGetDto[]> {
        try
        {
            return await this.fetchWrapper<UserGetDto[]>(`${this.baseUrl}/allSharedUser`);
            //tutaj await teopretycznie jest juz w fetch wrapper, ale jesli damy je tutaj, to mamy mozliwosc przechwycenia bledu w catch
        }
        catch (err)
        {
            console.error('Błąd podczas pobierania uzytkownikow:', err);
            throw err;
        }
    }


    async getUsersWithAcces(id: string): Promise<UserGetDto[]> {
        try
        {
            return await this.fetchWrapper<UserGetDto[]>(`${this.baseUrl}/${id}/usersWithAccess`)

        }catch(err)
        {
            console.error('Błąd podczas pobierania uzytkowników z dostępem:', err);
            throw err;
        }
    }

    async addFolder(name: string, parentId: string |null): Promise<FileItem> {
        return this.fetchWrapper<FileItem>(`${this.baseUrl}/folder`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name,parentId})
        })
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
            });
            return true;
        } catch(err) {
            console.error('Błąd podczas usuwania:', err);
            return false;
        }
    }

    async permanentDelete(id: string): Promise<boolean> {
        try {
            await this.fetchWrapper(`${this.baseUrl}/${id}/permanent`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            });
            return true;
        } catch(err) {
            console.error('Błąd podczas usuwania:', err);
            return false;
        }
    }

    async restore(id:string): Promise<boolean> {
        try{
            await this.fetchWrapper(`${this.baseUrl}/${id}/restore`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'}
            });
            return true;
        }catch(err){
            console.error('Błąd podczas przywracania:', err);
            return false;
        }
    }

    async toggleStarred(id:string): Promise<boolean> {
        try {
            await this.fetchWrapper(`${this.baseUrl}/${id}/toggleStarred`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'}
            });
            return true;
        }catch(err){
            return false;
        }
    }

    async rename(id: string, newName: string): Promise<FileItem> {
        try {
            console.log("FROM REQUEST:" + newName);
            return await this.fetchWrapper(`${this.baseUrl}/${id}/rename`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: newName})
            });
            
        }catch(err){
            console.error('Błąd podczas zmiany nazwy:', err);
            throw err; 
        }
    }
    
    async share(id: string, userEmail: string[], permissionType: string): Promise<boolean> {
        try {
            
            await this.fetchWrapper(`${this.baseUrl}/${id}/share`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({emails: userEmail, permission: permissionType})
            });
            return true;
            
        }catch(err){
            console.error('Błąd podczas share:', err);
            if (err instanceof Error) {
                alert(err.message);  
            }
            throw err; 
        }
    }


    async upload(file:File,parentId:string|null) : Promise<FileItem>{

        const formData = new FormData();
        formData.append('file', file);
        
        if (parentId) {
            formData.append('parentId', parentId);
        }
        console.log("wysyłam form data: ....");
        console.log(formData);

        try {
            return await this.fetchWrapper(`${this.baseUrl}/uploadFile`, {
            method: 'POST',
            body: formData
        });
        }catch(err){
            console.error('Błąd podczas uploadu pliku', err);
            throw err; 
        }
    }

    async search(query:string): Promise<FileItem[]> {
        return this.fetchWrapper<FileItem[]>(
            `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
        );
    }

    async getFileContent(id: string): Promise<Blob> {
        const url = `${this.baseUrl}/${id}/downloadFile`
        const response = await fetch(url);

        if (!response.ok) {
            let errorMessage = `Download failed: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorMessage;
            } catch {}
            throw new Error(errorMessage);
        }

        return response.blob();
    }

}