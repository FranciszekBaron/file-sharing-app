import Layout from "../../components/Layout/Layout";
import Home from "../../views/Home/Home";
import MyFiles from "../../views/MyFiles/MyFiles";
import Shared from "../../views/Shared"
import Recent from "../../views/Recent";
import Starred from "../../views/Starred";
import Spam from '../../views/Spam';
import Trash from '../../views/Trash';
import { useState } from "react";


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

  const renderView = () => {
    return viewMap[activeView] || <Home />;
  };

    return (
        <Layout activeView={activeView} setActiveView={setActiveView}>
            {renderView()}
        </Layout>
    );
};
export default Dashboard;