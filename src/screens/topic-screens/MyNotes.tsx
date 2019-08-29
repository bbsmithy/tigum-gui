import React from "react";

export const MyNotes = (props: any) => {
  console.log(props);
  return (
    <div className="topic-section-container">
      <h1>My Notes</h1>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
};
