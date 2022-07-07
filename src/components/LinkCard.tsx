import React from "react";
import { createUseStyles } from "react-jss";
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
    fontStyle: "italic",
    display: "block",
    marginBottom: 10,
  },
});

export const LinkCard = (props: any) => {
  const classes = useStyles();

  const onClick = () => {
    window.open(props.link.source, "blank");
  };

  return (
    <div className="fl w-100 w-50-m w-33-l ph2 pv1">
      <div onClick={onClick} className="card link-card pointer w-100">
        <div className="mw9 center">
          <div className="cf ph2-ns">
            <div className="fl ph2 w-90 pv1">
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      flex: 4,
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    <b className={classes.documentSubTitle}>
                      {props.link.source}
                    </b>
                  </div>
                  <div style={{ flex: 2 }}>
                    {props.link.published && <PublishedBadge />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
