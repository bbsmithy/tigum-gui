import React from "react";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import "./styles.css";

interface TopicNavigationBarProps {
  title: string;
  data: any;
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
}

export const TopicNavigationBar = ({
  title,
  data,
  navigate
}: TopicNavigationBarProps) => {
  const navigateToMyNotes = () => {
    navigate(TOPIC_SCREENS.MY_NOTES, data);
  };

  const navigateToVideos = () => {
    navigate(TOPIC_SCREENS.VIDEOS, data);
  };

  const navigateToArticleSnippets = () => {
    navigate(TOPIC_SCREENS.ARTICLE_SNIPPETS, data);
  };

  const navigateToCode = () => {
    navigate(TOPIC_SCREENS.CODE, data);
  };

  const navigateToImages = () => {
    navigate(TOPIC_SCREENS.IMAGES, data);
  };

  const navigateToDocuments = () => {
    navigate(TOPIC_SCREENS.DOCUMENTS, data);
  };

  return (
    <nav id="topic-navigation-bar">
      <p id="topic-header">{title}</p>
      <div id="topic-controls-container">
        <button className="btn topic-nav-btn" onClick={navigateToMyNotes}>
          <i className="fas fa-pen-square" /> My Notes
        </button>
        <button className="btn topic-nav-btn" onClick={navigateToVideos}>
          <i className="fab fa-youtube" /> Videos
        </button>
        <button
          className="btn topic-nav-btn"
          onClick={navigateToArticleSnippets}
        >
          <i className="fas fa-newspaper" /> Article Snippets
        </button>
        <button className="btn topic-nav-btn" onClick={navigateToCode}>
          <i className="fas fa-code" /> Code
        </button>
        <button className="btn topic-nav-btn" onClick={navigateToImages}>
          <i className="fas fa-images" /> Images
        </button>
        <button className="btn topic-nav-btn" onClick={navigateToDocuments}>
          <i className="fas fa-file-alt" /> Documents
        </button>
        <button className="btn topic-nav-btn" onClick={navigateToDocuments}>
          <i className="fas fa-bullseye" /> Exercises
        </button>
      </div>
    </nav>
  );
};
