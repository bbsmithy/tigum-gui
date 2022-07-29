import React from "react";
import { getDate, truncated } from "../util";
import { createUseStyles } from "react-jss";
import PublishedBadge from "./PublishedBadge";
import { OptionsButton } from "./OptionsButton";
import { deleteVideo, setPublishStatusResource } from "../clib/api";
import { useStateValue } from "../state/StateProvider";
import { DELETE_RESOURCE, UPDATE_VIDEO } from "../state/ActionTypes";

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
};

const useStyles = createUseStyles({
  videoCardTitle: {
    marginTop: 16,
    fontSize: 15,
  },
  videoCardImage: {
    backgroundColor: "black",
    height: "100%",
  },
  videoCardTextContent: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    margin: "0px 13px 0px 13px",
    justifyContent: "center",
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

const VideoCard = (props: VideoCardProps) => {
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const onSelect = () => {
    props.onClick({ title: props.title, iframe: props.iframe, id: props.id });
  };

  const pub = async () => {
    try {
      const updatedNote = await setPublishStatusResource(
        "videos",
        props.id,
        true
      );
      dispatch({ type: UPDATE_VIDEO, payload: updatedNote });
    } catch (err) {
      console.log(err);
    }
  };

  const unpub = async () => {
    try {
      const updatedNote = await setPublishStatusResource(
        "videos",
        props.id,
        false
      );
      dispatch({ type: UPDATE_VIDEO, payload: updatedNote });
    } catch (err) {
      console.log(err);
    }
  };

  const del = async () => {
    try {
      await deleteVideo(props.id);
      dispatch({
        type: DELETE_RESOURCE,
        payload: { topicId: props.topicId, resourceKey: `video_${props.id}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const PUBLISHED_OPTIONS = [
    {
      title: "Unpublish",
      onClick: unpub,
      icon: "fas fa-download",
    },
    { title: "Delete", onClick: del, icon: "fas fa-trash" },
  ];

  const UNPUBLISHED_OPTIONS = [
    { title: "Publish", onClick: pub, icon: "fas fa-upload" },
    { title: "Delete", onClick: del, icon: "fas fa-trash" },
  ];

  const title = truncated(props.title, 100);

  return (
    <div className="ph2 pv1">
      <div
        style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
        className="br2 video-card w-100 pointer"
        onClick={onSelect}
      >
        <div style={{ flex: 1, height: 130 }}>
          <img
            src={props.thumbnail_img}
            className={`${classes.videoCardImage}`}
          />
        </div>
        <div className={classes.videoCardTextContent}>
          <div style={{ flex: 5 }}>
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
              <div className={`${classes.subTitle} white`}>
                {props.date_updated}
              </div>
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
      </div>
    </div>
  );
};

export default VideoCard;
