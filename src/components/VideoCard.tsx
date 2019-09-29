import React from "react";

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

  const turncatedTitle = () => {
    if (props.title.length > 40) {
      const shortTitle = props.title.slice(0, 40);
      return `${shortTitle}...`;
    }
    return props.title;
  };

  return (
    <article
      className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-20-l mw dib ma3"
      onClick={onSelect}
    >
      <img src={props.thumbnail_img} className="db w-100 br2 br--top" />
      <div className="pa2 ph3-ns pv3-ns h4">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h2 className="f6 f4-ns mv0">{turncatedTitle()}</h2>
          </div>
        </div>
      </div>
    </article>
  );
};
