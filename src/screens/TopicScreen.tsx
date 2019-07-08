import React from "react";
import { Topic } from "../sidebar-navigator/TopicItem";

interface TopicProps {
  data: Topic;
}

export const TopicScreen = ({ data }: TopicProps) => {
  return (
    <div id="topic-screen-container">
      <p>{data.content}</p>
    </div>
  );
};
