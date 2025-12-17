import React, { useEffect, useRef, useState } from "react";
import styles from "../Common/Profile.module.css"
import MenuItem from "./MenuItem/MenuItem";
import { useAuth } from "../../services/AuthContext";
import { LogOutIcon } from "..//..//icons//LogOutIcon"

interface Props {
    image?: string,
    children?: React.ReactNode
}

export const Profile = ({image,children}: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const icon = <LogOutIcon size={12} strokeWidth={1.5}/>

    const {
        currentUser,
        logout
    } = useAuth()
    
    
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false);
        }
    }
    
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []); 


    


    return (

        <div className={styles.profileWrapper} ref={ref}>
            <button className={styles.profile} onClick={()=>{setOpen(!open)}}>
                {image && 
                <img src={image} alt="Profile" className={styles.profileImage}></img>}
            </button>

            {open && (
                <div className={styles.menu}>
                    <div className={styles.profileInfo}>
                        <label>{currentUser?.email}</label>
                        <div className={styles.profile} style={{height:80,width:80}}>
                            <img src={image} alt="Profile" className={styles.profileImage}></img>
                        </div>
                        <label>Witaj, {currentUser?.name}</label>
                        <div className={styles.menuButtons}>
                        <button className={styles.manageAccountButton}>Zarządzaj swoim kontem</button>
                    </div>
                    <button className={styles.logoutButton} onClick={logout}>{icon} Wyloguj z konta</button>
                    </div>
                </div>
            )}
        </div>

    );
}