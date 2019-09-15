import React from "react";
import { NOTE_SCREENS } from "../../routers/NoteRouter";
import TextEditor from "../../components/Editor/TextEditor";

export const ViewNote = (props: any) => {
  const onClickNote = (note: any) => {
    props.navigate(NOTE_SCREENS.ALL_NOTES, {});
  };

  return (
    <div className="view-note-container">
      <div>
        <span className="back-btn-note" onClick={onClickNote}>
          <i className="fa fa-arrow-left" />
        </span>

        <h2 className="note-title">{props.note.title}</h2>
        <TextEditor />
      </div>
    </div>
  );
};
