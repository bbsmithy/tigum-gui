import React, { useEffect, useRef } from "react";
import { Video } from "../clib/models";

export const useReactPath = () => {
  const [path, setPath] = React.useState(window.location.pathname);
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
  };
  React.useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    window.addEventListener("locationChange", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
      window.removeEventListener("locationChange", listenToPopstate);
    };
  }, []);
  return path;
};

export const useYoutubeVideoPlayer = (
  iframeUrl: string,
  iframeContainerId: string
) => {
  const vidIDRef = useRef<string>("");
  const playerRef = useRef<string>("");
  useEffect(() => {
    if (iframeUrl) {
      const videoId = iframeUrl.split("?")[0].slice(30);
      alert(videoId)
      // @ts-ignore
      playerRef.current = new window.YT.Player(iframeContainerId, {
        videoId,
        height: "90%",
        width: "100%",
      });
      vidIDRef.current = videoId;
    }
  }, [iframeUrl]);
  return { vidIDRef, playerRef };
};
