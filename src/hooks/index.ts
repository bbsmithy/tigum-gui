import React, { useState } from 'react';
import { Video } from '../clib/models';

export const useReactPath = () => {
  const [path, setPath] = React.useState(window.location.pathname);
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    window.addEventListener('locationChange', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
      window.removeEventListener('locationChange', listenToPopstate);
    };
  }, []);
  return path;
};

export const useYTPlayer = (id, video: Video) => {
  const [player, setPlayer] = useState()
  React.useEffect(() => {
    if (video.iframe) {
      const videoId = video.iframe.slice(30)
      // @ts-ignore
      setPlayer(new window.YT.Player(id, {
        height: '390',
        width: '640',
        videoId
      }))
    }
  }, [id, video])

  return player
}