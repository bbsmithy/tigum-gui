import React from "react";

type ImageCardProps = {
  src: string;
  origin: string;
};

export const ImageCard = (props: ImageCardProps) => {
  return (
    <article className="center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
      <div className="pa3">
        <img src={props.src} />
        <p>{props.origin}</p>
      </div>
    </article>
  );
};
