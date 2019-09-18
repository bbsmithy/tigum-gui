import React from "react";
import { TopicNavigationBar } from "../topic-navigation-bar";
import { TopicRouter } from "../routers/TopicRouter";

export const MainContent = (props: any) => {
  const renderTopicViewer = () => {
    if (props.topic) {
      return (
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
    } else {
      return <h3>No topics</h3>;
    }
  };

  const renderLoading = () => {
    return <h3>Loading</h3>;
  };

  return (
    <div id="main-content">
      {console.log(props.loading)}
      {props.loading ? renderLoading() : renderTopicViewer()}
    </div>
  );
};
