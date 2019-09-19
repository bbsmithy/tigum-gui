import React from "react";

type VideoCardProps = {
  html: string;
  title: string;
};

export const VideoCard = (props: VideoCardProps) => {
  return (
    <div className="video-card">
      <div
        dangerouslySetInnerHTML={{ __html: props.html }}
        className="video-card-iframe-container"
      ></div>
      <h3>{props.title}</h3>
    </div>
  );
};
