import Layout from "../../components/Layout/Layout";
import Home from "../../views/Home/Home";
import MyFiles from "../../views/MyFiles/MyFiles";
import Shared from "../../views/Shared"
import Recent from "../../views/Recent";
import Starred from "../../views/Starred/Starred";
import Spam from '../../views/Spam';
import Trash from '../../views/Trash/Trash';
import { useState } from "react";
import useGlobalShortcut from "../../hooks/useGlobalShortcut";

import type { FileItem } from "../../types/FileItem";

interface Props {
  items?: FileItem[]
}


const Dashboard = ({items}:Props) => {

    const [activeView,setActiveView] = useState(0);

  
    const viewMap = [
    <Home />,          // in  dex 0
    <MyFiles/>,       // index 1
    null,              // index 2 (spacer - nie renderuj nic)
    <Shared />,        // index 3
    <Recent />,        // index 4
    <Starred />,       // index 5
    null,              // index 6 (spacer)
    <Spam />,          // index 7
    <Trash />,         // index 8
  ];

  let lastClicked = "";

  const renderView = () => {
    return viewMap[activeView] || <Home />;
  };

  const handleNewFileKey = (e:KeyboardEvent) =>{
    if (e.ctrlKey && e.key === "c"){
      lastClicked = "ctrl + c";
      console.log("ControlC");
    }

    if(e.key === "f" && lastClicked==="ctrl + c"){
      console.log("Nowy Folder");
      lastClicked="";
    }
  }

  const handleUploadFileKey = (e:KeyboardEvent) =>{
    if (e.ctrlKey && e.key === "c"){
      lastClicked = "ctrl + c";
      console.log("ControlC");
    }

    if(e.key === "u" && lastClicked==="ctrl + c"){
      console.log("Prześlij Plik");
      lastClicked="";
    }
  }

  const handleUploadFolderKey = (e:KeyboardEvent) =>{
    if (e.ctrlKey && e.key === "c"){
      lastClicked = "ctrl + c";
      console.log("ControlC");
    }

    if(e.key === "i" && lastClicked==="ctrl + c"){
      console.log("Prześlij Folder");
      lastClicked="";
    }
  }
  
  useGlobalShortcut(handleNewFileKey);//dodaje listenera do tej funkcji
  useGlobalShortcut(handleUploadFileKey);
  useGlobalShortcut(handleUploadFolderKey);
  

  return (
      <Layout activeView={activeView} setActiveView={setActiveView}>
          {renderView()}
      </Layout>
  );
};
export default Dashboard;