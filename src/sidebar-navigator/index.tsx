import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { SCREENS } from "../screens/ScreenRouter";
import { TopicsList } from "./TopicsList";

interface SideBarProps {
  navigate: (screen: SCREENS, data: object) => void;
}

const topics = [
  { name: "A history of the OSI Model", date: "" },
  { name: "Carl Jung | Dreams", date: "" },
  { name: "Rust procedural macros", date: "" },
  { name: "React hooks", date: "" }
];

export const SideBar = ({ navigate }: SideBarProps) => {
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
        {topics.length && <TopicsList topics={topics} />}
        {topics.length === 0 && <NoTopicsMessage />}
      </div>
    </div>
  );
};
