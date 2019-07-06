import React from "react";
import { TopicItem, Topic } from "./TopicItem";

interface TopicsListProps {
  topics: Array<Topic>;
}

export const TopicsList = ({ topics }: TopicsListProps) => {
  return (
    <div>
      {topics.map(topic => (
        <TopicItem topic={topic} />
      ))}
    </div>
  );
};
