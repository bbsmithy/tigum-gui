import React, { useEffect, useState } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { deleteNote, getNotes } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { goto } from '../../util';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';

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
  mainContainer: { backgroundColor: '#333' },
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
  const [html, setNoteHTML] = useState<any>('');
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
      const noteHTML = await getFile(`${noteId}.html`);
      setNoteHTML(noteHTML);
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
      setNoteHTML(htmlFromMDEditor);
      setSaving(true);
      await uploadToBucket(htmlFromMDEditor, `${note.id}.html`);
      setSaving(false);
    } else {
      setNoteHTML(html);
      setSaving(true);
      await uploadToBucket(html, `${note.id}.html`);
      setSaving(false);
    }
  };

  const onSave = async (md, currentHTML) => {
    try {
      save(currentHTML);
    } catch (e) {
      setSaving(false);
    }
  };

  const onClickNote = () => {
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
          <div className={classes.headerContainer}>
            <button className={classes.btn} onClick={onClickNote}>
              <i className='fa fa-arrow-left' />
            </button>
            <h3 className={`${classes.header} white`}>{note.title}</h3>
            <button
              className={`${classes.deleteBtn} ${classes.btn}`}
              onClick={save}
            >
              {saving ? (
                <i className='fas fa-circle-notch fa-spin'></i>
              ) : (
                <>
                  <i className='fa fa-save' />
                </>
              )}
            </button>
            <button
              className={`${classes.deleteBtn} ${classes.btn}`}
              onClick={onClickNote}
            >
              <i className='fa fa-trash' />
            </button>
          </div>
        )}

        {html && (
          <MarkdownEditor
            initialContent={{ type: 'html', content: html }}
            styles={styles}
            height={window.innerHeight}
            onSave={onSave}
            onDelete={onClickDelete}
          />
        )}
        {!html && (
          <MarkdownEditor
            initialContent={{ type: 'html', content: '' }}
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
