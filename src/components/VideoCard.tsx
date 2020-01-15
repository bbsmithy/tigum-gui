import React from "react";
import { truncated } from "../util/strings";
import { OptionsButton } from "./OptionsButton";
import { deleteVideo } from "../client-lib/api";

type VideoCardProps = {
  iframe: string;
  title: string;
  thumbnail_img: string;
  id: number;
  index: number;
  onClick: (video: any) => void;
  onDelete: (index: number) => void;
};

export const VideoCard = (props: VideoCardProps) => {
  const onSelect = () => {
    props.onClick({ title: props.title, iframe: props.iframe });
  };

  const onClickDelete = async () => {
    try {
      await deleteVideo(props.id);
      props.onDelete(props.index);
    } catch (e) {
      console.log(e);
    }
  };

  const videoCardOptions = [
    {
      title: "Delete",
      icon: "fas fa-trash",
      onClick: onClickDelete
    }
  ];

  const title = truncated(props.title, 50);

  return (
    <article
      className="br2 mv3 mw dib video-card ma3 pointer"
      onClick={onSelect}
    >
      <img src={props.thumbnail_img} className="db w-100 br2 br--top" />
      <div className="ph3-ns pv3-ns h-30">
        <div className="dib w-90">
          <h2 className="f3 f5-ns mv0 text">{title}</h2>
        </div>
        <div className="dib w-10">
          <OptionsButton options={videoCardOptions} />
        </div>
      </div>
    </article>
  );
};
