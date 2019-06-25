import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";

export const SideBar = () => {
  return (
    <div id="sidebar">
      <div id="sidebar-header">
        <div id="logo-container">
          <img src={logo} id="logo" />
        </div>
        <button id="new-btn">
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
