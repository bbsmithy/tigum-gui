import React from "react";
import { ArticleCardProps } from "../types";

export const ArticleCard = (props: ArticleCardProps) => {
  return (
    <article className="center mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
      <div className="pa3">
        <p className="f6 f5-ns lh-copy">{props.content}</p>
        <a href={props.origin}>{props.origin}</a>
      </div>
    </article>
  );
};
