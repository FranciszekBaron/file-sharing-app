import { useState } from "react";
import styles from "..//Home//Home.module.css";


const MyFiles = () => {

  const [active,setToActive] = useState(false);


  return (
    <div className={`${styles.contentWrapper} ${active ? styles.active : ''}`}
    onClick={()=>setToActive(true)}>
      <label className={styles.label}>Witamy</label>
    </div>
  );
};

export default MyFiles;