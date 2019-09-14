import React from "react";

export const Note = (props: any) => {
  const navigateToNote = () => {
    props.onClick(props.note);
  };

  return (
    <div className="note-card" onClick={navigateToNote}>
      <h4>{props.note.title}</h4>
    </div>
  );
};
