import React from "react";
import { createUseStyles } from "react-jss";
import { deleteLink, setPublishStatusResource } from "../clib/api";
import {
  DELETE_RESOURCE,
  SET_LINKS,
  UPDATE_LINK,
  UPDATE_NOTE,
} from "../state/ActionTypes";
import { useStateValue } from "../state/StateProvider";
import { OptionsButton } from "./OptionsButton";
import PublishedBadge from "./PublishedBadge";

const useStyles = createUseStyles({
  documentTitle: {
    display: "block",
    fontSize: 16,
    marginTop: 12,
    marginBottom: 12,
  },
  documentSubTitle: {
    color: "gray",
    fontSize: 12,
    display: "block",
    marginBottom: 10,
  },
  linkContentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linkTitleAndFaviconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 6,
  },
  linkCard: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    width: "100%",
    backgroundColor: "#333333",
    color: "white",
    "& a": {
      "&:hover": {
        backgroundColor: "#333333 !important",
        color: "white",
      },
    },
  },
  linkImage: {
    marginRight: 8,
    border: "none",
  },
  linkOptionsContainer: {
    flex: 1,
    color: "#333",
  },
  sourceContainer: {
    textOverflow: "ellipsis",
    maxWidth: 400,
    /* Required for text-overflow to do anything */
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
});

type LinkCardProps = {
  favicon_source: string;
  title: string;
  source: string;
  id: number;
  topicId: number;
  published: boolean;
};

export const LinkCard = ({
  favicon_source,
  title,
  source,
  id,
  topicId,
  published,
}: LinkCardProps) => {
  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const onClick = () => {
    window.open(source, "blank");
  };

  const del = async () => {
    try {
      if (
        window.confirm(`Are you sure you want to delete this link "${title}"`)
      ) {
        await deleteLink(id);
        dispatch({
          type: DELETE_RESOURCE,
          payload: { resourceKey: `link_${id}`, topicId },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unpublish = async ({ id }: any) => {
    try {
      const updatedLink = await setPublishStatusResource("links", id, false);
      dispatch({ type: UPDATE_LINK, payload: updatedLink });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const publish = async () => {
    try {
      const updatedLink = await setPublishStatusResource("links", id, true);
      dispatch({ type: UPDATE_LINK, payload: updatedLink });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const PUBLISHED_OPTIONS = [
    {
      title: "Unpublish",
      onClick: unpublish,
      icon: "fas fa-download",
    },
    { title: "Delete", onClick: del, icon: "fas fa-trash" },
  ];

  const UNPUBLISHED_OPTIONS = [
    { title: "Publish", onClick: publish, icon: "fas fa-upload" },
    { title: "Delete", onClick: del, icon: "fas fa-trash" },
  ];

  return (
    <div className="ph2 pv1">
      <div onClick={onClick} className={`card pointer ${classes.linkCard}`}>
        <div className={classes.linkContentContainer}>
          <div className={classes.linkTitleAndFaviconContainer}>
            <img
              className={classes.linkImage}
              src={favicon_source}
              height="25px"
              width="25px"
            />
            <h4 className={classes.documentTitle}>{title}</h4>
          </div>
          <div className={classes.linkOptionsContainer}>
            <OptionsButton
              options={published ? PUBLISHED_OPTIONS : UNPUBLISHED_OPTIONS}
            />
          </div>
        </div>
        <div className={classes.sourceContainer}>
          <span className={classes.documentSubTitle}>
            {published && (
              <PublishedBadge style={{ marginRight: 5, fontSize: 16 }} />
            )}
            {source}
          </span>
        </div>
      </div>
    </div>
  );
};
