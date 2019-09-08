import logo from "../logo.png";
import React, { useEffect, useState } from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { getTopics } from "../client-lib/";

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
  toggleModal: () => void;
}

interface TopicsState {
  loading: boolean;
  data: any[];
}

export const SideBar: React.FC<SideBarProps> = ({
  navigate,
  screen,
  toggleModal
}: SideBarProps) => {
  const [topics, setTopics] = useState<TopicsState>({
    loading: true,
    data: []
  });

  const onClickNewTopic = () => {
    toggleModal();
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await getTopics([]);
      setTopics({ loading: false, data: topics });
    };

    fetchTopics();
  }, []);

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
        <TopicsList
          topics={topics.data}
          loading={topics.loading}
          screen={screen}
          navigate={navigate}
        />
        {topics.data.length === 0 && !topics.loading && <NoTopicsMessage />}
      </div>
      <div id="sidebar-search-mentors-container">
        <div className="display-inline" id="search-button">
          Search
        </div>
        <div className="display-inline" id="mentors-button">
          Mentors
        </div>
      </div>
    </div>
  );
};
