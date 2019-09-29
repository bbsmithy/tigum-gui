import React from "react";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import "./styles.css";

interface TopicNavigationBarProps {
  title: string;
  topic: any;
  navigate: (screen: TOPIC_SCREENS, topic: any) => void;
}

export const TopicNavigationBar = ({
  title,
  topic,
  navigate
}: TopicNavigationBarProps) => {
  const navigateToMyNotes = () => {
    navigate(TOPIC_SCREENS.MY_NOTES, topic);
  };

  const navigateToVideos = () => {
    navigate(TOPIC_SCREENS.VIDEOS, topic);
  };

  const navigateToArticleSnippets = () => {
    navigate(TOPIC_SCREENS.ARTICLE_SNIPPETS, topic);
  };

  const navigateToCode = () => {
    navigate(TOPIC_SCREENS.CODE, topic);
  };

  const navigateToImages = () => {
    navigate(TOPIC_SCREENS.IMAGES, topic);
  };

  const navigateToDocuments = () => {
    navigate(TOPIC_SCREENS.DOCUMENTS, topic);
  };

  const navigateToExcercises = () => {
    navigate(TOPIC_SCREENS.EXCERCISES, topic);
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
        <button className="btn topic-nav-btn" onClick={navigateToExcercises}>
          <i className="fas fa-bullseye" /> Exercises
        </button>
      </div>
    </nav>
  );
};
