import Topbar from "../Topbar/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.css";
import type React from "react";
import Rightbar from "../Rightbar/Rightbar";
import { useState } from "react";
import Pointer from "../Common/Pointer";
import { useNavigation } from "../../services/NavigationContext";


const Layout = ({
    children,
} : {
    children: React.ReactNode,
}) => {

    

    const [sidebarWidth, setSidebarWidth] = useState(260); // ustawia domyślną szerokość

    const [pos,setPos] = useState({x:0,y:0}); // do ustawiania zmiennych kursora
    const [offset,setOffset] = useState({x:0,y:0});
    
    const MIN_SIDEBAR_WIDTH = 260;
    const MAX_SIDEBAR_WIDTH = 500;


    const handleSidebarResize = (e: React.MouseEvent) => {
        e.preventDefault();

        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        
       

        const handleMouseMove = (moveEvent: MouseEvent) => {
             
            if(moveEvent.clientX>MIN_SIDEBAR_WIDTH && moveEvent.clientX < MAX_SIDEBAR_WIDTH){
                setSidebarWidth(moveEvent.clientX);
            }
            
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove',handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        

        document.addEventListener('mousemove',handleMouseMove);
        
        document.addEventListener('mouseup',handleMouseUp); 
    };
    

    const handlePointerMoving = (e: React.MouseEvent) => {
        e.preventDefault();
        
        const sidebar = (e.currentTarget as HTMLDivElement).closest(`.${styles.sidebarWrapper}`)!;
        const rect = sidebar.getBoundingClientRect();

        console.log(rect.left,rect.top);

        const handleMouseMove = (moveEvent : MouseEvent) => {
            // console.log(pos.x,pos.y);
            setPos({x:moveEvent.clientX-rect.left,y:moveEvent.clientY-rect.top})
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove',handleMouseMove);
            document.removeEventListener('mouseup',handleMouseUp);
        }


        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);
    
        
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.topbarWrapper}>
                <Topbar/>
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.sidebarWrapper}
                style={{width: sidebarWidth}}>
                    <Sidebar>
                    </Sidebar>
                    <div className={styles.resizeHandle}
                    onMouseDown={handleSidebarResize}>
                    </div>
                </div>
                <main className={styles.main}
                >
                {children}
                </main>
                <div className={styles.rightbarWrapper}>
                    <Rightbar></Rightbar>
                </div>
            </div>
        </div>
    )
}

export default Layout