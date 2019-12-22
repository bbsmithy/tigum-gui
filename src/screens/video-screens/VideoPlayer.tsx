import React from "react";
import { VIDEO_SCREENS } from "../../routers/VideoRouter";

export const VideoPlayer = (props: any) => {
  const goBack = () => {
    props.navigate(VIDEO_SCREENS.ALL_VIDEOS, {});
  };

  return (
    <div className="center w-70 h-60 video-page-container">
      <span className="btn-note dib" onClick={goBack}>
        <i className="fa fa-arrow-left" />
      </span>
      <h3 className="dib">{props.title}</h3>
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe }}
        className="video-card-iframe-container"
      ></div>
    </div>
  );
};
