import React, { useState } from "react";
import { VideoRouter, VIDEO_SCREENS } from "../../routers/VideoRouter";
import { VideoPlayerProps } from "../../types";

export const Videos = (props: any) => {
  const [screen, setScreen] = useState(VIDEO_SCREENS.ALL_VIDEOS);
  const [video, setVideo] = useState();

  const navigate = (screen: VIDEO_SCREENS, video: VideoPlayerProps) => {
    setScreen(screen);
    setVideo(video);
  };

  return (
    <VideoRouter
      screen={screen}
      navigate={navigate}
      video={video}
      topic={props.topic}
    />
  );
};
