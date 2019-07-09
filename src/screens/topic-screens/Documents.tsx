import React from "react";

export const Documents = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>Documents</h1>
      <p>{props.data.content}</p>
    </div>
  );
};
