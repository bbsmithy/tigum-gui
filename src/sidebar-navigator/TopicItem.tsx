import React from "react";
import { getDate } from "../util/date";
import { goto } from "../navigation";

export type Topic = {
  title: string;
  date_created: string;
  topic_id: number;
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
    goto(`topic/${id}`);
    onSelectItem(id, topic);
  };

  const renderDate = () => {
    const dateText = new Date(topic.date_created);
    return getDate(dateText);
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
      <i className="topic-item-date">{renderDate()}</i>
    </div>
  );
};
