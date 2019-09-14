import React from "react";
import { TopicNavigationBar } from "../topic-navigation-bar";
import { TopicRouter } from "../routers/TopicRouter";

export const MainContent = (props: any) => {
  const renderTopicViewer = () => (
    <>
      <TopicNavigationBar
        title={props.topic.title}
        navigate={props.navigate}
        topic={props.topic}
      />
      <TopicRouter
        screen={props.screen}
        topic={props.topic}
        setTopic={props.setTopic}
        navigate={props.navigate}
      />
    </>
  );

  const renderLoading = () => {
    return <h3>Loading</h3>;
  };

  return (
    <div id="main-content">
      {props.topic ? renderTopicViewer() : renderLoading()}
    </div>
  );
};
