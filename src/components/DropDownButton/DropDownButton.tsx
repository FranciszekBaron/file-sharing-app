import { use, useRef, useState } from "react";
import styles from "../DropDownButton/DropDownButton.module.css"


interface Props {
    label: string;
}

//to samo co ({children} : {children:React.ReactNode}) tylko inaczej zapisane
// moze czytelniej? 

const DropDownButton = ({label}: Props) => {

    const [open,setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);



    return (
        <div></div>
    );
}
export default DropDownButton