import React from "react";
import { NOTE_SCREENS } from "../../routers/NoteRouter";

export const ViewNote = (props: any) => {
  const onClickNote = (note: any) => {
    props.navigate(NOTE_SCREENS.ALL_NOTES, {});
  };

  return (
    <div className="topic-section-container">
      <span className="back-btn-note" onClick={onClickNote}>
        <i className="fa fa-arrow-left" />
      </span>

      <h3 className="note-title">{props.note.title}</h3>
    </div>
  );
};
