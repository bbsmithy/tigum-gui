import React, { useState } from "react";
import { TopicItem, Topic } from "./TopicItem";
import { TOPIC_SCREENS } from "../routers/TopicRouter";

interface TopicsListProps {
  topics: Array<Topic>;
  screen: TOPIC_SCREENS;
  navigate: (screen: TOPIC_SCREENS, data: object) => void;
  loading: boolean;
}

export const TopicsList = ({ topics, screen, navigate, loading }: TopicsListProps) => {
  const [selectedId, setSelected] = useState();

  const selectTopicItem = (id: number, topic: Topic) => {
    setSelected(id);
    navigate(screen, topic);
  };

  const renderLoading = () => {
    return "Loading"
  }

  return (
    <React.Fragment>
      {loading && renderLoading()}
      {!loading && topics.map((topic, index) => (
        <TopicItem
          topic={topic}
          selected={selectedId === index}
          id={index}
          onSelectItem={selectTopicItem}
        />
      ))}
    </React.Fragment>
  );
};
