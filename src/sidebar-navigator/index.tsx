import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { Topic } from "./TopicItem";

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
  topics: Array<Topic>;
}

export const SideBar = ({ navigate, screen, topics }: SideBarProps) => {
  const onClickNewTopic = () => {
    navigate(TOPIC_SCREENS.VIDEOS, {});
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
        {topics.length && (
          <TopicsList topics={topics} screen={screen} navigate={navigate} />
        )}
        {topics.length === 0 && <NoTopicsMessage />}
      </div>
    </div>
  );
};
