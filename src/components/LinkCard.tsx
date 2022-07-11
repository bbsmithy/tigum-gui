import React from "react";
import { createUseStyles } from "react-jss";
import { deleteLink, setPublishStatusResource } from "../clib/api";
import { deleteLinkAction } from "../state/Actions";
import { SET_LINKS, UPDATE_NOTE } from "../state/ActionTypes";
import { useStateValue } from "../state/StateProvider";
import { OptionsButton } from "./OptionsButton";
import PublishedBadge from "./PublishedBadge";

const useStyles = createUseStyles({
  documentTitle: {
    display: "block",
    fontSize: 16,
    textOverflow: "ellipsis",
    /* Required for text-overflow to do anything */
    whiteSpace: "nowrap",
    overflow: "hidden",
    "@media (max-width: 1196px)": {
      fontSize: 14,
    },
  },
  documentSubTitle: {
    color: "gray",
    fontSize: 12,
    display: "block",
    marginBottom: 10,
  },
});

export const LinkCard = (props: any) => {
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const onClick = () => {
    window.open(props.link.source, "blank");
  };

  const del = async () => {
    try {
      const reply = window.confirm(
        `Are you sure you want to delete this link "${props.link.title}"`
      );
      if (reply) {
        await deleteLink(props.link.id);
        const newLinksList = state.content.links;
        delete newLinksList[props.index];
        dispatch({ type: SET_LINKS, payload: newLinksList });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unpublish = async () => {
    try {
      const updatedNote = await setPublishStatusResource(
        "links",
        props.link.id,
        false
      );
      dispatch({ type: UPDATE_NOTE, payload: updatedNote });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const publish = async () => {
    try {
      const updatedNote = await setPublishStatusResource(
        "links",
        props.link.id,
        true
      );
      dispatch({ type: UPDATE_NOTE, payload: updatedNote });
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
    <div className="fl w-100 w-50-m w-33-l ph2 pv1">
      <div onClick={onClick} className="card link-card pointer w-100">
        <div className="mw9 center">
          <div className="cf ph2-ns">
            <div className="fl ph2 w-100 pv1">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    flex: 19,
                  }}
                >
                  <img
                    src={props.link.favicon_source}
                    style={{ display: "inline", marginRight: 8 }}
                    height="25px"
                    width="25px"
                  />
                  <h4 className={classes.documentTitle}>{props.link.title}</h4>
                </div>
                <div style={{ flex: 1, color: "#333" }}>
                  <OptionsButton
                    options={
                      props.link.published
                        ? PUBLISHED_OPTIONS
                        : UNPUBLISHED_OPTIONS
                    }
                  />
                </div>
              </div>
              <div
                style={{
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "90%",
                }}
              >
                <span className={classes.documentSubTitle}>
                  {props.link.published && (
                    <PublishedBadge style={{ marginRight: 5, fontSize: 16 }} />
                  )}
                  {props.link.source}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
