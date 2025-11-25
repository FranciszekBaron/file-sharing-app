import { Button } from "../Common/Button";
import { Profile } from "../Common/Profile";
import {Searchbar} from "../Searchbar/Searchbar";
import styles from "./Topbar.module.css";
import buttonStyles from "../Common/Button.module.css"

import { Settings,Sliders, HelpCircle} from "lucide-react";

const Topbar = ({activeView} : {activeView: number}) => {
    const settingsIcon = <Settings size={20}/>
    const slidersIcon = <Sliders size={20}/>
    const helpCircleIcon = <HelpCircle size={20}/>
    return (
        <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <Searchbar></Searchbar>
                <div className={styles.button}>
                    <Button className={buttonStyles.iconOnly} icon={settingsIcon}></Button>
                </div>
                <div className={styles.button}>
                    <Button className={buttonStyles.iconOnly}icon={helpCircleIcon}></Button>
                </div>
                <div className={styles.button}>
                    <Button className={buttonStyles.iconOnly}icon={slidersIcon}></Button>
                </div>
                <div className={styles.buttonProfile}>
                    <Profile></Profile>
                </div>
            </div>

            
        </div>
    );
}

export default Topbar


