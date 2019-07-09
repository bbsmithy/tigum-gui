import React from "react";
import { TopicNavigationBar } from "../topic-navigation-bar";
import { TopicRouter } from "../routers/TopicRouter";

export const MainContent = (props: any) => {
  const topicNavigate = () => {};

  return (
    <div id="main-content">
      <TopicNavigationBar
        title={props.title}
        navigate={props.navigate}
        data={props.data}
      />
      <TopicRouter
        screen={props.screen}
        data={props.data}
        navigate={props.navigate}
      />
    </div>
  );
};
