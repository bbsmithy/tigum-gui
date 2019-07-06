import React from "react";

type topic = {
  name: string;
};

interface TopicsListProps {
  topics: Array<topic>;
}

export const TopicsList = ({ topics }: TopicsListProps) => {
  return (
    <div>
      {topics.map(({ name }: topic) => (
        <h3>{name}</h3>
      ))}
    </div>
  );
};
