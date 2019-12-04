import React from "react";
import { AllVideos, VideoPlayer } from "../screens/video-screens";
import { VideoPlayerProps } from "../types";
import { Topic } from "../client-lib/models";

export enum VIDEO_SCREENS {
  ALL_VIDEOS,
  VIDEO_PLAYER
}

type VideoRouterType = {
  screen: VIDEO_SCREENS;
  video: VideoPlayerProps;
  navigate: (screen: VIDEO_SCREENS, video: VideoPlayerProps) => void;
  setTopic: (topic: Topic) => void;
  topic: Topic;
};

export const VideoRouter = ({
  screen,
  video,
  navigate,
  setTopic,
  topic
}: VideoRouterType) => {
  switch (screen) {
    case VIDEO_SCREENS.ALL_VIDEOS:
      return (
        <AllVideos navigate={navigate} setTopic={setTopic} topic={topic} />
      );
    case VIDEO_SCREENS.VIDEO_PLAYER:
      return <VideoPlayer iframe={video.iframe} title={video.title} />;
    default:
      break;
  }
};
