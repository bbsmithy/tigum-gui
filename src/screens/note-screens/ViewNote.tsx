import React, { useEffect, useState } from "react";
import { NOTE_SCREENS } from "../../routers/NoteRouter";
import { deleteNote } from "../../client-lib/api";
import { getFile, uploadToBucket } from "../../client-lib/S3";
import TextEditor from "../../components/Editor/TextEditor";

export const ViewNote = (props: any) => {
  const [html, setNoteHTML] = useState();

  const getNoteData = async () => {
    try {
      const noteHTML = await getFile(`${props.note.note_id}.html`);
      console.log(noteHTML);
      setNoteHTML(noteHTML);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNoteData();
  }, []);

  const onSave = (content: string) => {
    uploadToBucket(content, `${props.note.note_id}.html`);
    console.log(content, props);
  };

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
    <div className="view-note-container z-1">
      <TextEditor
        onSave={onSave}
        htmlContent={html}
        title={props.note.title}
        onClickBack={onClickNote}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};
