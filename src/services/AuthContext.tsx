import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "../types/User";
import { authService } from ".";
import { getUserFromToken, isTokenExpired } from '..//..//src//utils//JwtHelper';


interface AuthContextType {
    //state'y
    currentUser: User | null;
    isLoading: boolean;

    //funkcje do zmiany state'ow
    login: (email:string,password:string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider = ({children} : {children:React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<User|null>(null);
    const [isLoading,setIsLoading] = useState(true);

    
    useEffect(()=>{
        const loadUser = async () => {
            try{
                const accessToken = localStorage.getItem('accesToken');

                if (!accessToken) {
                    setCurrentUser(null);
                    return;
                }
                
                const user = getUserFromToken(accessToken);
                setCurrentUser(user);
            }catch (err){
                console.error('Failed to load user:', err)
            }finally {
                setIsLoading(false);
            }
        }

        loadUser()
    },[])

    console.log("AuthProvider mounted");
    console.log(currentUser);

    const login = async (email:string,password:string) => {

        try{
            setIsLoading(true);
            const authResponse = await authService.login(email,password);
            localStorage.setItem('accesToken',authResponse.accessToken);
            localStorage.setItem('refreshToken',authResponse.refreshToken);

            const user = getUserFromToken(authResponse.accessToken);


            if (!user) {
                throw new Error('Failed to decode user from token');
            }

            setCurrentUser(user);

        }catch (err) {
            console.error('Login failed:', err);
            throw err; // Przekaż błąd do LoginForm żeby mógł wyświetlić
        } finally {
            setIsLoading(false);
        }

    }

    const logout = async () => {
        const token = localStorage.getItem('refreshToken');

        if (!token) {
                throw new Error('Failed to load refreshToken from storage');
            }
        await authService.logout(token);
        
        localStorage.removeItem('accesToken');
        localStorage.removeItem('refreshToken');
        setCurrentUser(null);
    }

    const handleRefreshToken = async () => { 
        const refreshedToken = await authService.refreshToken();

        if (!refreshedToken) {
            throw new Error('Failed to load refreshToken from storage');
        }

        localStorage.setItem('accesToken',refreshedToken.accessToken);
    }

    return (
        <AuthContext.Provider value={{
            currentUser,isLoading,login,logout
        }}>
        {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context;
}