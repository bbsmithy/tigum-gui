import React, { useState } from "react";

export type Topic = {
  name: string;
  date: string;
};

interface TopicItemProps {
  topic: Topic;
}

export const TopicItem = ({ topic }: TopicItemProps) => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`topic-item-container ${
        selected ? "topic-item-container-selected" : ""
      }`}
      onClick={() => setSelected(!selected)}
    >
      <h3 className="topic-item-name">{topic.name}</h3>
      <i className="topic-item-date">{topic.date}</i>
    </div>
  );
};
