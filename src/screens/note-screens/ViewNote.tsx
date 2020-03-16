import React, { useEffect, useState } from 'react';
import { NOTE_SCREENS } from '../../routers/NoteRouter';
import { deleteNote } from '../../client-lib/api';
import { getFile, uploadToBucket } from '../../client-lib/S3';
import { debounce } from '../../util';
import TextEditor from '../../components/Editor/TextEditor';
import { useStateValue } from '../../state/StateProvider';

export const ViewNote = (props: any) => {
  const [html, setNoteHTML] = useState();
  const [saving, setSaving] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [editorWidth, setEditorWidth] = useState();

  const onLayoutEditorWidth = () => {
    const editorContainerWidth = document.getElementById('view-note-container')
      .offsetWidth;
    setEditorWidth(editorContainerWidth);
  };

  const debouncedEditorLayout = () => {
    debounce(onLayoutEditorWidth(), 300);
  };

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
    onLayoutEditorWidth();
    window.addEventListener('resize', debouncedEditorLayout);
    return () => {
      window.removeEventListener('resize', debouncedEditorLayout);
    };
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
    <div className='z-1 center w-60' id='view-note-container'>
      <TextEditor
        onSave={onSave}
        saving={saving}
        width={editorWidth}
        htmlContent={html}
        title={props.note.title}
        onClickBack={onClickNote}
        onClickDelete={onClickDelete}
      />
    </div>
  );
};
