import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { SCREENS } from "../screens/ScreenRouter";

interface SideBarProps {
  navigate: (screen: SCREENS, data: object) => void;
}

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
        <NoTopicsMessage />
      </div>
    </div>
  );
};
