import React, { useState } from "react";
import { TopicItem, Topic } from "./TopicItem";
import { TOPIC_SCREENS } from "../routers/TopicRouter";

interface TopicsListProps {
  topics: Array<Topic>;
  screen: TOPIC_SCREENS;
  navigate: (screen: TOPIC_SCREENS, data: object) => void;
}

export const TopicsList = ({ topics, screen, navigate }: TopicsListProps) => {
  const [selectedId, setSelected] = useState();

  const selectTopicItem = (id: number, topic: Topic) => {
    setSelected(id);
    navigate(screen, topic);
  };

  return (
    <React.Fragment>
      {console.log(topics)}
      {topics.map((topic, index) => (
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
