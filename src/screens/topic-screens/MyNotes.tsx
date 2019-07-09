import React from "react";

export const MyNotes = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>My Notes</h1>
      <p>{props.data.content}</p>
    </div>
  );
};
