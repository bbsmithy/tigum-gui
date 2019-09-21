import React from "react";

type VideoCardProps = {
  html: string;
  title: string;
  thumbnail_img: string;
};

export const VideoCard = (props: VideoCardProps) => {
  return (
    <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-20-l mw dib ma3">
      <img
        src={props.thumbnail_img}
        className="db w-100 br2 br--top"
        alt="Photo of a kitten looking menacing."
      />
      <div className="pa2 ph3-ns pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{props.title}</h1>
          </div>
        </div>
      </div>
    </article>
  );
};
