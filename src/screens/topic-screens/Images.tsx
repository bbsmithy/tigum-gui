import React from "react";

export const Images = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>Images</h1>
      <p>{props.data.content}</p>
    </div>
  );
};
