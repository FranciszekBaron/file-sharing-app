import { use, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "../DropDownButton/DropDownButton.module.css"
import { ChevronDown , X} from "lucide-react";


interface Props {
    children?: React.ReactNode;
    icon?: ReactNode;
    label: string;
    textSize?: number;
    variant?: "default" | "filters" | "icon"; 
    menuVariant?: "default" | "operations" | "elements";
    selected?: boolean
    onClear?: () => void
}

//to samo co ({children} : {children:React.ReactNode}) tylko inaczej zapisane
// moze czytelniej? 


//Propsy niemutowalne -> to znaczy ze nie mozna im przypisac pozniej wartosci w innym miejscu niz Props
const DropDownButton = ({children, icon,label,textSize=24,variant,menuVariant,selected,onClear}: Props) => {


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
    },[]); 
    //return zeby nie bylo memory leak, czyli jak zmieniassz np widok to sie usuwa troche jak dispose() czy cos 

    //odpala sie tylko raz, dlatego, ze nie ma sensu zeby tworzyl sie wiecej razy Bez tego, za każdym razem odpala nowy -> działa tak samo, ale mniej optymalnie, może obciążać przeglądarke 

    return (
        <div className={`${styles.wrapper} ${hasIcon ? styles.overlap : styles.dropdown}`} ref={ref}>
            {hasIcon ? (
            <button className={
                `${styles.button} 
                ${variant ? styles[variant] : ''}
                `}
                onClick={() => setOpen(!open)}>
                {icon}
                {label}
            </button>
            ) : (<button className={`
                ${styles.button} 
                ${variant ? styles[variant] : ''}
                ${selected ? styles.clicked : ""}
                `} 
                style={{fontSize:(`${textSize}px`)}} onClick={() => setOpen(!open)}>
                {label}
                <ChevronDown size={11} className={open ? styles.iconOpen : ""} color="black" fill="black" />
            </button>)
            }
            {selected && (
                <button className={styles.clearBtn} onClick={onClear}>
                    <X size={16} color="rgb(41,83,125)"/>
                </button>
            )}
            
            {open && (
                <div className={`${styles.menu} ${menuVariant ? styles[menuVariant] : ''}`}>
                    {children}
                </div>
            )}
        </div>
    );
}
export default DropDownButton