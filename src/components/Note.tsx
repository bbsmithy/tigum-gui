import React, { useState } from "react";
import { getDate, goto } from "../util";
import { createUseStyles } from "react-jss";
import PublishedBadge from "./PublishedBadge";
import { OptionsButton } from "./OptionsButton";
import { deleteNote, setPublishStatusResource } from "../clib/api";
import { useStateValue } from "../state/StateProvider";
import {
  DELETE_NOTE,
  DELETE_RESOURCE,
  UPDATE_NOTE,
} from "../state/ActionTypes";

const useStyles = createUseStyles({
  noteCard: {
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    width: "100%",
    backgroundColor: "#333",
    color: "white",
  },
  noteTitle: {
    display: "block",
    fontSize: 18,
    textOverflow: "ellipsis",
    /* Required for text-overflow to do anything */
    whiteSpace: "nowrap",
    overflow: "hidden",
    "@media (max-width: 1196px)": {
      fontSize: 14,
    },
  },
  noteSubTitle: {
    color: "gray",
    fontSize: 12,
    fontStyle: "italic",
    display: "block",
    marginBottom: 10,
    marginRight: 12,
    textOverflow: "ellipsis",
    /* Required for text-overflow to do anything */
    whiteSpace: "nowrap",
  },
  noteInfoContainer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  noteTitleContainer: {
    flex: 6,
    width: 280,
  },
  optionsButtonContainer: {
    flex: 1,
    color: "#333",
  },
});

export const Note = ({ id, topicId, date_updated, title, published }) => {
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const navigateToNote = () => {
    goto(`${window.location.pathname}/${id}`);
  };

  const unpublish = async () => {
    try {
      const updatedNote = await setPublishStatusResource("notes", id, false);
      dispatch({ type: UPDATE_NOTE, payload: updatedNote });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const publish = async () => {
    try {
      const updatedNote = await setPublishStatusResource("notes", id, true);
      dispatch({ type: UPDATE_NOTE, payload: updatedNote });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const del = async () => {
    try {
      if (window.confirm(`Are you sure you want to delete "${title}"`)) {
        await deleteNote(id);
        dispatch({
          type: DELETE_RESOURCE,
          payload: { resourceKey: `note_${id}`, topicId },
        });
      }
    } catch (err) {
      console.log(err);
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
      <div
        className={`card pointer ${classes.noteCard}`}
        onClick={navigateToNote}
      >
        <div className={classes.noteInfoContainer}>
          <div className={classes.noteTitleContainer}>
            <h4 className={classes.noteTitle}>
              {published && <PublishedBadge />} 📝 {title}
            </h4>
            <div>
              <b className={classes.noteSubTitle}>{date_updated}</b>
            </div>
          </div>
          <div className={classes.optionsButtonContainer}>
            <OptionsButton
              options={published ? PUBLISHED_OPTIONS : UNPUBLISHED_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
