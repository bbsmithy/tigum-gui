import React from "react";
import { Topic } from "../sidebar-navigator/TopicItem";

interface TopicProps {
  data: Topic;
}

export const TopicScreen = ({ data }: TopicProps) => {
  return (
    <div id="topic-screen-container">
      <h1>{data.name}</h1>
    </div>
  );
};
