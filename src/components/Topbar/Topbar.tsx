import { Button } from "../Common/Button";
import { Profile } from "../Common/Profile";
import {Searchbar} from "../Searchbar/Searchbar";
import styles from "./Topbar.module.css";
import buttonStyles from "../Common/Button.module.css"
import { mockFiles } from "../../data/mockFiles";
import { SettingsIcon } from "../../icons/SettingsIcon";
import { HelpCircleIcon } from "../../icons/HelpCircleIcon";
import { Settings,Sliders, HelpCircle} from "lucide-react";
import { AppsIcon } from "../../icons/AppsIcon";

const Topbar = ({activeView} : {activeView: number}) => {
  const settingsIcon = <SettingsIcon size={20} strokeWidth={2}/>
  const slidersIcon = <AppsIcon size={20}/>
  const helpCircleIcon = <HelpCircleIcon size={20} strokeWidth={2}/>

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        
        {/* Lewa strona - Searchbar */}
        <div className={styles.leftSection}>
          {activeView === 1 && <Searchbar items={mockFiles}/>}
        </div>
        
        {/* Prawa strona - Buttony (zawsze przyklejone do prawej) */}
        <div className={styles.rightSection}>
          <div className={styles.button}>
            <Button className={buttonStyles.iconOnly} icon={settingsIcon} />
          </div>
          <div className={styles.button}>
            <Button className={buttonStyles.iconOnly} icon={helpCircleIcon} />
          </div>
          <div className={styles.button}>
            <Button className={buttonStyles.iconOnly} icon={slidersIcon} />
          </div>
          <div className={styles.buttonProfile}>
            <Profile />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Topbar


