import React, { useState, useEffect } from 'react';
import { VideoRouter, VIDEO_SCREENS } from '../../routers/VideoRouter';
import { VideoPlayerProps } from '../../types';
import { useStateValue } from '../../state/StateProvider';

export const Videos = (props: any) => {
  const [screen, setScreen] = useState(VIDEO_SCREENS.ALL_VIDEOS);
  const [video, setVideo] = useState();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { selectedResourceId, videos },
  } = state;

  useEffect(() => {
    console.log(selectedResourceId, videos.keys, videos.data);
    // const vidResource = videos.find((vid) => vid.id === selectedResourceId);
    // console.log(vidResource);
    // console.log('SELECTED RESOURCE', selectedResourceId);
  }, [selectedResourceId, videos]);

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
