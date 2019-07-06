import React, { useState } from "react";

export type Topic = {
  name: string;
  date: string;
};

interface TopicItemProps {
  topic: Topic;
  selected: boolean;
  id: number;
  onSelectItem: (id: number) => void;
}

export const TopicItem = ({
  topic,
  selected,
  id,
  onSelectItem
}: TopicItemProps) => {
  const onSelect = () => {
    onSelectItem(id);
  };

  return (
    <div
      className={`topic-item-container ${
        selected ? "topic-item-container-selected" : ""
      }`}
      onClick={onSelect}
    >
      <h3 className="topic-item-name">{topic.name}</h3>
      <i className="topic-item-date">{topic.date}</i>
    </div>
  );
};
