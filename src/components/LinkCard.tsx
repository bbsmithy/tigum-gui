import React from "react";
import { getDate } from "../util/date";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  documentTitle: {
    display: "inline-block",
    fontSize: 18
  },
  documentSubTitle: {
    color: "gray",
    fontSize: 12,
    fontStyle: "italic",
    display: "block",
    marginBottom: 10
  }
});

export const LinkCard = (props: any) => {
  const classes = useStyles();

  const navigateToNote = () => {
    props.onClick(props.link);
  };

  const renderDate = () => {
    const dateText = new Date(props.link.date_created);
    return getDate(dateText);
  };

  return (
    <div className="card note-card pointer" onClick={navigateToNote}>
      <div className="mw9 center">
        <div className="cf ph2-ns">
          <div className="fl ph2 w-90 pv1">
            <div className="bg-white">
              <h4 className={classes.documentTitle}>{props.link.title}</h4>
              <b className={classes.documentSubTitle}>{renderDate()}</b>
            </div>
          </div>
          <div className="fl w-10 pv4">
            <div className="bg-white">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
