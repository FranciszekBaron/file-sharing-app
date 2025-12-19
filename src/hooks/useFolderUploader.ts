import { useFiles } from "../services/FilesContextType";
import { useNavigation } from "../services/NavigationContext";
import { readFileAsDataURL, readFileAsText } from "./useFileReader";


const useFolderUploader = () => {

    const {
        handleAdd,
        handleAddContent,
        handlePermanentDelete
    } = useFiles()


    const {
        currentFolderId
    } = useNavigation()


    const handleFolderChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
    
        const folderMap = new Map<string,string>();
    
    
        //mapa dla element = id 
        let elementId = new Map<string,string>();
    
    
        for(let i = 0 ; i<files.length;i++){
            const file = files[i];
    
            const path = file.webkitRelativePath;
            const pathElements = path.split("/");
    
            let nextParent: string | null = currentFolderId;
    

            console.log("JESTEM Z HANDLEFOLDERCHANGE" + currentFolderId);
            let currentPath = currentFolderId || '';
    
    
            //=============DODAWANIE FOLDERÓW===============
            //==============================================
            //==============================================
            //==============================================
            //==============================================
    
            //ad. taki for czeka na await
            for (const element of pathElements.slice(0, pathElements.length - 1)) {
              
              currentPath += (currentPath ? '/' : '') + element;
              
              console.log("Next Parent: " + nextParent);
              console.log("Element id")
              console.log(elementId);
    
    
              if(elementId.has(currentPath)){ 
                nextParent = elementId.get(currentPath) || null; 
              }else{
                const newFile = await handleAdd(element,'folder',nextParent);
                elementId.set(currentPath,newFile.id);
                nextParent = newFile.id;
    
                if(element === pathElements[pathElements.length-2]){
                  folderMap.set(newFile.id,file.name);
                }
              }
            }
            //=============DODAWANIE PLIKÓW=================
              //==============================================
              //==============================================
              //==============================================
              //==============================================
    
              switch (file.type){
                case 'text/plain': {
                  let newFile;
                  try {
                    const content = await readFileAsText(file);
                    newFile = await handleAdd(file.name,'txt',nextParent);
                    await handleAddContent(newFile.id,content);
                  }catch(err){
                    if(newFile?.id){
                      await handlePermanentDelete(newFile.id); //jeśli content nie pojdzie to usuwamy plik, tak jak ROLLBACK
                    }
                    console.error('Upload failed:', err);
                  }
                  break;
                }
                case 'application/pdf': {
                  let newFile;
                  try{
                    const content = await readFileAsDataURL(file);
                    newFile = await handleAdd(file.name,'pdf',nextParent);
                    await handleAddContent(newFile.id,content);
                  }catch(err){
                    if(newFile?.id){
                      await handlePermanentDelete(newFile.id); //jeśli content nie pojdzie to usuwamy plik, tak jak ROLLBACK
                    }
                    console.error('Upload failed:', err);
                  }
                  break;
                }
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
                  let newFile;
                  try{
                    const content = await readFileAsText(file);
                    newFile = await handleAdd(file.name,'doc',nextParent);
                    await handleAddContent(newFile.id,content);
                  }catch(err){
                    if(newFile?.id){
                      await handlePermanentDelete(newFile.id); //jeśli content nie pojdzie to usuwamy plik, tak jak ROLLBACK
                    }
                    console.error('Upload failed:', err);
                  }
                  break;
                }
                default:
                  alert(`Unsupported format: ${file.name}`);
                  continue; //Pomijamy plik nieobsługiwany
              }
    
            console.log(folderMap);
        }
      }

      return {handleFolderChange};
}

export default useFolderUploader