import React, { useState, useEffect, ChangeEventHandler } from "react";
import "./App.css";
import { SideBar } from "./sidebar-navigator";
import { MainContent } from "./main-content-view";
import { Modal } from "./components/Modal";
import { TOPIC_SCREENS } from "./routers/TopicRouter";
import { getTopics } from "./client-lib/api";
import { TopicsState } from "./types/";
import AppContextProvider from "./contexts/AppContext";
import { createTopic } from "./client-lib/api";

const App: React.FC = () => {
  const [screen, setScreen] = useState(TOPIC_SCREENS.LOADING);
  const [topic, setTopic] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [topics, setTopics] = useState<TopicsState>({
    loading: true,
    data: []
  });
  const [topicTitle, setTopicTitle] = useState("");

  const navigate = (screen: TOPIC_SCREENS, topic: any) => {
    setScreen(screen);
    setTopic(topic);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchTopics = async () => {
    const newTopics = await getTopics([]);
    const orderedTopics = newTopics.reverse();
    navigate(TOPIC_SCREENS.MY_NOTES, orderedTopics[0]);
    setTopics({ loading: false, data: orderedTopics });
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const onClickCreateTopic = async () => {
    try {
      const res = await createTopic(topicTitle, 1);
      if (res.status === 200) {
        fetchTopics();
        toggleModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTopicTitle(e.currentTarget.value);
  };

  return (
    <div className="App">
      <AppContextProvider>
        <SideBar
          navigate={navigate}
          screen={screen}
          topics={topics}
          toggleModal={toggleModal}
        />
        <MainContent
          screen={screen}
          topic={topic}
          loading={topics.loading}
          navigate={navigate}
          setTopic={setTopic}
        />
        <Modal
          display={modalOpen}
          toggleModal={toggleModal}
          onClickAction={onClickCreateTopic}
          buttonText="Create"
          title="Create Topic"
        >
          <input
            type="text"
            placeholder="Title"
            id="topic-title-input"
            value={topicTitle}
            onChange={onChangeTitle}
          />
        </Modal>
      </AppContextProvider>
    </div>
  );
};

export default App;
