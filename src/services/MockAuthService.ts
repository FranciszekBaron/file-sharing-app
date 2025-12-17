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
        await this.delay();
        const user = this.users.find(u=>u.email===email && u.password === password);
        if(!user){
            throw new Error("Nieprawidłowy email lub hasło");
        }


        const {password: _, ...userWithoutPassword} = user;

        this.currentUser = userWithoutPassword;


        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        localStorage.setItem('isAuthenticated','true');
        return userWithoutPassword;
    }


    async getCurrentUser(): Promise<User | null> {

        // console.log("getCurrentUser called,returning:", this.users[0]);
        // return this.users[0];

        const isAuthenticated = localStorage.getItem('isAuthenticated');

        if(!isAuthenticated){
            return null;
        }

        if(this.currentUser){
            return this.currentUser;
        }

        const stored = localStorage.getItem('currentUser');
        if(stored){
            this.currentUser = JSON.parse(stored);
            return this.currentUser
        }
        return null;
    }

    async logout(): Promise<void> {
        this.currentUser = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
    }
    
}