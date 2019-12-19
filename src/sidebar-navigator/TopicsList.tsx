import React, { useState, useEffect } from "react";
import { TopicItem } from "./TopicItem";
import { Topic } from "../client-lib/models";
import { TOPIC_SCREENS } from "../routers/TopicRouter";
import { useStateValue } from "../state/StateProvider";

interface TopicsListProps {
  screen: TOPIC_SCREENS;
  navigate: (screen: TOPIC_SCREENS, topicId: number) => void;
}

export const TopicsList = ({ screen, navigate }: TopicsListProps) => {
  const [selectedId, setSelected] = useState(0);

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics }
  } = state;

  const selectTopicItem = (id: number, topic: Topic) => {
    setSelected(id);
    navigate(screen, topic.id);
  };

  const renderLoading = () => {
    return "Loading";
  };

  return (
    <div id="topics-list-container">
      {topics.loading && renderLoading()}
      {!topics.loading &&
        topics.keys.map((topicId, index) => (
          <TopicItem
            topic={topics.data[topicId]}
            key={topics.data[topicId].id}
            selected={selectedId === index}
            id={index}
            onSelectItem={selectTopicItem}
          />
        ))}
    </div>
  );
};
