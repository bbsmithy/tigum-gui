import React from 'react';
import {
  ArticleSnippets,
  Code,
  Images,
  Links,
  Loading,
  Excercises,
} from '../views/topic';
import { AllNotes, ViewNote } from '../views/note';
import { AllVideos, VideoPlayer } from '../views/video';
import { Topic } from '../clib/models';

export enum SCREENS {
  ALL_NOTES,
  VIEW_NOTE,
  ALL_VIDEOS,
  VIDEO_PLAYER,
  ARTICLE_SNIPPETS,
  LINKS,
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
    case SCREENS.ALL_NOTES:
      return <AllNotes />;
    case SCREENS.VIEW_NOTE:
      return <ViewNote />;
    case SCREENS.VIDEO_PLAYER:
      return <VideoPlayer topic={topic} />;
    case SCREENS.ALL_VIDEOS:
      return <AllVideos topic={topic} />;
    case SCREENS.ARTICLE_SNIPPETS:
      return <ArticleSnippets topic={topic} />;
    case SCREENS.CODE:
      return <Code topic={topic} />;
    case SCREENS.IMAGES:
      return <Images topic={topic} />;
    case SCREENS.LINKS:
      return <Links topic={topic} />;
    case SCREENS.EXCERCISES:
      return <Excercises />;
    case SCREENS.LOADING:
      return <Loading topic={topic} />;
    default:
      return <div>Howya</div>;
  }
};
