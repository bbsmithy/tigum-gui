import React from "react";

export type Topic = {
  title: string;
  date_created: string;
  content: string;
};

interface TopicItemProps {
  topic: Topic;
  selected: boolean;
  id: number;
  onSelectItem: (id: number, topic: Topic) => void;
}

export const TopicItem = ({
  topic,
  selected,
  id,
  onSelectItem
}: TopicItemProps) => {
  const onSelect = () => {
    onSelectItem(id, topic);
  };

  return (
    <div
      className={`topic-item-container ${
        selected ? "topic-item-container-selected" : ""
      }`}
      onClick={onSelect}
    >
      <div className="topic-item-name-container">
        <span className="topic-item-name">{topic.title}</span>
      </div>
      <i className="topic-item-date">{topic.date_created}</i>
    </div>
  );
};
