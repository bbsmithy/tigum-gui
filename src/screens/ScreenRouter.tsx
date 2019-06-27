import React from "react";
import { CreateNewTopic } from "./CreateNewTopic";

export enum SCREENS {
  CREATE_NEW_TOPIC,
  TOPIC
}

type ScreenType = {
  screen: SCREENS;
  data: object;
};

export const ScreenRouter = ({ screen, data }: ScreenType) => {
  switch (screen) {
    case SCREENS.CREATE_NEW_TOPIC:
      return <CreateNewTopic />;
    default:
      return <div>Howya</div>;
  }
};
