import React, { useEffect, useState } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { createUseStyles } from 'react-jss';

import { deleteNote, getNotes } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { goto } from '../../util';
import { useStateValue } from '../../state/StateProvider';
import { NoteHeader } from '../../components/NoteHeader';

const useStyles = createUseStyles(() => ({
  btn: {
    backgroundColor: '#333',
    color: 'white',
    padding: '3px 10px 3px 10px',
    border: 'none',
    fontSize: 12,
    borderRadius: 4,
    height: 30,
    marginRight: 4,
    cursor: 'pointer',
    display: 'inline',
  },
  deleteBtn: {
    float: 'right',
  },
  header: {
    display: 'inline',
    marginLeft: 10,
  },
  headerContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
}));

const styles = {
  mainContainer: {
    backgroundColor: '#333',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  },
  markdownContainer: { color: 'white' },
  markdownEditor: { backgroundColor: '#333', color: 'white' },
  htmlContainer: { color: 'white' },
  controlsContainer: {
    marginBottom: 6,
  },
  langInput: {
    color: 'white',
    backgroundColor: '#333',
    height: 20,
    borderRadius: 4,
    width: 60,
    padding: 4,
    border: 'none',
  },
  btn: {
    backgroundColor: '#333',
    color: 'white',
    padding: '3px 10px 3px 10px',
    border: 'none',
    fontSize: 12,
    borderRadius: 4,
    height: 30,
    marginRight: 4,
  },
};

export const ViewNote = (props: any) => {
  const [md, setNoteMD] = useState<any>('');
  const [loadingHTML, setLoadingHTML] = useState(true);
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);

  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();

  const {
    content: { selectedResourceId, notes, selectedTopic, topics },
  } = state;

  const note = notes.data ? notes.data[selectedResourceId] : false;

  const getNoteData = async (noteId: number) => {
    try {
      const noteHTML = await getFile(`${noteId}.md`);
      setNoteMD(noteHTML);
      setLoadingHTML(false);
    } catch (e) {
      console.log(e);
      setLoadingHTML(false);
      setError('Sorry we could not load this note. Try again later');
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
    }
  }, []);

  const save = async (htmlFromMDEditor) => {
    if (htmlFromMDEditor) {
      setNoteMD(htmlFromMDEditor);
      setSaving(true);
      await uploadToBucket(htmlFromMDEditor, `${note.id}.md`);
      setSaving(false);
    } else {
      setNoteMD(md);
      setSaving(true);
      await uploadToBucket(md, `${note.id}.md`);
      setSaving(false);
    }
  };

  const onSave = async (md, currentHTML) => {
    try {
      save(md);
    } catch (e) {
      setSaving(false);
    }
  };

  const goBack = () => {
    goto(`/topic/${selectedTopic}/notes`);
  };

  const onClickDelete = async () => {
    try {
      await deleteNote(note.id);
      goto(`/topic/${selectedTopic}/notes`);
    } catch (e) {
      console.log(e);
    }
  };

  if (note) {
    return (
      <div className='z-1 center w-100-m w-70-l w-100' id='view-note-container'>
        {note && (
          <div className='mt2'>
            <NoteHeader
              onBack={goBack}
              onDelete={onClickDelete}
              title={note.title}
              saving={saving}
            />
          </div>
        )}
        {loadingHTML && <i className='fas fa-circle-notch fa-spin'></i>}
        {md && !loadingHTML && (
          <MarkdownEditor
            initialContent={{ type: 'md', content: md }}
            styles={styles}
            height={window.innerHeight}
            onSave={onSave}
            onDelete={onClickDelete}
          />
        )}
        {!md && !loadingHTML && (
          <MarkdownEditor
            initialContent={{ type: 'md', content: '' }}
            styles={styles}
            height={window.innerHeight}
            onSave={onSave}
            onDelete={onClickDelete}
          />
        )}
      </div>
    );
  }
  return null;
};
