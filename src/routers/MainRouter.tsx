import React from 'react';
import { ArticleSnippets, Links, Loading } from '../views/topic';
import { AllNotes, ViewNote } from '../views/note';
import { AllVideos, VideoPlayer } from '../views/video';
import { Topic } from '../clib/models';

export enum SCREENS {
  ALL_NOTES,
  ALL_VIDEOS,
  ARTICLE_SNIPPETS,
  LINKS,
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
    case SCREENS.ALL_NOTES:
      return <AllNotes />;
    case SCREENS.VIEW_NOTE:
      return <ViewNote />;
    case SCREENS.VIDEO_PLAYER:
      return <VideoPlayer />;
    case SCREENS.ALL_VIDEOS:
      return <AllVideos />;
    case SCREENS.ARTICLE_SNIPPETS:
      return <ArticleSnippets />;
    case SCREENS.LINKS:
      return <Links topic={topic} />;
    case SCREENS.LOADING:
      return <Loading topic={topic} />;
    default:
      return <div>Howya</div>;
  }
};
