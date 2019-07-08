import React from "react";
import { TopicNavigationBar } from "../topic-navigation-bar";
import { ScreenRouter } from "../screens/ScreenRouter";

export const MainContent = (props: any) => {
  return (
    <div id="main-content">
      <TopicNavigationBar title={props.title} />
      <ScreenRouter screen={props.screen} data={props.data} />
    </div>
  );
};
