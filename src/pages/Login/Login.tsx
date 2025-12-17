import { useState } from "react";
import { useAuth } from "../../services/AuthContext";
import styles from "./Login.module.css";


const Login = () => {

    const [emailInput,setEmailInput] = useState("");
    const [passwordInput,setPasswordInput] = useState("");
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        login
    } = useAuth()

    const handleLogin = async (e:React.FormEvent) => { 
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try{
            await login(emailInput,passwordInput);
        }catch(err){
            setError(err instanceof Error ? err.message : 'Błąd logowania');
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <div className={styles.contentWrapper}>
            <div className={styles.loginPanelWrapper}>
                <div className={styles.titleWrapper}>
                    <label className={styles.title}>Zaloguj się</label>
                    <label className={styles.adnotation}>Użyj swojego konta</label>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.inputsAreaWrapper}>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={emailInput}
                            className={`${styles.inputArea} ${error ? styles.inputError : ''}`}
                            onChange={(e)=>{setEmailInput(e.target.value)}}
                        />
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={passwordInput}
                            className={`${styles.inputArea} ${error ? styles.inputError : ''}`}
                            onChange={(e)=>{setPasswordInput(e.target.value)}}
                        />
                    </div>
                    {error && <span className={styles.errorMessage}>Nie mozemy znaleźć takiego konta</span>}
                    <span className={styles.passReminderButton}>Nie pamiętasz hasła?</span>
                </div>

                <div className={styles.buttonsWrapper}>
                    <button className={styles.button} onClick={handleLogin}>
                        {isLoading ? 'Logowanie...' : 'Dalej'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login