import React from "react";
import { getDate, truncated } from "../util";
import { createUseStyles } from "react-jss";
import PublishedBadge from "./PublishedBadge";
import { OptionsButton } from "./OptionsButton";

type VideoCardProps = {
  date_created: string;
  date_updated: string;
  iframe: string;
  title: string;
  thumbnail_img: string;
  id: number;
  topicId: number;
  index: number;
  published: boolean;
  onClick: (video: any) => void;
  onDelete: (id: number, topic_id: number) => void;
};

const useStyles = createUseStyles({
  videoCardTitle: {
    "@media (max-width: 1196px)": {
      justifyContent: "center",
      alignItem: "center",
    },
    "@media (min-width: 1196px)": {
      marginTop: 12,
      marginBottom: 0,
    },
    fontSize: 12,
  },
  videoCardImage: {
    backgroundColor: "black",
    height: "100%",
  },
  videoCardTextContent: {
    flex: 2,
    margin: "0px 10px 0px 10px",
    "@media (max-width: 1196px)": {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  subTitle: {
    color: "#bfbfbf",
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 10,
    textOverflow: "ellipsis",
    /* Required for text-overflow to do anything */
    whiteSpace: "nowrap",
    "@media (max-width: 1196px)": {
      display: "none",
    },
  },
});

const PUBLISHED_OPTIONS = [
  { title: "Unpublish", onClick: () => {}, icon: null },
  { title: "Delete", onClick: () => {}, icon: null },
];

const UNPUBLISHED_OPTIONS = [
  { title: "Unpublish", onClick: () => {}, icon: null },
  { title: "Delete", onClick: () => {}, icon: null },
];

const VideoCard = (props: any) => {
  const classes = useStyles();

  const onSelect = () => {
    props.onClick({ title: props.title, iframe: props.iframe, id: props.id });
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    alert("YEE");
  };

  const renderDate = () => {
    const dateText = new Date(props.date_updated);
    return getDate(dateText);
  };

  const title = truncated(props.title, 100);

  return (
    <div
      className="fl w-100 w-50-m w-33-l ph2 pv1"
      style={{ position: "relative" }}
    >
      <article
        style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
        className="br2 video-card w-100 pointer"
        onClick={onSelect}
        onContextMenu={onContextMenu}
      >
        <div style={{ flex: 1, height: 90 }}>
          <img
            src={props.thumbnail_img}
            className={`${classes.videoCardImage}`}
          />
        </div>
        <div className={classes.videoCardTextContent}>
          <h6 className={`white ${classes.videoCardTitle}`}>{title}</h6>
          <div style={{ display: "flex", marginTop: 10 }}>
            <div className={`${classes.subTitle} white`}>{renderDate()}</div>
            {props.published && <PublishedBadge />}
          </div>
        </div>
      </article>
      <div
        style={{
          position: "absolute",
          bottom: 15,
          right: 10,
        }}
      >
        <OptionsButton
          options={props.published ? PUBLISHED_OPTIONS : UNPUBLISHED_OPTIONS}
        />
      </div>
    </div>
  );
};

export default VideoCard;
