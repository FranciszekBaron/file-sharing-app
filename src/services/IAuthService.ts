import type { AuthResponse } from "../dto/AuthResponse.ts";
import type { User } from "../types/User.ts";

export interface IAuthService {
    login(email:string,password: string): Promise<AuthResponse> ;
    getCurrentUser(): Promise<User | null>;
    logout(refreshToken:string): Promise<void>;
    refreshToken() : Promise<AuthResponse>;


    loginMock(email:string,password: string): Promise<User> ;
}