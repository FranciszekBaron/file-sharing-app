import { Navigation, UndoIcon } from "lucide-react";
import React, { Children, createContext, useContext, useState } from "react";


export const ViewType = {
  HOME: 0,
  MY_FILES: 1,
  SHARED: 3,
  RECENT: 4,
  STARRED: 5,
  SPAM: 7,
  TRASH: 8,
  GENERAL_SEARCH: 9
} as const;

type ViewType = typeof ViewType[keyof typeof ViewType];


interface NavigationContextType { 
    //State
    activeView: number | null,


    //Funkcje do zmieniania state'ów
    setActiveView: (activeView: number | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({children} : {children: React.ReactNode}) => {
    const [activeView,setActiveView] = useState<number | null>(ViewType.HOME);
    
    return (
        <NavigationContext.Provider value={{
            activeView,
            setActiveView
        }}>
            {children}
        </NavigationContext.Provider>
    );
};


export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if(!context){
        throw new Error('useNavigation must be used withing NavigationProvider')
    }

    return context;
}