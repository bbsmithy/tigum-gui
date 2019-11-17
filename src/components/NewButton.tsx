import React from "react";

export const NewButton = (props: any) => {
  return (
    <div className="new-button" onClick={props.onClick}>
      <i className="fas fa-plus"></i>
      <h4 className="new-text">{props.text}</h4>
    </div>
  );
};
