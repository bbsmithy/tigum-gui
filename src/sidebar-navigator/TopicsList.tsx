import React, { useState, useEffect } from "react";
import { TopicItem } from "./TopicItem";
import { Topic } from "../client-lib/models";
import { TOPIC_SCREENS } from "../routers/TopicRouter";

interface TopicsListProps {
  topics: Array<Topic>;
  screen: TOPIC_SCREENS;
  navigate: (screen: TOPIC_SCREENS, data: object) => void;
  loading: boolean;
}

export const TopicsList = ({
  topics,
  screen,
  navigate,
  loading
}: TopicsListProps) => {
  const [selectedId, setSelected] = useState(0);

  const selectTopicItem = (id: number, topic: Topic) => {
    setSelected(id);
    navigate(screen, topic);
  };

  const renderLoading = () => {
    return "Loading";
  };

  return (
    <div id="topics-list-container">
      {loading && renderLoading()}
      {!loading &&
        topics.map((topic, index) => (
          <TopicItem
            topic={topic}
            key={topic.id}
            selected={selectedId === index}
            id={index}
            onSelectItem={selectTopicItem}
          />
        ))}
    </div>
  );
};
