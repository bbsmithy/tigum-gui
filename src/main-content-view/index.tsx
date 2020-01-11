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
  const [modalOpen, setModalOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState("");

  // @ts-ignore
  const [
    {
      content: {
        selectedTopic,
        topics: { data, loading }
      }
    },
    dispatch
  ] = useStateValue();

  const topic = data[selectedTopic];

  const navigate = (screen: TOPIC_SCREENS, topic_id: number) => {
    setScreen(screen);
    dispatch({ type: "SET_SELECTED_TOPIC", payload: topic_id });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchTopics = async () => {
    dispatch({ type: "FETCHING_TOPICS" });
    try {
      const newTopics = await getTopics([]);
      const orderedTopics = newTopics.reverse();
      dispatch({ type: "SET_TOPICS", payload: orderedTopics });
      navigate(TOPIC_SCREENS.MY_NOTES, orderedTopics[0].id);
    } catch (e) {
      console.log(e.status);
      console.log("Could not fetch topics");
      dispatch({ type: "SET_TOPICS_FAILURE" });
    }
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
    if (topic) {
      return (
        <>
          <TopicNavigationBar
            title={topic.title}
            navigate={navigate}
            topic={topic}
          />
          <div className="topic-route-container">
            <TopicRouter screen={screen} topic={topic} />
          </div>
        </>
      );
    } else {
      return <h3>No topic</h3>;
    }
  };

  const renderLoading = () => {
    return <h3>Loading</h3>;
  };

  const renderApp = () => {
    return (
      <>
        <SideBar
          navigate={navigate}
          screen={screen}
          toggleModal={toggleModal}
        />
        {loading ? renderLoading() : renderTopicViewer()}
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
      </>
    );
  };

  const renderLoginSignUp = () => {
    return <p>Hello</p>;
  };

  return <div id="main-content">{renderApp()}</div>;
};
