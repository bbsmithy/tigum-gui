import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  badge: { color: "#39ff14" },
});

const PublishedBadge = ({ style }: { style?: any }) => {
  const classes = useStyles();

  return (
    <span className={classes.badge} style={style}>
      ●
    </span>
  );
};

export default PublishedBadge;
