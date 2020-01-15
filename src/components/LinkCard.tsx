import React from "react";
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

  return (
    <a
      href={props.link.source}
      target="blank"
      className="card note-card pointer"
    >
      <div className="mw9 center">
        <div className="cf ph2-ns">
          <div className="fl ph2 w-90 pv1">
            <div>
              <h4 className={classes.documentTitle}>{props.link.title}</h4>
              <b className={classes.documentSubTitle}>{props.link.source}</b>
            </div>
          </div>
          <div className="fl w-10 pv4">
            <div>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
