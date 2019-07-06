import React from "react";
import "./styles.css";

export const TopicNavigationBar: React.FC = () => {
  return (
    <nav id="topic-navigation-bar">
      <p id="topic-header">Rust Ownership And Borrowing</p>
      <div id="topic-controls-container">
        <button className="btn topic-nav-btn">
          <i className="fas fa-pen-square" /> My Notes
        </button>
        <button className="btn topic-nav-btn">
          <i className="fab fa-youtube" /> Videos
        </button>
        <button className="btn topic-nav-btn">
          <i className="fas fa-newspaper" /> Article Snippets
        </button>
        <button className="btn topic-nav-btn">
          <i className="fas fa-code" /> Code
        </button>
        <button className="btn topic-nav-btn">
          <i className="fas fa-images" /> Images
        </button>
        <button className="btn topic-nav-btn">
          <i className="fas fa-file-alt" /> Documents
        </button>
      </div>
    </nav>
  );
};
