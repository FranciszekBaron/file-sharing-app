import styles from "./FileItem.module.css";
import type { FileItem as FileItemType } from "../../types/FileItem";


interface Props {
    file: FileItemType
}

export const FileItem = ({file} : Props) => {
    return <span className={styles.fileName}>{file.name}</span>
}

export default FileItem;