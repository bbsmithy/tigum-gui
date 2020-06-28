import React, { useState, useEffect } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles, useTheme } from 'react-jss';
import { goto } from '../../util';
import { getVideos } from '../../clib/api';
import { NoteHeader } from '../../components/NoteHeader';
import { uploadToBucket, getFile } from '../../clib/S3';
import { notify } from '../../state/Actions';

const useStyles = createUseStyles({
  videoTitleContainer: {
    textAlign: 'center',
  },
  videoNotesContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '45%',
    padding: 10,
    height: '100%',
  },
  iframeContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '55%',
    height: '100%',
  },
  title: {
    padding: 0,
    margin: '5px 0px 12px 0px',
    color: 'white',
  },
});

const toolbarOptions = [
  'bold',
  'italic',
  'heading',
  '|',
  'quote',
  'ordered-list',
  'unordered-list',
  '|',
  'code',
  'link',
  'image',
  'table',
  '|',
  'preview',
  '|',
];

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
  height: '84vh',
};

export const VideoPlayer = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { selectedResourceId, videos, selectedTopic, topics },
  } = state;
  const [uploadingNote, setUploadingNote] = useState(false);
  const [noteMd, setNoteMd] = useState<any>();
  const [loadingNote, setLoadingNote] = useState(true);

  const classes = useStyles();
  const video = videos.data ? videos.data[selectedResourceId] : false;

  const fetchNoteData = async (file) => {
    try {
      setLoadingNote(true);
      const noteData = await getFile(file, 'video-notes');
      setNoteMd(noteData);
      setLoadingNote(false);
    } catch (e) {
      setLoadingNote(false);
      return;
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await getVideos(topics.data[selectedTopic].videos);
      const videoData = await res.json();
      dispatch({ type: 'SET_VIDEOS', payload: videoData });
    } catch (e) {
      notify(dispatch, 'Could not retrieve video', 'error', 'right');
    }
  };

  useEffect(() => {
    if (video) {
      fetchNoteData(`${video.id}_video.md`);
    }
  }, [video]);

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos();
    }
  }, [videos]);

  const save = async (md) => {
    if (md) {
      notify(dispatch, 'Saving notes', 'progress', 'right');
      await uploadToBucket(
        md,
        `${videos.data[selectedResourceId].id}_video.md`,
        'video-notes'
      );
      setUploadingNote(false);
      setTimeout(
        () => notify(dispatch, 'Saved successfully', 'success', 'right'),
        300
      );
    }
  };

  const onSave = async (md) => {
    try {
      save(md);
    } catch (e) {
      setUploadingNote(false);
      notify(dispatch, 'Could not upload notes', 'error', 'right');
    }
  };

  const onDelete = () => {
    console.log('Delete');
  };

  const codeMirrorHandle = (cm) => {
    console.log(cm);
  };

  const goBack = () => {
    goto(`/topic/${selectedTopic}/videos`);
  };

  return (
    <div className='center w-100 ph2 h-100 video-page-container'>
      <div className={classes.videoNotesContainer} id='video-notes-container'>
        <div>
          <NoteHeader
            onBack={goBack}
            title={video.title}
            saving={uploadingNote}
          />
        </div>
        {noteMd && !loadingNote && (
          <MarkdownEditor
            initialValue={noteMd}
            onSave={onSave}
            onDelete={onDelete}
            codeMirrorHandle={codeMirrorHandle}
            spellChecker={false}
            toolbarOptions={toolbarOptions}
            useHighlightJS
            highlightTheme='agate'
            theme={theme}
          />
        )}
        {!noteMd && !loadingNote && (
          <MarkdownEditor
            initialValue={''}
            onSave={onSave}
            onDelete={onDelete}
            codeMirrorHandle={codeMirrorHandle}
            spellChecker={false}
            toolbarOptions={toolbarOptions}
            useHighlightJS
            highlightTheme='agate'
            theme={theme}
          />
        )}
      </div>
      {video && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: video.iframe }}
            className={classes.iframeContainer}
          ></div>
        </>
      )}
    </div>
  );
};
