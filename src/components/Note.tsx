import React from "react";

export const Note = (props: any) => {
  return (
    <div className="note-card" onClick={props.onClick}>
      <h4>{props.title}</h4>
    </div>
  );
};
