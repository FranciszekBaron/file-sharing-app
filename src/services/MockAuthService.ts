import type { User } from "../types/User";
import type { IAuthService } from "./IAuthService";
import { MOCK_USERS } from "..//data//mockUsers"



export class MockAuthService implements IAuthService {

    private users: User[] = [...MOCK_USERS];
    private currentUser: User | null = null;
    

    private delay(ms:number = 300): Promise<void> {
        return new Promise(resolve => setTimeout(resolve,ms));
    }

    async login(email: string, password: string): Promise<User> {
        await this.delay;
        const user = this.users.find(u=>u.email===email);
        if(!user){
            throw new Error("User not found");
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }


    async getCurrentUser(): Promise<User | null> {
        if(this.currentUser){
            return this.currentUser;
        }

        const stored = localStorage.getItem('currentUser');
        if(stored){
            this.currentUser = JSON.parse(stored);
            return this.currentUser
        }
        this.currentUser = this.users[0];
        localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
        return this.currentUser;
    }

    async logout(): Promise<void> {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
    
}