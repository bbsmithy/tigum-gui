import React, { useState, useEffect } from 'react';
// import TextEditor from '../../components/Editor/TextEditor';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { debounce, goto } from '../../util';
import { getVideos } from '../../clib/api';

const useStyles = createUseStyles({
  videoTitleContainer: {
    textAlign: 'center',
  },
  videoNotesContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '40%',
    height: '100%',
  },
  iframeContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '60%',
    height: '100%',
  },
});

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
      <div
        className={classes.videoNotesContainer}
        id='video-notes-container'
      ></div>
      {video && (
        <>
          {editorWidth && (
            <div />
            // <TextEditor
            //   title={video.title}
            //   width={editorWidth}
            //   htmlContent={'<h1>Saved video notes</h1>'}
            //   saving={false}
            //   onSave={(html) => {
            //     console.log(html);
            //   }}
            //   onDelete={() => {
            //     console.log('delete thing');
            //   }}
            //   onBack={goBack}
            // />
          )}
          <div
            dangerouslySetInnerHTML={{ __html: video.iframe }}
            className={classes.iframeContainer}
          ></div>
        </>
      )}
    </div>
  );
};
