import React from "react";

export const NewNote = (props: any) => {
  return (
    <div className="new-note-card" onClick={props.onClick}>
      <i className="fas fa-plus"></i>
      <span className="new-note-text">New Note</span>
    </div>
  );
};
