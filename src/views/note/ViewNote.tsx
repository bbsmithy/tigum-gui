import React, { useEffect, useState } from 'react';
import { SCREENS } from '../../routers/MainRouter';
import { deleteNote, getNotes } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { debounce, goto } from '../../util';
import TextEditor from '../../components/Editor/TextEditor';
import { useStateValue } from '../../state/StateProvider';

export const ViewNote = (props: any) => {
  const [html, setNoteHTML] = useState<any>();
  const [saving, setSaving] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [editorWidth, setEditorWidth] = useState<number>();

  const {
    content: { selectedResourceId, notes, selectedTopic, topics },
  } = state;

  const note = notes.data ? notes.data[selectedResourceId] : false;

  const onLayoutEditorWidth = () => {
    const editorContainerWidth = document.getElementById('view-note-container')
      .offsetWidth;
    setEditorWidth(editorContainerWidth);
  };

  const debouncedEditorLayout = () => {
    debounce(onLayoutEditorWidth(), 300);
  };

  const getNoteData = async (noteId: number) => {
    try {
      const noteHTML = await getFile(`${noteId}.html`);
      setNoteHTML(noteHTML);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchNotes = async () => {
    const res = await getNotes(topics.data[selectedTopic].notes);
    const topicNotes = await res.json();
    dispatch({ type: 'SET_NOTES', payload: topicNotes });
    getNoteData(selectedResourceId);
  };

  useEffect(() => {
    if (!note && notes.keys.length === 0) {
      fetchNotes();
    } else {
      getNoteData(note.id);
      onLayoutEditorWidth();
      window.addEventListener('resize', debouncedEditorLayout);
      return () => {
        window.removeEventListener('resize', debouncedEditorLayout);
      };
    }
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

  const onClickNote = () => {
    goto(`/topic/${selectedTopic}/notes`);
  };

  const onClickDelete = async () => {
    try {
      await deleteNote(props.note.id);
      props.navigate(SCREENS.ALL_NOTES);
    } catch (e) {
      console.log(e);
    }
  };

  if (note) {
    return (
      <div className='z-1 center w-100-m w-70-l w-100' id='view-note-container'>
        {/* <Markdown /> */}
        <TextEditor
          onSave={onSave}
          saving={saving}
          width={editorWidth}
          htmlContent={html}
          title={note.title}
          onBack={onClickNote}
          onDelete={onClickDelete}
        />
      </div>
    );
  }
  return null;
};
