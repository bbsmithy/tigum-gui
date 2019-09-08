import React from "react";
import {
  MyNotes,
  Videos,
  ArticleSnippets,
  Code,
  Images,
  Documents,
  Loading
} from "../screens/topic-screens/";
import { Topic } from "../sidebar-navigator/TopicItem";

export enum TOPIC_SCREENS {
  MY_NOTES,
  VIDEOS,
  ARTICLE_SNIPPETS,
  CODE,
  IMAGES,
  DOCUMENTS,
  LOADING,
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
    case TOPIC_SCREENS.LOADING:
      return <Loading data={data} />;
    default:
      return <div>Howya</div>;
  }
};
