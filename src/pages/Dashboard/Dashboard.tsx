import Layout from "../../components/Layout/Layout";
import Home from "../../views/Home/Home";
import MyFiles from "../../views/MyFiles/MyFiles";
import Shared from "../../views/Shared"
import Recent from "../../views/Recent";
import Starred from "../../views/Starred";
import Spam from '../../views/Spam';
import Trash from '../../views/Trash';
import { useState } from "react";
import useGlobalShortcut from "../../hooks/useGlobalShortcut";


const Dashboard = () => {

    const [activeView,setActiveView] = useState(0);

    const viewMap = [
    <Home />,          // index 0
    <MyFiles />,       // index 1
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

  const handleKey = (e:KeyboardEvent) =>{
    if (e.ctrlKey && e.key === "c"){
      lastClicked = "ctrl + c";
      console.log("ControlC");
    }

    if(e.key === "f" && lastClicked==="ctrl + c"){
      console.log("Nowy Folder");
      lastClicked="";
    }
  }
  
  useGlobalShortcut(handleKey)//dodaje listenera do tej funkcji

  return (
      <Layout activeView={activeView} setActiveView={setActiveView}>
          {renderView()}
      </Layout>
  );
};
export default Dashboard;