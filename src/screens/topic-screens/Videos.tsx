import React from "react";

export const Videos = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>Videos</h1>
      <p>{props.data.content}</p>
    </div>
  );
};
