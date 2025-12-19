
import { useFiles } from "../services/FilesContextType";
import { useNavigation } from "../services/NavigationContext";
import { readFileAsDataURL, readFileAsText } from "./useFileReader";
import { useFileSelection } from "./useFileSelection";





const useFileUploader = () => {

    const {
        handleAdd,
        handleGetContent,
        handleAddContent,
        handlePermanentDelete
    } = useFiles()


    const {
        currentFolderId
    } = useNavigation()


    const {
      selectedItems
    } = useFileSelection()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        
        if (files) {
          console.log('Wybrane pliki:', files);
          for(let i = 0;i<files.length;i++){
              const file = files[i];
    
              switch (file.type){
                case 'text/plain': {
                  let newFile;
                  try {
                    const content = await readFileAsText(file);
                    newFile = await handleAdd(file.name,'txt',currentFolderId);
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
                    newFile = await handleAdd(file.name,'pdf',currentFolderId);
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
                    newFile = await handleAdd(file.name,'doc',currentFolderId);
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
          }
        }
      };


    return {handleFileChange} //zwraca funkcje 

}

export default useFileUploader