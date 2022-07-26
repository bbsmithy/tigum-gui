import React, { useEffect, useRef, useState } from "react";
import MainTopicScreen from "../views/topic";
import { Topic } from "../clib/models";
import { ViewNote } from "../views/note";
import { VideoPlayer } from "../views/video";

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
      return <VideoPlayer />;
    }
    case SCREENS.VIEW_NOTE: {
      return <ViewNote />;
    }
    default: {
      return <MainTopicScreen topic={topic} />;
    }
  }
};
