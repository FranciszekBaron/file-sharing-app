import type { User } from "../types/User";
import type { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
    login(email: string, password: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getCurrentUser(): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}


//TODO 