import React from "react";

export const NewNote = (props: any) => {
  return (
    <div className="note-card" onClick={props.onClick}>
      <i className="fas fa-plus"></i>
      <h4 className="new-note-text">New Note</h4>
    </div>
  );
};
