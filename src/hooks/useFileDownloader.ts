
import { useFiles } from "../services/FilesContextType"
import { useFileSelection } from "./useFileSelection"



export const useFileDownloader = (selectedItems: Map<string,string>) => {

    const {
        getFileById,
        handleGetContent
    } = useFiles()
    
    
    
    const downloadFile = async (id:string) => {
        try{
            const fileItem = await getFileById(id);
            const fileContent = await handleGetContent(id)

            if (fileContent.size === 0) {
                alert(`Plik "${fileItem.name}" jest pusty`);
                return;
            }

            console.log("Type z funkcji download: " + fileItem.type)
            downloadBlob(fileContent,fileItem.name);
        }catch(err){
            console.error('Error downloading file,',err); 
        }
    } 


    const downloadSelected = async () => {
        for(const fileId of selectedItems.values()){
            await downloadFile(fileId);
        }
    }


    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;  // ✅ Nazwa z backendu (raport.pdf, dokument.txt...)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    return {downloadFile,downloadSelected};

}