import React from "react";

export const NewNote = (props: any) => {
  return (
    <div className="new-button" onClick={props.onClick}>
      <i className="fas fa-plus"></i>
      <h4 className="new-text">New Note</h4>
    </div>
  );
};
