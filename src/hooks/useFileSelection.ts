import { useState } from "react";


export const useFileSelection = () => {
    const [selectedItems,SetSelectedItems] = useState<Set<string>>(new Set());
    const [lastClickedItem,SetLastClickedItem] = useState<string | null>();

    const handleClickItem = (itemId:string,index:string, event:React.MouseEvent) => { 
    
        if(event.shiftKey && lastClickedItem){
    
            const start = parseInt(lastClickedItem);
            const end = parseInt(index);
    
            if(lastClickedItem < index){
              SetSelectedItems(prev=>{
                const newSet = new Set(prev);
                for(let i = start;i<=end;i++){
                    newSet.add(i.toString());
                }
                return newSet;
              });
    
            }else{
              const start = parseInt(index);
              const end = parseInt(lastClickedItem);
    
              SetSelectedItems(prev=>{
                const newSet = new Set(prev);
                for(let i = end;i>=start;i--){
                    newSet.add(i.toString());
                }
                return newSet;
              });
            }
    
        }else if(event.ctrlKey || event.metaKey){
          SetSelectedItems(prev=>{
            const newSet = new Set(prev);
            if(newSet.has(index)){
              newSet.delete(index);
            }else{
              newSet.add(index);
            }
            return newSet;
          });
        }else {
          SetLastClickedItem(index)
          SetSelectedItems(new Set([index]));
        }
      }
    
      const clearSelection= () => {
        SetLastClickedItem("")
        SetSelectedItems(new Set());
      }




    return {
        selectedItems,
        handleClickItem,
        clearSelection,
        hasSelection: selectedItems.size > 0
    };



}