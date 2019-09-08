import React, { useState } from "react";
import "./App.css";
import { SideBar } from "./sidebar-navigator";
import { MainContent } from "./main-content-view";
import { Modal } from "./Modal";
import { TOPIC_SCREENS } from "./routers/TopicRouter";

const App: React.FC = () => {
  const [screen, setScreen] = useState(TOPIC_SCREENS.LOADING);
  const [data, setData] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = (screen: TOPIC_SCREENS, data: any) => {
    setScreen(screen);
    setData(data);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="App">
      <SideBar navigate={navigate} screen={screen} toggleModal={toggleModal} />
      <MainContent screen={screen} data={data} navigate={navigate} />
      <Modal display={modalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default App;
