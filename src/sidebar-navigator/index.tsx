import logo from "../logo.png";
import React, { useEffect, useState } from "react";
import { NoTopicsMessage } from "./NoTopicsMessage";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { TopicsList } from "./TopicsList";
import { Topic } from "./TopicItem";

interface SideBarProps {
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
  screen: TOPIC_SCREENS;
}

interface TopicsState {
  loading: boolean;
  data: any[];
}

export const SideBar: React.FC<SideBarProps> = ({
  navigate,
  screen
}: SideBarProps) => {
  const [topics, setTopics] = useState<TopicsState>({
    loading: true,
    data: []
  });

  const onClickNewTopic = () => {
    navigate(TOPIC_SCREENS.VIDEOS, {});
  };

  useEffect(() => {
    const fetchTopics = async () => {
      const result = await fetch("http://localhost:8000/topics");
      result.json().then(topics => {
        let topicsData: any[] = Array.isArray(topics) ? topics : [topics];
        setTopics({ loading: false, data: topicsData });
      });
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
        {topics.data.length && !topics.loading && (
          <TopicsList
            topics={topics.data}
            screen={screen}
            navigate={navigate}
          />
        )}
        {topics.data.length === 0 && !topics.loading && <NoTopicsMessage />}
      </div>
    </div>
  );
};
