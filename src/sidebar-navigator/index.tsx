import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { TopicsState } from "../types";

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
  toggleModal: () => void;
  topics: TopicsState;
}

export const SideBar: React.FC<SideBarProps> = ({
  navigate,
  screen,
  toggleModal,
  topics
}: SideBarProps) => {
  const onClickNewTopic = () => {
    toggleModal();
  };

  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <div id="logo-container">
          <img src={logo} id="logo" />
        </div>
        <button id="new-btn" onClick={onClickNewTopic}>
          <span>New Topic</span>
          <i className="fas fa-plus-circle" />
        </button>
      </div>
      <div id="sidebar-list">
        <TopicsList
          topics={topics.data}
          loading={topics.loading}
          screen={screen}
          navigate={navigate}
        />
        {topics.data.length === 0 && !topics.loading && <NoTopicsMessage />}
      </div>
    </div>
  );
};
