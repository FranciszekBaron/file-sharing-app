import { useEffect } from "react";

const useGlobalShortcut = (callback: (e:KeyboardEvent) => void) => {
    useEffect(()=>{
        document.addEventListener("keydown",callback);
        return () => document.removeEventListener("keydown",callback);
    },[callback]);
}
export default useGlobalShortcut

//W react hooki zapisujemy jako const, bo dzieki temu nie nadpisze jej nikt pozniej i zachowuje this w sposob przewidywalny

//callback: (e:keyboardEvent) ten hook przyjmuje funckje jako argument 

//e argument który otrzyma callback

//void - nic nie zwraca

