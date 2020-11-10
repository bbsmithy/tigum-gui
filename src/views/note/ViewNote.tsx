import React, { useEffect, useRef, useState } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { deleteNote, getNotes } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { goto } from '../../util';
import { useStateValue } from '../../state/StateProvider';
import { NoteHeader } from '../../components/NoteHeader';
import ResourceDialog from '../../components/ResourceDialog';
import { notify } from '../../state/Actions';
import { CursorState } from "../../types";
import { createUseStyles } from 'react-jss';


const theme = {
  toolbar: {
    background: '#333',
    color: 'white',
    activeBtnBackground: '#242020',
    activeBtnColor: 'white',
    disabledBtnBackground: 'gray',
    disabledBtnColor: '#333',
  },
  preview: { background: '#333', color: 'white' },
  editor: { background: '#333', color: 'white' },
  cursorColor: 'white',
  height: '90vh'
};

const useStyles = createUseStyles({
  loadingSpinner: {
    fontSize: 40,
    marginTop: "30%"
  },
  loadingSpinnerContainer: {
    textAlign: "center",
    height: window.innerHeight,
    width: "100%"
  }
})

export const ViewNote = (props: any) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [md, setNoteMD] = useState<any>('');
  const [loadingHTML, setLoadingHTML] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cmdControl, setCMDControl] = useState<CursorState>();
  const cmRef = useRef()
  const classes = useStyles()

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
        const absPos = cmRef.current.cursorCoords(true)
        // @ts-ignore
        const cursorPos = cmRef.current.getCursor()
        setCMDControl({ absPos, cursorPos })
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
        {loadingHTML && (
          <div className={classes.loadingSpinnerContainer}>
            <i className={`fas fa-circle-notch fa-spin white ${classes.loadingSpinner}`}></i>
          </div>
        )}
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
            onBack={goBack}
            title={note.title}
            defaultView={window.innerWidth > 500 ? "side-by-side" : "preview"}
          />
        )}
        {cmdControl && (
          <ResourceDialog selection={cmdControl} cm={cmRef.current} topic_id={selectedTopic} />
        )}
      </div>
    );
  }
  return null;
};
