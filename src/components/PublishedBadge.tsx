import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  badge: {
    fontSize: 12,
    color: "#bfbfbf",
    marginLeft: 12,
  },
});

const PublishedBadge = () => {
  const classes = useStyles();

  return <div className={classes.badge}>✅ Published</div>;
};

export default PublishedBadge;
