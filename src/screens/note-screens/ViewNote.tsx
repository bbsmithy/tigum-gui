import React, { useEffect } from "react";
import { NOTE_SCREENS } from "../../routers/NoteRouter";
import { deleteNote } from "../../client-lib/api";
import { getBuckets } from "../../client-lib/S3";
import TextEditor from "../../components/Editor/TextEditor";

export const ViewNote = (props: any) => {
  useEffect(() => {
    getBuckets();
  }, []);

  const onClickNote = (note: any) => {
    props.navigate(NOTE_SCREENS.ALL_NOTES, {});
  };

  const onClickDelete = async () => {
    try {
      await deleteNote(props.note.note_id);
      props.navigate(NOTE_SCREENS.ALL_NOTES);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="view-note-container">
      <div>
        <span className="back-btn-note" onClick={onClickNote}>
          <i className="fa fa-arrow-left" />
        </span>
        <h2 className="note-title">{props.note.title}</h2>
        <span className="back-btn-note fr mt3" onClick={onClickDelete}>
          <i className="fa fa-trash" />
        </span>
        <TextEditor />
      </div>
    </div>
  );
};
