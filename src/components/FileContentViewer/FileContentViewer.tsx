import type { FileItem } from "../../types/FileItem"
import Modal from "../Modal/Modal"
import styles from "..//..//components//FileContentViewer//FileContentViewer.module.css"
import buttonStyles from "../Common/Button.module.css"
import { Button } from "../Common/Button"
import { XIcon } from "..//..//icons//XIcon"
import { Folder, HardDrive } from "lucide-react"
import { PdfIcon } from "..//..//icons//PdfIcon";
import { DocumentIcon } from "..//..//icons//DocumentIcon";
import { useFiles } from "../../services/FilesContextType"
import { useRef, useState } from "react"

interface Props {
    contentOpen: boolean,
    selectedFileId: string | null,
    fileContent: string

    onActivate: () => void
    onEditing: (e:React.ChangeEvent<HTMLTextAreaElement>) => void
    onClose: () => void

}

export const FileContentViewer = ({selectedFileId,contentOpen,fileContent,onActivate,onEditing,onClose} : Props) => {

    const Xicon = <XIcon size={24} color="#9e9e9eff" strokeWidth={1}></XIcon>
    
    const headerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const [renameFileOpen,setRenameFileOpen] = useState(false);
    const [fileName,setFileName] = useState("");

    const {
        allFiles,
        handleUpdate,
        handleUpdateContent
    } = useFiles()

    const selectedFile = allFiles.find(f=>f.id === selectedFileId);

    
    
    
    if (!selectedFile) {
        return null;
    }
    
    const handleRenameClick = (fileName:string) => {
        setRenameFileOpen(true);
        setFileName(fileName);
    } 

    const handleRename = async (id:string,newName:string) => {
        try {
            await handleUpdate(id,{name:newName})
            setRenameFileOpen(false);
            setFileName("");
        }catch(err){
            alert('No such id');
        }
    }


    const handleIcon = (file: FileItem | undefined) =>{
        switch (file?.type){
            case "folder": 
                return <Folder size={22} fill="#333" stroke="#333"/>
            case "txt":
                return  <DocumentIcon size={22}/>
            case "pdf":
                return  <PdfIcon size={22}/>
            case "doc":
                return <DocumentIcon size={22}/>
        }
    }


    const icon = handleIcon(selectedFile);


    const renderFileContent = () => {
        switch (selectedFile.type) {
            case 'txt':
                return (
                    <textarea 
                      value={fileContent}
                      onChange={onEditing}
                      className={styles.editor}
                      placeholder="Edytuj plik..."
                    />
                  );
            case 'pdf':
                return (
                    <iframe
                      src={fileContent} // base64 data URL
                      className={styles.pdfViewer}
                      title={selectedFile.name}
                    />
                  );
            case 'doc':
                return (
                    <div className={styles.docPreview}>
                        <p>Podgląd plików .doc nie jest obsługiwany</p>
                        <p>Możesz tylko pobrać plik</p>
                        <a href={fileContent} download={selectedFile.name}>
                            Pobierz plik
                        </a>
                    </div>
                );
            default: 
                return <div>Nieobsługiwany format pliku</div>
        }
    }

    return (     
      <Modal  open={contentOpen} onClose={onClose} overlay={styles.modalFileContentOverlay} className={styles.modalFileContent} 
      header={
      <div className={styles.modalFileContentHeader} ref={headerRef}>
            <Button className={buttonStyles.iconOnly} icon={Xicon} onClick={onClose}/>
            <div className={styles.title} >
                {icon}
                <div className={styles.label} onClick={()=> {handleRenameClick(selectedFile.name)}}>
                    {selectedFile?.name}
                </div>
            </div>
        </div>
      }
      clickableRef={headerRef}
      bottomRef={bottomRef}
      bottom={
        <div className={styles.modalFileContentBottom} ref={bottomRef}> 
            <button className={styles.button} onClick={onClose}>Anuluj</button>
            <button className={styles.button} onClick={async ()=>{ await handleUpdateContent(selectedFile.id,fileContent); onClose()}}>
                Zapisz
            </button>
        </div>
      }
     >
        <div className={styles.fileViewer}>
            {
            <Modal open={renameFileOpen} onClose={()=>setRenameFileOpen(false)}>
                <label className={styles.modalLabel}>Zmień nazwę</label>
                <input value={fileName} className={styles.modalInput} onChange={(e)=> setFileName(e.target.value)}></input>
                <div className={styles.modalButtons}>
                <button className={styles.modalButton} onClick={()=>setRenameFileOpen(false)}>Anuluj</button>
                <button className={styles.modalButton} onClick={()=>handleRename(selectedFile?.id || '',fileName)}>
                    Ok
                </button>
                </div>
            </Modal>
            }
            
            
            {renderFileContent()}
            
            <div className={styles.footer}>
        </div>
        </div>
      </Modal>
    )
}