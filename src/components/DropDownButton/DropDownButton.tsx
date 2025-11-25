import { use, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../DropDownButton/DropDownButton.module.css"
import { ChevronDown } from "lucide-react";


interface Props {
    icon?: ReactNode;
    label: string;
    textSize?: number;
    variant?: "default" | "filters" | "icon"; 
}

//to samo co ({children} : {children:React.ReactNode}) tylko inaczej zapisane
// moze czytelniej? 


//Propsy niemutowalne -> to znaczy ze nie mozna im przypisac pozniej wartosci w innym miejscu niz Props
const DropDownButton = ({icon,label,textSize=24,variant}: Props) => {

    const [open,setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const hasIcon = icon;


    const handleClickOutside = (e:MouseEvent) => 
    {
        if(ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown",handleClickOutside);
        return () => document.removeEventListener("mousedown",handleClickOutside)
    },[]); //return zeby nie bylo memory leak, czyli jak zmieniassz np widok to sie usuwa troche jak dispose() czy cos 

    //odpala sie tylko raz, dlatego, ze nie ma sensu zeby tworzyl sie wiecej razy Bez tego, za każdym razem odpala nowy -> działa tak samo, ale mniej optymalnie, może obciążać przeglądarke 

    return (
        <div className={`${styles.wrapper} ${hasIcon ? styles.overlap : styles.dropdown}`} ref={ref}>
            {hasIcon ? (
            <button className={`${styles.button} ${variant ? styles[variant] : ''}`} onClick={() => setOpen(!open)}>
                {icon}
                {label}
            </button>
            ) : (<button className={`${styles.button} ${variant ? styles[variant] : ''}`} style={{fontSize:(`${textSize}px`)}} onClick={() => setOpen(!open)}>
                {label}
                <ChevronDown size={14} className={open ? styles.iconOpen : ""} color="black" fill="black" />
            </button>)
            }

            {open && (
                <div className={styles.menu}>
                    <div className={styles.item}>Nowy folder</div>
                    <div className={styles.item}>Prześlij pik</div>
                    <div className={styles.item}>Prześlij folder</div>
                </div>
            )}
        </div>
    );
}
export default DropDownButton