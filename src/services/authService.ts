
import type { AuthResponse } from "../dto/AuthResponse";
import type { User } from "../types/User";
import type { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
    
    loginMock(email: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    private baseUrl = 'http://localhost:5239/api/Auth'; 


    private parseStringToDate(item:any) : AuthResponse {
            if (!item || typeof item !== 'object') {
                return item;  
            }
    
            return {...item,
                expiresAt:new Date(item.expiresAt)};
        }
    
    private async fetchWrapper<T>(url: string,options?: RequestInit) : Promise<T> {

        const token = localStorage.getItem('accesToken');

        const headers = new Headers(options?.headers);
        
        if(token){
            headers.set('Authorization', `Bearer ${token}`);
        }

        const fetchOptions: RequestInit = { 
            ...options,
            headers
        }
        
        const response = await fetch(url,fetchOptions);

        if(!response.ok){
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

        const data = await response.json()
        
        if (Array.isArray(data)) {
            return data.map(item => this.parseStringToDate(item)) as T;  // Array
        }

        return (this.parseStringToDate(data) as T);
    }

    async login(email: string, password: string): Promise<AuthResponse> {

        try
        {
            return await this.fetchWrapper<AuthResponse>(`${this.baseUrl}/login`,
                {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email:email,password:password})
                }
            );
        }
        catch (err)
        {
            console.error('Błąd podczas usuwania:', err);
            throw err;
        }
    }
    getCurrentUser(): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async logout(refreshToken:string): Promise<void> {
        try
        {
            await this.fetchWrapper<AuthResponse>(`${this.baseUrl}/logout`,
                {
                    method:'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(refreshToken)
                }
            );
        }
        catch (err)
        {
            console.error('Błąd podczas usuwania:', err);
            throw err;
        }
    }

    async refreshToken(): Promise<AuthResponse> {
        try
        {
            const refreshToken = localStorage.getItem('refreshToken');

            const authResponse = await this.fetchWrapper<AuthResponse>(
            `${this.baseUrl}/refreshToken?refreshToken=${refreshToken}`,
            {
                method: 'GET',
            }
            );

            localStorage.setItem('accessToken', authResponse.accessToken);
            return authResponse;
        }
        catch (err)
        {
            console.error('Błąd podczas usuwania:', err);
            throw err;
        }
    }
    
}


//TODO 