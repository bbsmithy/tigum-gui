import React from "react";
import {
  MyNotes,
  Videos,
  ArticleSnippets,
  Code,
  Images,
  Documents,
  Loading,
  Excercises
} from "../screens/topic-screens/";
import { Topic } from "../client-lib/models";

export enum TOPIC_SCREENS {
  MY_NOTES,
  VIDEOS,
  ARTICLE_SNIPPETS,
  CODE,
  IMAGES,
  DOCUMENTS,
  EXCERCISES,
  LOADING,
  NONE
}

type TopicRouterType = {
  screen: TOPIC_SCREENS;
  topic: Topic;
};

export const TopicRouter = ({ screen, topic }: TopicRouterType) => {
  switch (screen) {
    case TOPIC_SCREENS.MY_NOTES:
      return <MyNotes topic={topic} />;
    case TOPIC_SCREENS.VIDEOS:
      return <Videos topic={topic} />;
    case TOPIC_SCREENS.ARTICLE_SNIPPETS:
      return <ArticleSnippets topic={topic} />;
    case TOPIC_SCREENS.CODE:
      return <Code topic={topic} />;
    case TOPIC_SCREENS.IMAGES:
      return <Images topic={topic} />;
    case TOPIC_SCREENS.DOCUMENTS:
      return <Documents topic={topic} />;
    case TOPIC_SCREENS.EXCERCISES:
      return <Excercises />;
    case TOPIC_SCREENS.LOADING:
      return <Loading topic={topic} />;
    default:
      return <div>Howya</div>;
  }
};
