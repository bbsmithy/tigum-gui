import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopicList = ({
  topics,
  onSelectTopic,
}: {
  topics: any[];
  onSelectTopic: (topic: any) => void;
  classes: any;
}) => {
  const navigate = useNavigate();

  const currentTopicId = window.location.pathname.split("/")[3];

  const findIntialTopic = (topicId: any, topics: any[]) => {
    return topics.find((t) => t.id == topicId);
  };

  const navigateToTopic = (topic: any) => {
    const currentUrlPath = window.location.pathname.split("/");
    const newLink = `/${currentUrlPath[1]}/${currentUrlPath[2]}/${topic.id}/${currentUrlPath[4]}`;
    navigate(newLink);
    onSelectTopic(topic);
  };

  return (
    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
      <i className="fa-solid fa-book-open-cover"></i>
      <div
        style={{
          color: "#d0d0d0",
          padding: 4,
          marginTop: 10,
          marginBottom: 1,
          fontSize: 15,
        }}
      >
        📚 Topics
      </div>
      {topics.map((topic) => {
        const isSelected = topic.id == currentTopicId;
        return (
          <div
            onClick={() => {
              onSelectTopic(topic);
            }}
            style={{
              cursor: "pointer",
              padding: 7,
              margin: "7px 0px",
              color: isSelected ? "white" : "#F8F0E3",
              borderRadius: 5,
              backgroundColor: isSelected ? "rgb(36, 107, 248)" : "#333",
              boxShadow:
                "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);",
            }}
          >
            {topic.title}
          </div>
        );
      })}
    </div>
  );
};

export default TopicList;
