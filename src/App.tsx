import React, { useState, useEffect } from "react";
import "./App.css";
import { SideBar } from "./sidebar-navigator";
import { MainContent } from "./main-content-view";
import { Modal } from "./Modal";
import { TOPIC_SCREENS } from "./routers/TopicRouter";
import { getTopics } from "./client-lib/";
import { TopicsState } from "./types/";

const App: React.FC = () => {
  const [screen, setScreen] = useState(TOPIC_SCREENS.LOADING);
  const [data, setData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [topics, setTopics] = useState<TopicsState>({
    loading: true,
    data: []
  });

  const navigate = (screen: TOPIC_SCREENS, data: any) => {
    setScreen(screen);
    setData(data);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchTopics = async () => {
    const topics = await getTopics([]);
    setTopics({ loading: false, data: topics });
    navigate(TOPIC_SCREENS.MY_NOTES, topics[0]);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="App">
      <SideBar
        navigate={navigate}
        screen={screen}
        topics={topics}
        toggleModal={toggleModal}
      />
      <MainContent screen={screen} data={data} navigate={navigate} />
      <Modal
        display={modalOpen}
        toggleModal={toggleModal}
        refresh={fetchTopics}
      />
    </div>
  );
};

export default App;
