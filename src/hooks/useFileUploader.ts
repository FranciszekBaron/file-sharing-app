
import { useFiles } from "../services/FilesContextType";
import { useNavigation } from "../services/NavigationContext";
import { readFileAsDataURL, readFileAsText } from "./useFileReader";
import { useFileSelection } from "./useFileSelection";





const useFileUploader = () => {

    const {
        handleAdd,
        handleGetContent,
        handleAddContent,
        handlePermanentDelete,
        handleUploadFile,
        refreshFiles
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
    
              try {
                await handleUploadFile(file,currentFolderId);
                console.log(`✅ Uploaded: ${file.name}`);
              }catch(err){
                console.error(`❌ Upload failed for ${file.name}:`, err);
                
                // ✅ err.message teraz zawiera message z backendu!
                const errorMessage = err instanceof Error 
                    ? err.message 
                    : 'Nieznany błąd';
                
                alert(`Nie udało się przesłać pliku: ${file.name}\n\nPowód: ${errorMessage}`);
              }
          }
        }

        await refreshFiles();
      };


    return {handleFileChange} //zwraca funkcje 

}

export default useFileUploader