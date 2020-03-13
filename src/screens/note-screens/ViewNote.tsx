import React, { useEffect, useState } from 'react';
import { NOTE_SCREENS } from '../../routers/NoteRouter';
import { deleteNote } from '../../client-lib/api';
import { getFile, uploadToBucket } from '../../client-lib/S3';
import TextEditor from '../../components/Editor/TextEditor';
import { useStateValue } from '../../state/StateProvider';

export const ViewNote = (props: any) => {
  const [html, setNoteHTML] = useState();
  const [saving, setSaving] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const getNoteData = async () => {
    try {
      const noteHTML = await getFile(`${props.note.id}.html`);
      console.log(noteHTML);
      setNoteHTML(noteHTML);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getNoteData();
  }, []);

  const onSave = async (content: string) => {
    try {
      setNoteHTML(content);
      setSaving(true);
      await uploadToBucket(content, `${props.note.id}.html`);
      setSaving(false);
    } catch (e) {
      setSaving(false);
    }
  };

  const onClickNote = (note: any) => {
    dispatch({ type: 'SHOW_TOPIC_NAVBAR' });
    props.navigate(NOTE_SCREENS.ALL_NOTES, {});
  };

  const onClickDelete = async () => {
    try {
      await deleteNote(props.note.id);
      props.navigate(NOTE_SCREENS.ALL_NOTES);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='view-note-container z-1 mt4'>
      <TextEditor
        onSave={onSave}
        saving={saving}
        htmlContent={html}
        title={props.note.title}
        onClickBack={onClickNote}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};
