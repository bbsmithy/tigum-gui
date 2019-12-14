import React from "react";
import { ArticleCardProps } from "../types";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  divider: {
    border: "0.5px solid #efefef"
  },
  
});

export const ArticleCard = (props: ArticleCardProps) => {

  const classes = useStyles();

  return (
    <article className="center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
      <div className="pa3">
        <p className="f6 f5-ns lh-copy">{props.content}</p>
        <hr className={classes.divider}/>
        <a href={props.origin} className="i f6">
          {props.origin}
        </a>
        <button className="f6 fr link dim br2 ph3 pv2 mb2 dib white bg-blue">
          Delete
        </button>
      </div>
    </article>
  );
};
