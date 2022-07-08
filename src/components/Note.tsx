import React from "react";
import { getDate, goto } from "../util";
import { createUseStyles } from "react-jss";
import PublishedBadge from "./PublishedBadge";
import { OptionsButton } from "./OptionsButton";

const useStyles = createUseStyles({
  noteTitle: {
    display: "block",
    fontSize: 15,
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
    flex: 9,
    padding: "5px 15px",
    width: 280,
  },
  optionsButtonContainer: {
    flex: 2,
    color: "#333",
  },
});

export const Note = (props: any) => {
  const classes = useStyles();

  const navigateToNote = () => {
    goto(`${window.location.pathname}/${props.note.id}`);
  };

  const renderDate = () => {
    const dateText = new Date(props.note.date_updated);
    return getDate(dateText);
  };

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

  return (
    <div className="fl w-100 w-50-m w-33-l ph2 pv1">
      <div className="card w-100 note-card pointer" onClick={navigateToNote}>
        <div className="mw9 center">
          <div className={classes.noteInfoContainer}>
            <div className={classes.noteTitleContainer}>
              <h4 className={classes.noteTitle}>
                {props.note.published && <PublishedBadge />} {props.note.title}
              </h4>
              <div>
                <b className={classes.noteSubTitle}>{renderDate()}</b>
              </div>
            </div>
            <div className={classes.optionsButtonContainer}>
              <OptionsButton
                options={
                  props.note.published ? PUBLISHED_OPTIONS : UNPUBLISHED_OPTIONS
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
