import React from "react";

export const NewVideo = (props: any) => {
  return (
    <div className="card" onClick={props.onClick}>
      <i className="fas fa-plus"></i>
      <h4 className="new-text">New Video</h4>
    </div>
  );
};
