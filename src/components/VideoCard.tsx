import React from "react";
import { truncated } from "../util/strings";
import { OptionsButton } from "./OptionsButton";
import { deleteResource } from "../client-lib";

type VideoCardProps = {
  html: string;
  title: string;
  thumbnail_img: string;
  resource_id: number;
  index: number;
  onClick: (video: any) => void;
  onDelete: (index: number) => void;
};

export const VideoCard = (props: VideoCardProps) => {
  const onSelect = () => {
    props.onClick({ title: props.title, html: props.html });
  };

  const deleteVideo = async () => {
    try {
      await deleteResource(props.resource_id);
      props.onDelete(props.index);
    } catch (e) {
      console.log(e);
    }
  };

  const videoCardOptions = [
    {
      title: "Delete",
      icon: "fas fa-trash",
      onClick: deleteVideo
    }
  ];

  const title = truncated(props.title, 50);

  return (
    <article
      className="br2 ba dark-gray b--black-10 mv3 w-100 w-50-m w-20-l mw dib ma3"
      onClick={onSelect}
    >
      <img src={props.thumbnail_img} className="db w-100 br2 br--top" />
      <div className="ph3-ns pv3-ns h-30 ba b--black-10">
        <div className="dib w-90">
          <h2 className="f3 f5-ns mv0">{title}</h2>
        </div>
        <div className="dib w-10">
          <OptionsButton options={videoCardOptions} />
        </div>
      </div>
    </article>
  );
};
