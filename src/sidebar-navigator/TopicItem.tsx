import React from "react";
import { getDate } from "../util/date";
import { goto } from "../navigation";
import { Topic } from "../client-lib/models";

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
      className={`topic-item-container pointer ${
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
