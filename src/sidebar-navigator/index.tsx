import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { SCREENS } from "../screens/ScreenRouter";
import { TopicsList } from "./TopicsList";
import { Topic } from "./TopicItem";

interface SideBarProps {
  navigate: (screen: SCREENS, data: any) => void;
  topics: Array<Topic>;
}

export const SideBar = ({ navigate, topics }: SideBarProps) => {
  const onClickNewTopic = () => {
    navigate(SCREENS.CREATE_NEW_TOPIC, {});
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
        {topics.length && <TopicsList topics={topics} navigate={navigate} />}
        {topics.length === 0 && <NoTopicsMessage />}
      </div>
    </div>
  );
};
