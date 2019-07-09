import React from "react";

export const Code = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>Code</h1>
      <p>{props.data.content}</p>
    </div>
  );
};
