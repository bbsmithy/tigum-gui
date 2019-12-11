import React, { useState, useEffect } from "react";
import { TopicNavigationBar } from "../topic-navigation-bar";
import { TopicRouter, TOPIC_SCREENS } from "../routers/TopicRouter";
import { getTopics, createTopic } from "../client-lib/api";
import { TopicsState } from "../types/";
import { SideBar } from "../sidebar-navigator";
import { Modal } from "../components/";
import { useStateValue } from "../state/StateProvider";

export const MainContent = (props: any) => {
  const [screen, setScreen] = useState(TOPIC_SCREENS.LOADING);
  const [topic, setTopic] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");

  // @ts-ignore
  const [
    {
      content: { topics, selectedTopic }
    },
    dispatch
  ] = useStateValue();

  const navigate = (screen: TOPIC_SCREENS, topic: any) => {
    setScreen(screen);
    dispatch({ type: "SET_SELECTED_TOPIC", payload: topic });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchTopics = async () => {
    dispatch({ type: "FETCHING_TOPICS" });
    const newTopics = await getTopics([]);
    const orderedTopics = newTopics.reverse();
    dispatch({ type: "SET_TOPICS", payload: orderedTopics });
    navigate(TOPIC_SCREENS.MY_NOTES, orderedTopics[0]);
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

  const renderTopicViewer = () => {
    if (selectedTopic) {
      return (
        <>
          <TopicNavigationBar
            title={selectedTopic.title}
            navigate={navigate}
            topic={selectedTopic}
          />
          <div className="topic-route-container">
            <TopicRouter
              screen={screen}
              topic={selectedTopic}
              setTopic={setTopic}
              navigate={navigate}
            />
          </div>
        </>
      );
    } else {
      return <h3>No topics</h3>;
    }
  };

  const renderLoading = () => {
    return <h3>Loading</h3>;
  };

  return (
    <div id="main-content">
      <SideBar
        navigate={navigate}
        screen={screen}
        topics={topics}
        toggleModal={toggleModal}
      />
      {console.log(props.loading)}
      {props.loading ? renderLoading() : renderTopicViewer()}
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
    </div>
  );
};
