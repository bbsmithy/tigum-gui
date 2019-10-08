import React from "react";

type Props = {
  title: string;
  html: string;
};

export const VideoPlayer = (props: Props) => {
  return (
    <div className="center w-70 h-60 video-player">
      <h3>{props.title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: props.html }}
        className="video-card-iframe-container"
      ></div>
    </div>
  );
};
