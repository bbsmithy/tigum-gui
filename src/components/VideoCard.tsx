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
    display: "flex",
    flexDirection: "column",
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
    textOverflow: "ellipsis",
    /* Required for text-overflow to do anything */
    whiteSpace: "nowrap",
    "@media (max-width: 1196px)": {
      display: "none",
    },
  },
});

const VideoCard = (props: any) => {
  const classes = useStyles();

  const onSelect = () => {
    props.onClick({ title: props.title, iframe: props.iframe, id: props.id });
  };

  const onContextMenu = (e) => {};

  const PUBLISHED_OPTIONS = [
    {
      title: "Unpublish",
      onClick: () => {},
      icon: "fas fa-download",
    },
    { title: "Delete", onClick: () => {}, icon: "fas fa-trash" },
  ];

  const UNPUBLISHED_OPTIONS = [
    { title: "Publish", onClick: () => {}, icon: "fas fa-upload" },
    { title: "Delete", onClick: () => {}, icon: "fas fa-trash" },
  ];

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
        <div style={{ flex: 1, height: 100 }}>
          <img
            src={props.thumbnail_img}
            className={`${classes.videoCardImage}`}
          />
        </div>
        <div className={classes.videoCardTextContent}>
          <div style={{ flex: 3 }}>
            <h6 className={`white ${classes.videoCardTitle}`}>
              {props.published && <PublishedBadge style={{ fontSize: 16 }} />}{" "}
              {title}
            </h6>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              flex: 3,
              alignItems: "center",
            }}
          >
            <div style={{ flex: 8, alignItems: "center" }}>
              <div className={`${classes.subTitle} white`}>{renderDate()}</div>
            </div>
            <div style={{ flex: 2, color: "#333" }}>
              <OptionsButton
                options={
                  props.published ? PUBLISHED_OPTIONS : UNPUBLISHED_OPTIONS
                }
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default VideoCard;
