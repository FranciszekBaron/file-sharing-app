import styles from "./FileItem.module.css";
import type { FileItem as FileItemType } from "../../types/FileItem";


interface Props {
    file: FileItemType //troche jak generics , ze to jest typ tego pliku ktory sobie przekazemy
}

export const FileItem = ({file} : Props) => {
    return <span className={styles.fileName}>{file.name}</span>
}

export default FileItem;