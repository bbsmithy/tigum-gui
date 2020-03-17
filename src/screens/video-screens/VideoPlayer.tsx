import React, { useState, useEffect } from 'react';
import TextEditor from '../../components/Editor/TextEditor';
import { VIDEO_SCREENS } from '../../routers/VideoRouter';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { debounce } from '../../util';

const useStyles = createUseStyles({
  videoTitleContainer: {
    textAlign: 'center'
  },
  videoNotesContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%'
  },
  iframeContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%'
  }
});

export const VideoPlayer = (props: any) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const classes = useStyles();
  const [editorWidth, setEditorWidth] = useState();

  const onLayoutEditorWidth = () => {
    const editorContainerWidth = document.getElementById(
      'video-notes-container'
    ).offsetWidth;
    setEditorWidth(editorContainerWidth);
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
    dispatch({ type: 'SHOW_TOPIC_NAVBAR' });
    props.navigate(VIDEO_SCREENS.ALL_VIDEOS, {});
  };

  return (
    <div className='center w-100 ph2 h-100 video-page-container'>
      <div className={classes.videoNotesContainer} id='video-notes-container'>
        {editorWidth && (
          <TextEditor
            title={props.title}
            width={editorWidth}
            htmlContent={'<h1>Saved video notes</h1>'}
            saving={false}
            onSave={html => {
              console.log(html);
            }}
            onDelete={() => {
              console.log('delete thing');
            }}
            onBack={goBack}
          />
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: props.iframe }}
        className={classes.iframeContainer}
      ></div>
    </div>
  );
};
