import React, { useState, useEffect, useRef } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles, useTheme } from 'react-jss';
import { goto } from '../../util';
import { getVideos, deleteVideo } from '../../clib/api';
import { NoteHeader } from '../../components/NoteHeader';
import ResourceDialog from '../../components/ResourceDialog';
import { uploadToBucket, getFile } from '../../clib/S3';
import { notify } from '../../state/Actions';
import { CursorState } from "../../types";

const useStyles = createUseStyles({
  videoTitleContainer: {
    textAlign: 'center',
  },
  videoNotesContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '45%',
    padding: 2,
    height: '100%',
  },
  iframeContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '55%',
    height: '100%',
  },
  iframeMobileContainer:{
    height: 300,
    marginBottom: 3
  },
  title: {
    padding: 0,
    margin: '5px 0px 12px 0px',
    color: 'white',
  },
  header: {
    background: "#333",
    width: "100%",
    display: "flex",
    color: "white",
    fontSize: 13,
    padding: 10
  },
  backBtn: {
    padding: 5,
    cursor: "pointer",
    marginRight: 10
  },
  videoTitleMobile: {
    padding: 4
  }
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

const MobileLayout = ({
  noteMd,
  loadingNote,
  onSave,
  onDelete,
  codeMirrorHandle,
  video,
  goBack
 }) => {

  const classes = useStyles()
  const [showNotes, setShowNotes] = useState(false)

  return (
    <>
      <div className={classes.header}>
        <div className={classes.backBtn} onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className={classes.videoTitleMobile}>{video.title}</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: video.iframe }} className={classes.iframeMobileContainer}>
      </div>
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
    </>
  )

}

const DesktopLayout = ({
  noteMd,
  loadingNote,
  onSave,
  onDelete,
  codeMirrorHandle,
  video,
  goBack
}) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.videoNotesContainer} id='video-notes-container'>
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
            title={video.title}
            onBack={goBack}
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
            title={video.title}
            onBack={goBack}
          />
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: video.iframe }}
        className={classes.iframeContainer}
      >
      </div>
    </>
  )
}



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
  height: '95vh',
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
  const [cmdControl, setCMDControl] = useState<CursorState>();
  const [isMobile, setIsMobile] = useState(null)
  const cmRef = useRef()
  const classes = useStyles();
  const video = videos.data ? videos.data[selectedResourceId] : false;



  
  useEffect(() => {
    if (window.innerWidth < 1108) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    window.addEventListener("resize", checkDisplaySize)
    document.addEventListener('keydown', commandListener)
    return () => {
      document.removeEventListener('keydown', commandListener)
      window.removeEventListener("resize", checkDisplaySize)
    }
  }, [])

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos();
    } else if (video) {
      fetchNoteData(`${video.id}_video.md`);
    }
  }, [video, videos]);

  const checkDisplaySize = (evt) => {
    if (evt.target.innerWidth < 1108) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // const setupVideoPlayer = () => {
  //   // 2. This code loads the IFrame Player API code asynchronously.
  //   var tag = document.createElement('script');

  //   tag.src = "https://www.youtube.com/iframe_api";
  //   var firstScriptTag = document.getElementsByTagName('script')[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //   var player;
  //   player = new YT.Player('player', {
  //     height: '390',
  //     width: '640',
  //     videoId: 'M7lc1UVf-VE',
  //     events: {
  //       'onReady': onPlayerReady,
  //       'onStateChange': onPlayerStateChange
  //     }
  //   });
  // }

  const closeCMDDialog = () => {
    setCMDControl(null)
    document.removeEventListener("click", closeCMDDialog)
  }

  const commandListener = (event) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "/": {
          // @ts-ignore
          const absPos = cmRef.current.cursorCoords(true)
          // @ts-ignore
          const cursorPos = cmRef.current.getCursor()
          setCMDControl({ absPos, cursorPos })
          document.addEventListener("click", closeCMDDialog)
          break;
        }
      }   
    }
  }

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

  const onDelete = async () => {
    const yesDelete = window.confirm("Are you sure you want to delete this video")
    try {
      if (yesDelete) {
        await deleteVideo(videos.data[selectedResourceId].id)
        goBack()
      }
    } catch(e) {
      notify(dispatch, 'Could not delete video', 'error', 'right');
    }
  };

  const codeMirrorHandle = (cm) => {
    cmRef.current = cm
  };

  const goBack = () => {
    goto(`/topic/${selectedTopic}/videos`);
  };

  return (
    <div className='center w-100 h-100 video-page-container'>
      {isMobile ? (
        <MobileLayout
          video={video}
          noteMd={noteMd}
          loadingNote={loadingNote}
          onSave={onSave}
          onDelete={onDelete}
          codeMirrorHandle={codeMirrorHandle}
          goBack={goBack}
        />
      ): (
        <DesktopLayout
          noteMd={noteMd}
          loadingNote={loadingNote}
          onSave={onSave}
          onDelete={onDelete}
          codeMirrorHandle={codeMirrorHandle}
          video={video}
          goBack={goBack}
        />
      )}
      {cmdControl && (
          <ResourceDialog selection={cmdControl} cm={cmRef.current} topic_id={selectedTopic} />
      )}
    </div>
  );
};
