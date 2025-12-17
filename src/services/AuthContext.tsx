import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "../types/User";
import { authService } from ".";


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

                //ustawiamy domyslnego bo getCurrentUser() daje nam users[0]
                const user = await authService.getCurrentUser();
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

    const login = async (email:string,password:string) => {
        const user = await authService.login(email,password);
        setCurrentUser(user);
    }

    const logout = async () => {
        await authService.logout();
        setCurrentUser(null);
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