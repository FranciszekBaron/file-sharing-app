import Login from "../../pages/Login/Login";
import { useAuth } from "../../services/AuthContext";

interface Props {
    children:React.ReactNode;
}

const AuthGuard = ({children}:Props) => {
    const {
        currentUser,
        isLoading
    } = useAuth()



    //
    if (isLoading) {
        return (
            <div style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'}}>
                Ładowanie...
            </div>
        );
    }


    //jesli nie zalogowane wyswietla 
    if(!currentUser){
        return <Login />
    }

    return <>{children}</>
}

export default AuthGuard;