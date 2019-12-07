import React from "react";

type CodeCardProps = {
  content: string;
  origin: string;
};

export const CodeCard = (props: CodeCardProps) => {
  return (
    <article className="center shadow-card mw5 mw7-ns hidden br2 ba dark-gray b--black-10  mv3">
      <div className="pa3">
        <p className="f6 f5-ns lh-copy">{props.content}</p>
        <a href={props.origin} className="i f6">
          {props.origin}
        </a>
      </div>
    </article>
  );
};
