import React, { useState, useEffect } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { debounce, goto } from '../../util';
import { getVideos } from '../../clib/api';
import { NoteHeader } from '../../components/NoteHeader';

const useStyles = createUseStyles({
  videoTitleContainer: {
    textAlign: 'center',
  },
  videoNotesContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '40%',
    padding: 10,
    height: '100%',
  },
  iframeContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '60%',
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

export const VideoPlayer = (props: any) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { selectedResourceId, videos, selectedTopic, topics },
  } = state;
  const classes = useStyles();
  const [editorWidth, setEditorWidth] = useState<number>();
  const video = videos.data ? videos.data[selectedResourceId] : false;

  const fetchVideos = async () => {
    try {
      const res = await getVideos(topics.data[selectedTopic].videos);
      const videoData = await res.json();
      dispatch({ type: 'SET_VIDEOS', payload: videoData });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos();
    }
  }, [videos]);

  const onLayoutEditorWidth = () => {
    const editorContainerWidth = document.getElementById(
      'video-notes-container'
    ).offsetWidth;
    if (editorContainerWidth) {
      setEditorWidth(editorContainerWidth);
    }
  };

  const debouncedEditorLayout = () => {
    debounce(onLayoutEditorWidth(), 300);
  };

  useEffect(() => {
    onLayoutEditorWidth();
    window.addEventListener('resize', debouncedEditorLayout);
    return () => {
      window.removeEventListener('resize', debouncedEditorLayout);
    };
  }, []);

  const goBack = () => {
    goto(`/topic/${selectedTopic}/videos`);
  };

  return (
    <div className='center w-100 ph2 h-100 video-page-container'>
      <div className={classes.videoNotesContainer} id='video-notes-container'>
        <div>
          <NoteHeader
            onBack={goBack}
            onDelete={() => {}}
            title={video.title}
            saving={false}
          />
        </div>
        <MarkdownEditor
          initialContent={{ type: 'md', content: '' }}
          styles={styles}
          height={window.innerHeight}
          onSave={() => {}}
          onDelete={() => {}}
        />
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
