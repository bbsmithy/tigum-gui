import React from "react";

type Props = {
  title: string;
  iframe: string;
};

export const VideoPlayer = (props: Props) => {
  console.log(props);
  return (
    <div className="center w-70 h-60 video-page-container">
      <h3>{props.title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe }}
        className="video-card-iframe-container"
      ></div>
    </div>
  );
};
