import React, { useState, useEffect } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
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
    overflow: 'scroll',
    whiteSpace: 'nowrap',
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

export const VideoPlayer = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: {
      selectedResourceId,
      videos,
      selectedTopic,
      topics,
      notification,
    },
  } = state;
  const [uploadingNote, setUploadingNote] = useState(false);
  const [noteMd, setNoteMd] = useState<any>();

  const classes = useStyles();
  const video = videos.data ? videos.data[selectedResourceId] : false;

  const fetchNoteData = async (file) => {
    try {
      const noteData = await getFile(file, 'video-notes');
      setNoteMd(noteData);
    } catch (e) {
      console.log(e);
      notify(dispatch, 'Could note retreive notes', 'error', 'right');
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

  const onSave = async (md, html) => {
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

  const goBack = () => {
    goto(`/topic/${selectedTopic}/videos`);
  };

  return (
    <div className='center w-100 ph2 h-100 video-page-container'>
      <div className={classes.videoNotesContainer} id='video-notes-container'>
        <div>
          <NoteHeader
            onBack={goBack}
            onDelete={onDelete}
            title={video.title}
            saving={uploadingNote}
          />
        </div>
        {noteMd && (
          <MarkdownEditor
            initialContent={{ type: 'md', content: noteMd }}
            styles={styles}
            height={window.innerHeight}
            onSave={onSave}
            onDelete={onDelete}
          />
        )}
        {!noteMd && (
          <MarkdownEditor
            initialContent={{ type: 'md', content: '' }}
            styles={styles}
            height={window.innerHeight}
            onSave={onSave}
            onDelete={onDelete}
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
