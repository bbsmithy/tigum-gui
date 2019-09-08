import React from "react";

export const AllNotes = (props: any) => {
  return (
    <div className="topic-section-container">
      <h1>All Notes</h1>
      <p>{JSON.stringify(props)}</p>
    </div>
  );
};
