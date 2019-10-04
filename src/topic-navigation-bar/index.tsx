import React from "react";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { OptionsButton, Option } from "../components/OptionsButton";
import "./styles.css";

interface TopicNavigationBarProps {
  title: string;
  topic: any;
  navigate: (screen: TOPIC_SCREENS, topic: any) => void;
}

const topicMenuOptions: Array<Option> = [
  { title: "Delete", icon: "fas fa-trash", onClick: () => {} }
];

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
    <nav className="dt w-100 border-box ph3-ns bb b--light-gray">
      <div className="dtc w-25">
        <h2 id="topic-header">{title}</h2>
        <OptionsButton options={topicMenuOptions} />
      </div>
      <div className="dtc v-mid w-75 tr">
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToMyNotes}
        >
          <i className="fas fa-pen-square" /> My Notes
        </button>
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToVideos}
        >
          <i className="fab fa-youtube" /> Videos
        </button>
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToArticleSnippets}
        >
          <i className="fas fa-newspaper" /> Article Snippets
        </button>
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToCode}
        >
          <i className="fas fa-code" /> Code
        </button>
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToImages}
        >
          <i className="fas fa-images" /> Images
        </button>
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToDocuments}
        >
          <i className="fas fa-file-alt" /> Documents
        </button>
        <button
          className="btn topic-nav-btn f6 f5-ns dib mr3 mr4-ns"
          onClick={navigateToExcercises}
        >
          <i className="fas fa-bullseye" /> Excercises
        </button>
      </div>
    </nav>
  );
};
