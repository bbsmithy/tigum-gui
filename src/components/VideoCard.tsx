import React from "react";
import { truncated } from "../util/strings";

type VideoCardProps = {
  html: string;
  title: string;
  thumbnail_img: string;
  onClick: (video: any) => void;
};

export const VideoCard = (props: VideoCardProps) => {
  const onSelect = () => {
    props.onClick({ title: props.title, html: props.html });
  };

  const title = truncated(props.title, 40);

  return (
    <article
      className="br2 ba dark-gray b--black-10 mv3 w-100 w-50-m w-20-l mw dib ma3"
      onClick={onSelect}
    >
      <img src={props.thumbnail_img} className="db w-100 br2 br--top" />
      <div className="ph3-ns pv3-ns h3 ba b--black-10">
        <div className="dt w-100">
          <div className="dtc">
            <h2 className="f6 f5-ns mv0">{title}</h2>
          </div>
        </div>
      </div>
    </article>
  );
};
