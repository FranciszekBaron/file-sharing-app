
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

            console.log("Type z funkcji download: " + fileItem.type)
            if(fileItem.type === 'txt'){
                downloadTextFile(fileContent,fileItem.name);
            }else if(fileItem.type === 'pdf' || fileItem.type ==='doc'){
                if (!fileContent || fileContent.trim() === '' || fileContent === 'data:application/pdf;base64') {
                    alert(`Plik "${fileItem.name}" jest pusty i nie może być pobrany`);
                    return;
                }
                downloadPDF(fileContent,fileItem.name);
            }else if(fileItem.type === 'folder'){
                alert('Pobieranie folderów będzie dostępne po uruchomieniu serwera');
                return;
            }else{
                alert("Unsuported type for downloading")
                return;
            }
        }catch(err){
            console.error('Error downloading file,',err); 
        }
    } 


    const downloadSelected = async () => {
        for(const fileId of selectedItems.values()){
            await downloadFile(fileId);
        }
    }


    const downloadTextFile = (content:string, filename:string) => {
        const blob = new Blob([content],{type: 'text/plain'}); //obiekt w przegladarce, tworzy obiekt danym content - tablica z danymi , type - MIME
        const url = URL.createObjectURL(blob); //tymczasowy url do bloba, tylko w tej sesji przegladarki 
        const link = document.createElement('a'); //tworzy elememt w pamieci niewidoczny 

        link.href = url; //gdzie link prowadzi 
        link.download = filename; //to ma byc download, bez tego probowala by otwierac w nowej karcie
        link.click(); // klikniecie w niewidzialny przycisk 

        URL.revokeObjectURL(url); //memory leak zeby nie bylo, trzeba usunąć z pamięci
    }

    const downloadPDF = (content:string,filename:string) => {
        const link = document.createElement('a');
        link.href = content;
        link.download = filename;
        link.click();
    }


    return {downloadFile,downloadSelected};

}