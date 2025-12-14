import { Navigation, UndoIcon, View } from "lucide-react";
import React, { Children, createContext, useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


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


const VIEW_ROUTES: Record<string,number> = {
    'home': ViewType.HOME,
    'my-files': ViewType.MY_FILES,
    'shared': ViewType.SHARED,
    'recent': ViewType.RECENT,
    'starred': ViewType.STARRED,
    'spam': ViewType.SPAM,
    'trash': ViewType.TRASH,
    'general-search': ViewType.GENERAL_SEARCH
}

const ROUTE_NAMES: Record<number, string> = {
  [ViewType.HOME]: 'home',
  [ViewType.MY_FILES]: 'my-files',
  [ViewType.SHARED]: 'shared',
  [ViewType.RECENT]: 'recent',
  [ViewType.STARRED]: 'starred',
  [ViewType.SPAM]: 'spam',
  [ViewType.TRASH]: 'trash',
  [ViewType.GENERAL_SEARCH] : 'general-search'
};




interface NavigationContextType { 
    //State
    activeView: number | null;
    currentFolderId: string | null;

    //Funkcje do zmieniania state'ów
    setActiveView: (activeView: number | null) => void;
    setCurrentFolderId: (folderId: string | null) => void;
    navigateTo: (view: number,folderId?:string | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({children} : {children: React.ReactNode}) => {
    

    const navigate = useNavigate();
    const params = useParams(); // ✅ Teraz params DZIAŁA!
    const location = useLocation();
    
    const activeView = params.view
        ? (VIEW_ROUTES[params.view] ?? ViewType.HOME)
        : ViewType.HOME;
    
    const currentFolderId = params.folderId || null; // ✅ Zamiast params.folderId
    



    console.log(currentFolderId);

    const navigateTo = (view:number,folderId: string | null = null) => {
        
        const routeName = ROUTE_NAMES[view] || 'home';
        //tu na odwró† patrzymy names -> url 
        console.log("routeName:" + routeName);
        console.log("routeName: " + "folder" + folderId);

        if(folderId) {
            navigate(`/drive/${routeName}/${folderId}`);
        }else{
            navigate(`/drive/${routeName}`);
        }
    };

    //ustawianie active view i current folder po url 
    const setActiveView = (view:number | null) => {
        if(view !== null){
            navigateTo(view,currentFolderId);
        }
    };

    const setCurrentFolderId = (folderId:string | null) => {
        console.log(folderId);
        navigateTo(activeView,folderId);
    }


    return (
        <NavigationContext.Provider value={{
            activeView,
            currentFolderId,
            setActiveView,
            setCurrentFolderId,
            navigateTo
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