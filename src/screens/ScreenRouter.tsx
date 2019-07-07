import React from "react";
import { CreateNewTopic } from "./CreateNewTopic";
import { TopicScreen } from "./TopicScreen";
import { Topic } from "../sidebar-navigator/TopicItem";

export enum SCREENS {
  CREATE_NEW_TOPIC,
  TOPIC,
  NONE
}

type ScreenType = {
  screen: SCREENS;
  data: object;
};

export const ScreenRouter = ({ screen, data }: ScreenType) => {
  switch (screen) {
    case SCREENS.CREATE_NEW_TOPIC:
      return <CreateNewTopic />;
    case SCREENS.TOPIC:
      const topic = data as Topic;
      return <TopicScreen data={topic} />;
    default:
      return <div>Howya</div>;
  }
};
