import logo from "../logo.png";
import React from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { useStateValue } from "../state/StateProvider";

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
  toggleModal: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({
  navigate,
  screen,
  toggleModal
}: SideBarProps) => {
  const onClickNewTopic = () => {
    toggleModal();
  };

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics }
  } = state;

  return (
    <div id="sidebar" className="z-2">
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
