import React from "react";
import { CreateNewTopic } from "../screens/main-screens/CreateNewTopic";
import {
  MyNotes,
  Videos,
  ArticleSnippets,
  Code,
  Images,
  Documents
} from "../screens/topic-screens/";
import { Topic } from "../sidebar-navigator/TopicItem";

export enum TOPIC_SCREENS {
  MY_NOTES,
  VIDEOS,
  ARTICLE_SNIPPETS,
  CODE,
  IMAGES,
  DOCUMENTS,
  NONE
}

type TopicRouterType = {
  screen: TOPIC_SCREENS;
  data: Topic;
  navigate: (screen: TOPIC_SCREENS, data: any) => void;
};

export const TopicRouter = ({ screen, data, navigate }: TopicRouterType) => {
  switch (screen) {
    case TOPIC_SCREENS.MY_NOTES:
      return <MyNotes data={data} />;
    case TOPIC_SCREENS.VIDEOS:
      return <Videos data={data} />;
    case TOPIC_SCREENS.ARTICLE_SNIPPETS:
      return <ArticleSnippets data={data} />;
    case TOPIC_SCREENS.CODE:
      return <Code data={data} />;
    case TOPIC_SCREENS.IMAGES:
      return <Images data={data} />;
    case TOPIC_SCREENS.DOCUMENTS:
      return <Documents data={data} />;
    default:
      return <div>Howya</div>;
  }
};
