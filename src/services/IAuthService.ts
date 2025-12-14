import type { User } from "../types/User.ts";

export interface IAuthService {
    login(email:string,password: string): Promise<User> ;
    getCurrentUser(): Promise<User | null>;
    logout(): Promise<void>;
}