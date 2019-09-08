import React from "react";
import { TopicNavigationBar } from "../topic-navigation-bar";
import { TopicRouter } from "../routers/TopicRouter";

export const MainContent = (props: any) => {
  const renderTopicViewer = () => (
    <>
      <TopicNavigationBar
        title={props.data.title}
        navigate={props.navigate}
        data={props.data}
      />
      <TopicRouter
        screen={props.screen}
        data={props.data}
        navigate={props.navigate}
      />
    </>
  );

  const renderLoading = () => {
    return <h3>Loading</h3>;
  };

  return (
    <div id="main-content">
      {props.data ? renderTopicViewer() : renderLoading()}
    </div>
  );
};
