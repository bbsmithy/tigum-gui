import React, { useState } from "react";
import { TopicItem, Topic } from "./TopicItem";
import { SCREENS } from "../screens/ScreenRouter";

interface TopicsListProps {
  topics: Array<Topic>;
  navigate: (screen: SCREENS, data: object) => void;
}

export const TopicsList = ({ topics, navigate }: TopicsListProps) => {
  const [selectedId, setSelected] = useState(0);

  const selectTopicItem = (id: number, topic: Topic) => {
    setSelected(id);
    navigate(SCREENS.TOPIC, topic);
  };

  return (
    <div style={{ overflow: "scroll", height: "100%" }}>
      {topics.map((topic, index) => (
        <TopicItem
          topic={topic}
          selected={selectedId === index}
          id={index}
          onSelectItem={selectTopicItem}
        />
      ))}
    </div>
  );
};
