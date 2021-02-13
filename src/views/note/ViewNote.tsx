import React, { useEffect, useRef, useState } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { deleteNote, getNotes, updateNote } from '../../clib/api';
import { getFile, uploadToBucket } from '../../clib/S3';
import { goto, setPageTitle } from '../../util';
import { useStateValue } from '../../state/StateProvider';
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
  const simpleMDERef = useRef()
  const initialNoteMDRef = useRef<string>()
  const classes = useStyles()
  const {
    content: { selectedResourceId, notes, selectedTopic, topics },
  } = state;
  const note = notes.data ? notes.data[selectedResourceId] : false;
  const currentTopic = topics.data ? topics.data[selectedTopic] : false;
  const toolbarOptions = [
    {
      name: "home",
      action: function customFunction(editor){
        goto(`topic/${selectedTopic}/notes`)
      },
      className: "fa fa-home",
      title: "Custom Button",
    },
    'bold',
    'italic',
    'heading',
    '|',
    'quote',
    'ordered-list',
    'unordered-list',
    '|',
    {
      name: "resource",
      action: function customFunction(editor){
        showReferenceDialog()
      },
      className: "fa fa-book",
      title: "Find Resource",
    },
    'code',
    'link',
    'image',
    'table',
    '|',
    'preview',
    'fullscreen',
    'side-by-side',
    'guide',
    '|',
  ];

  useEffect(() => {
    setupNote()
    return () => {
      if (cmRef.current) {
        // @ts-ignore
        const currentMD = cmRef.current.getValue()
        if (currentMD !== initialNoteMDRef.current) {
          console.log(currentMD)
          save(currentMD)
        }
      }
    }
  }, []);

  useEffect(() => {
    setupNote()
  }, [selectedResourceId])

  const setupNote = () => {
    if (!note && notes.keys.length === 0) {
      fetchNotes();
    } else {
      getNoteData(note.id);
    }
    document.addEventListener('keydown', commandListener);
    return () => {
      document.removeEventListener('keydown', commandListener)
    }
  }

  const closeCMDDialog = () => {
    setCMDControl(null)
  }

  const commandListener = (event) => {
    if (event.ctrlKey && event.key === '/') {
      if (cmRef.current !== undefined) {
        showReferenceDialog()
      }
    }
  }

  const showReferenceDialog = () => {
    // @ts-ignore
    const absPos = cmRef.current.cursorCoords(true)
    // @ts-ignore
    const cursorPos = cmRef.current.getCursor()
    setCMDControl({ absPos, cursorPos })
  }

  const getNoteData = async (noteId: number) => {
    try {
      setLoadingHTML(true)
      setPageTitle(`${note.title} | ${currentTopic.title}`)
      const noteHTML = await getFile(`${noteId}.md`, 'notes');
      setNoteMD(noteHTML);
      setLoadingHTML(false);
      initialNoteMDRef.current = noteHTML
    } catch (e) {
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
      notify(dispatch, 'Saving notes', 'progress', 'right');
      setNoteMD(htmlFromMDEditor);
      await uploadToBucket(htmlFromMDEditor, `${selectedResourceId}.md`, 'notes');
      setTimeout(
        () => notify(dispatch, 'Saved successfully', 'success', 'right'),
        150
      );
    } catch (e) {
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
    window.history.back();
  };

  const onEditTitle = (newTitle) => {
    if (newTitle) {
      updateNote({ ...note, title: newTitle })
    }
  }

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

  const simpleMdeHandle = (simpleMDE) => {
    simpleMDERef.current = simpleMDE
  }

  const onClickNote = (evt) => {
    evt.preventDefault()
    const el = evt.target
    if (el.tagName === "A" && el.href) {
      if (el.href.includes("tigum.io")) {
        const localUrl = el.href.split("tigum.io")[1]
        goto(localUrl)
      } else {
        window.open(el.href, "blank")
      }
    }
  }

  const onDoubleClick = () => {
    // @ts-ignore
    if (simpleMDERef.current && simpleMDERef.current.isPreviewActive()) {
      // @ts-ignore
      simpleMDERef.current.togglePreview()
    }
  }

  if (note) {
    return (
      <div
        className='z-1 center w-100-m w-70-l w-100' id='view-note-container' 
        onClick={onClickNote}
        onDoubleClick={onDoubleClick}
      >
        {loadingHTML && (
          <div className={classes.loadingSpinnerContainer}>
            <i className={`fas fa-circle-notch fa-spin white ${classes.loadingSpinner}`}></i>
          </div>
        )}
        {!loadingHTML && selectedResourceId && (
          <MarkdownEditor
            initialValue={md}
            onSave={onSave}
            onDelete={onClickDelete}
            codeMirrorHandle={codeMirrorHandle}
            simplemdeHandle={simpleMdeHandle}
            spellChecker={false}
            useHighlightJS
            toolbarOptions={toolbarOptions}
            highlightTheme='agate'
            theme={theme}
            onBack={goBack}
            title={note.title}
            onEditTitle={onEditTitle}
            editTitleWidth={"35%"}
            defaultView={window.innerWidth > 500 ? "side-by-side" : "preview"}
          />
        )}
        {cmdControl && (
          <ResourceDialog
            onClickAway={closeCMDDialog}
            selection={cmdControl}
            cm={cmRef.current}
            topic_id={selectedTopic}
          />
        )}
      </div>
    );
  }
  return null;
};
