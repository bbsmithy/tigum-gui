import React, { useState } from "react";
import { TopicItem, Topic } from "./TopicItem";

interface TopicsListProps {
  topics: Array<Topic>;
}

export const TopicsList = ({ topics }: TopicsListProps) => {
  const [selectedId, setSelected] = useState(0);

  return (
    <div style={{ overflow: "scroll", height: "100%" }}>
      {topics.map((topic, index) => (
        <TopicItem
          topic={topic}
          selected={selectedId === index}
          id={index}
          onSelectItem={setSelected}
        />
      ))}
    </div>
  );
};
