import React, { useEffect, useState } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { createUseStyles } from 'react-jss';

import { deleteNote, getNotes } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { goto } from '../../util';
import { useStateValue } from '../../state/StateProvider';
import { NoteHeader } from '../../components/NoteHeader';
import { notify } from '../../state/Actions';

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

const theme = {
  toolbar: {
    background: '#333',
    color: 'white',
    activeBtnBackground: '#242020',
    activeBtnColor: 'white',
    disabledBtnBackground: 'gray',
    disabledBtnColor: '#333',
  },
  preview: { background: '#474646', color: 'white' },
  editor: { background: '#333', color: 'white' },
  cursorColor: 'white',
};

export const ViewNote = (props: any) => {
  const [md, setNoteMD] = useState<any>('');
  const [loadingHTML, setLoadingHTML] = useState(true);
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
      const noteHTML = await getFile(`${noteId}.md`, 'notes');
      setNoteMD(noteHTML);
      setLoadingHTML(false);
    } catch (e) {
      console.log(e);
      setLoadingHTML(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await getNotes(topics.data[selectedTopic].notes);
      const topicNotes = await res.json();
      dispatch({ type: 'SET_NOTES', payload: topicNotes });
      getNoteData(selectedResourceId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!note && notes.keys.length === 0) {
      fetchNotes();
    } else {
      getNoteData(note.id);
    }
  }, []);

  const save = async (htmlFromMDEditor) => {
    try {
      if (htmlFromMDEditor) {
        notify(dispatch, 'Saving notes', 'progress', 'right');
        setNoteMD(htmlFromMDEditor);
        await uploadToBucket(htmlFromMDEditor, `${note.id}.md`, 'notes');
        setTimeout(
          () => notify(dispatch, 'Saved successfully', 'success', 'right'),
          150
        );
      } else {
        setNoteMD(md);
        await uploadToBucket(md, `${note.id}.md`, 'notes');
        notify(dispatch, 'Saved successfully', 'success', 'right');
      }
    } catch (e) {
      setSaving(false);
      notify(dispatch, 'Could not upload notes', 'error', 'right');
    }
  };

  const onSave = async (md) => {
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

  const codeMirrorHandle = (cm) => {
    console.log(cm);
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
            initialValue={md}
            onSave={onSave}
            onDelete={onClickDelete}
            codeMirrorHandle={codeMirrorHandle}
            spellChecker={false}
            useHighlightJS
            highlightTheme='agate'
            theme={theme}
          />
        )}
      </div>
    );
  }
  return null;
};
