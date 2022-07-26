import React, { useEffect, useRef, useState } from "react";
import MainTopicScreen from "../views/topic";
import { Topic } from "../clib/models";

export enum SCREENS {
  LINKS,
  ARTICLE_SNIPPETS,
  ALL_VIDEOS,
  ALL_NOTES,
  VIDEO_PLAYER,
  VIEW_NOTE,
  CODE,
  IMAGES,
  EXCERCISES,
  LOADING,
  NONE,
}

type RouterProps = {
  screen: SCREENS;
  topic: Topic;
};

export const MainRouter = ({ screen, topic }: RouterProps) => {
  switch (screen) {
    case SCREENS.VIDEO_PLAYER: {
      return <div>VIEW VIDEO</div>;
    }
    case SCREENS.VIEW_NOTE: {
      return <div>VIEW NOTE</div>;
    }
    default: {
      return <MainTopicScreen topic={topic} />;
    }
  }
};
