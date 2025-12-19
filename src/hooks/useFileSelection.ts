import { useEffect, useState } from "react";
import { useFiles } from "../services/FilesContextType";


interface FileSelectionType {
    selectedItems: Map<string,string>;
}


export const useFileSelection = (containerRefs?: React.RefObject<HTMLElement | null>[]) => {
    const [selectedItems,SetSelectedItems] = useState<Map<string,string>>(new Map());
    const [lastClickedItem,SetLastClickedItem] = useState<string | null>();
    const [lastId,setLastId] = useState<string | null>();


    const {
      displayedFiles 
    } = useFiles()

    useEffect(()=>{
      const handleClickOutside = (e:MouseEvent) => {
          const clickedInside = containerRefs?.some(r=>r.current && r.current?.contains(e.target as Node))
          
  
          if(!clickedInside){
            clearSelection()
          }
      }
      if(selectedItems.size >0){
        document.addEventListener('mousedown',handleClickOutside)
      }
  
      return () => {
        document.removeEventListener('mousedown',handleClickOutside)
      }
    },[selectedItems,containerRefs])
    

    const handleClickItem = (itemId:string,index:string, event:React.MouseEvent) => { 
    
        if(event.shiftKey && lastClickedItem){
    
            const start = parseInt(lastClickedItem);
            const end = parseInt(index);
    
            if(lastClickedItem < index){
              SetSelectedItems(prev=>{
                const newSet = new Map(prev);
                for(let i = start;i<=end;i++){
                    newSet.set(i.toString(),displayedFiles[i].id);
                }
                console.log("Z shift");
                console.log(newSet);
                return newSet;
              });
    
            }else{
              const start = parseInt(index);
              const end = parseInt(lastClickedItem);
    
              SetSelectedItems(prev=>{
                const newSet = new Map(prev);
                for(let i = end;i>=start;i--){
                    newSet.set(i.toString(),displayedFiles[i].id);
                }
                console.log("Z shift");
                console.log(newSet);
                return newSet;
              });
            }
    
        }else if(event.ctrlKey || event.metaKey){
          SetSelectedItems(prev=>{
            const newSet = new Map(prev);
            if(newSet.has(index)){
              newSet.delete(index);
            }else{
              newSet.set(index,itemId);
            }
            console.log("Z ctrl");
            console.log(newSet);
            return newSet;
          });
        }else {
          SetLastClickedItem(index)
          setLastId(itemId);
          SetSelectedItems(new Map([[index,itemId]]));
          console.log("Bez ctrl i shift");
          console.log(new Map([[index,itemId]]));
        }
      }
    
      const clearSelection= () => {
        console.log("z clear");
        SetLastClickedItem("")
        SetSelectedItems(new Map());
        console.log(selectedItems);
      }


    return {
        selectedItems,
        handleClickItem,
        clearSelection,
        hasSelection: selectedItems.size > 0
    };



}