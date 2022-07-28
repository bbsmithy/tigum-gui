import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  paragraphLoading: {
    width: "100%",
    marginTop: 10,
    height: 8,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  linkLoading: {
    width: "60%",
    marginTop: 30,
    height: 8,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  snippetLoading: {
    margin: "auto",
    padding: 10,
  },
});

const LoadingSnippet = () => {
  const classes = useStyles();

  return (
    <div className="fl w-100 ph2 pv2">
      <article className={`shadow-card br3  ${classes.snippetLoading}`}>
        <div className={classes.paragraphLoading}></div>
        <div className={classes.paragraphLoading}></div>
        <div className={classes.paragraphLoading}></div>
        <div className={classes.paragraphLoading}></div>
        <div className={classes.paragraphLoading}></div>
        <div className={classes.linkLoading}></div>
      </article>
    </div>
  );
};

export default LoadingSnippet;
