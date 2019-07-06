import React from "react";

export type Topic = {
  name: string;
  date: string;
};

interface TopicItemProps {
  topic: Topic;
}

export const TopicItem = ({ topic }: TopicItemProps) => {
  return (
    <div>
      <h3>{topic.name}</h3>
      <i>{topic.date}</i>
    </div>
  );
};
