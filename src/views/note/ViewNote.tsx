import React, { useEffect, useRef, useState } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { createUseStyles } from 'react-jss';
import { deleteNote, getNotes } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { goto } from '../../util';
import { useStateValue } from '../../state/StateProvider';
import { NoteHeader } from '../../components/NoteHeader';
import ResourceDialog from '../../components/ResourceDialog';
import { notify } from '../../state/Actions';
import { CursorState } from "../../types";


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
  height: '85vh',
};

export const ViewNote = (props: any) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [md, setNoteMD] = useState<any>('');
  const [loadingHTML, setLoadingHTML] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cmdControl, setCMDControl] = useState<CursorState>();
  const cmRef = useRef()
  const {
    content: { selectedResourceId, notes, selectedTopic, topics },
  } = state;
  const note = notes.data ? notes.data[selectedResourceId] : false;

  useEffect(() => {
    if (!note && notes.keys.length === 0) {
      fetchNotes();
    } else {
      getNoteData(note.id);
    }
    document.addEventListener('keydown', commandListener);
    return () => {
      document.removeEventListener('keydown', commandListener)
    }
  }, []);

  const closeCMDDialog = () => {
    setCMDControl(null)
    document.removeEventListener("click", closeCMDDialog)
  }

  const commandListener = (event) => {
    if (event.ctrlKey && event.key === '/') {
      if (cmRef.current !== undefined) {
        // @ts-ignore
        const position = cmRef.current.cursorCoords(true)
        // @ts-ignore
        const cursorLine = cmRef.current.getCursor().line
        setCMDControl({ position, cursorLine })
        document.addEventListener("click", closeCMDDialog)
      }
    }
  }

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
    cmRef.current = cm
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
        {!loadingHTML && (
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
        {cmdControl && (
          <ResourceDialog {...cmdControl} />
        )}
      </div>
    );
  }
  return null;
};
