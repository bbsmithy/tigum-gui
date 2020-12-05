import React, { useState, useEffect, useRef } from 'react';
import { MarkdownEditor } from 'devkeep-md-editor';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { goto, getJsonFromUrl } from '../../util';
import { getVideos, deleteVideo } from '../../clib/api';
import ResourceDialog from '../../components/ResourceDialog';
import ReferenceDialog from '../../components/ReferenceDialog';
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
  simpleMdeHandle,
  video,
  goBack,
  onDoubleClick,
  onClickNote
 }) => {

  const classes = useStyles()
  const vidIDRef = useRef()
  const playerRef = useRef()


  useEffect(() => {
    if (video && video.id !== vidIDRef.current) {
      const videoId = video.iframe.slice(30)
      const iframeContainer = document.getElementById('mobile-vid').parentElement
      document.getElementById('mobile-vid').remove()
      const newDiv = document.createElement('div')
      newDiv.id = "mobile-vid"
      iframeContainer.insertAdjacentElement("beforeend", newDiv)
      // @ts-ignore
      playerRef.current = new window.YT.Player('mobile-vid', {
        videoId,
        height: "100%",
        width: "100%"
      })
      vidIDRef.current = videoId
    }
  }, [video])

  return (
    <>
      <div className={classes.header}>
        <div className={classes.backBtn} onClick={goBack}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className={classes.videoTitleMobile}>{video.title}</div>
      </div>
      <div className={classes.iframeMobileContainer}>
        <div id="mobile-vid">
        </div>
      </div>
      <div
        onDoubleClick={onDoubleClick}
        onClick={onClickNote}
      >
      {noteMd && !loadingNote && (
            <MarkdownEditor
              initialValue={noteMd}
              onSave={onSave}
              onDelete={onDelete}
              codeMirrorHandle={codeMirrorHandle}
              simpleMdeHandle={simpleMdeHandle}
              spellChecker={false}
              toolbarOptions={toolbarOptions}
              useHighlightJS
              highlightTheme='agate'
              defaultView="preview"
              theme={theme}
            />
          )}
          {!noteMd && !loadingNote && (
            <MarkdownEditor
              initialValue={''}
              onSave={onSave}
              onDelete={onDelete}
              codeMirrorHandle={codeMirrorHandle}
              simpleMdeHandle={simpleMdeHandle}
              spellChecker={false}
              toolbarOptions={toolbarOptions}
              useHighlightJS
              highlightTheme='agate'
              defaultView="preview"
              theme={theme}
            />
      )}
      </div>
    </>
  )

}

const DesktopLayout = ({
  noteMd,
  loadingNote,
  onSave,
  onDelete,
  codeMirrorHandle,
  simpleMdeHandle,
  playerHandle,
  video,
  goBack,
  onDoubleClick,
  onClickNote
}) => {

  const classes = useStyles()
  const vidIDRef = useRef()
  const playerRef = useRef()

  useEffect(() => {
    if (video && video.id !== vidIDRef.current) {
      const videoId = video.iframe.slice(30)
      const iframeContainer = document.getElementById('desktop-vid').parentElement
      document.getElementById('desktop-vid').remove()
      const newDiv = document.createElement('div')
      newDiv.id = "desktop-vid"
      iframeContainer.insertAdjacentElement("beforeend", newDiv)
      // @ts-ignore
      playerRef.current = new window.YT.Player('desktop-vid', {
        videoId,
        height: "100%",
        width: "100%"
      })
      playerHandle(playerRef.current)
      vidIDRef.current = videoId
    }
  }, [video])

  const checkForRefLinks = (evt) => {
    // @ts-ignore
    onClickNote(evt, playerRef.current)
  }

  return (
    <>
      <div
        className={classes.videoNotesContainer}
        id='video-notes-container'
        onDoubleClick={onDoubleClick}
        onClick={checkForRefLinks}
      >
        {noteMd && !loadingNote && (
          <MarkdownEditor
            initialValue={noteMd}
            onSave={onSave}
            onDelete={onDelete}
            codeMirrorHandle={codeMirrorHandle}
            simplemdeHandle={simpleMdeHandle}
            spellChecker={false}
            toolbarOptions={toolbarOptions}
            useHighlightJS
            highlightTheme='agate'
            defaultView="preview"
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
            simplemdeHandle={simpleMdeHandle}
            spellChecker={false}
            toolbarOptions={toolbarOptions}
            useHighlightJS
            highlightTheme='agate'
            defaultView="preview"
            theme={theme}
            title={video.title}
            onBack={goBack}
          />
        )}
      </div>
      <div className={classes.iframeContainer}>
        <div id="desktop-vid">
        </div>
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
  preview: { background: '#333', color: 'white' },
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

  const [noteMd, setNoteMd] = useState<any>();
  const [loadingNote, setLoadingNote] = useState(true);
  const [cmdControl, setCMDControl] = useState<CursorState>();
  const [vidRefControl, setVidRefControl] = useState<CursorState>();
  const [isMobile, setIsMobile] = useState(null)

  const cmRef = useRef()
  const simpleMDERef = useRef()
  const playerRef = useRef()
  const initialNoteMDRef = useRef<string>()


  const video = videos.data ? videos.data[selectedResourceId] : false;

  
  useEffect(() => {
    // @ts-ignore
    if (window.innerWidth < 1108) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    window.addEventListener("resize", checkDisplaySize)
    document.addEventListener('keydown', commandListener)
    return () => {
      if (cmRef.current) {
        // @ts-ignore
        const currentMD = cmRef.current.getValue()
        if (currentMD !== initialNoteMDRef.current) {
          save(currentMD)
        }
      }
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
  

  const closeCMDDialog = () => {
    setCMDControl(null)
    document.removeEventListener("click", closeCMDDialog)
  }

  const closeVidRefDialog = () => {
    setVidRefControl(null)
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
        case "t": {
          // @ts-ignore
          const absPos = cmRef.current.cursorCoords(true)
          // @ts-ignore
          const cursorPos = cmRef.current.getCursor()
          setVidRefControl({ absPos, cursorPos })
          // document.addEventListener("click", closeVidRefDialog)
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
      initialNoteMDRef.current = noteData
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
        `${selectedResourceId}_video.md`,
        'video-notes'
      );
      setTimeout(
        () => {
          // @ts-ignore
          simpleMDERef.current.togglePreview()
          notify(dispatch, 'Saved successfully', 'success', 'right')
        },
        300
      );
    }
  };

  const onSave = async (md) => {
    try {
      save(md);
    } catch (e) {
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

  const simpleMdeHandle = (simpleMDE) => {
    simpleMDERef.current = simpleMDE
  }

  const playerHandle = (player) => {
    playerRef.current = player
  }

  const goBack = () => {
    window.history.back();
  };

  const onClickNote = (evt, player) => {
    evt.preventDefault()
    const el = evt.target
    if (el.tagName === "A" && el.href) {
      const baseUrl = "tigum.io"
      if (el.href.includes(baseUrl)) {
        const timeParam = el.href.split("t=")[1]
        if (timeParam) {
            player.seekTo(timeParam)
        } else {
          const localUrl = el.href.split(baseUrl)[1]
          goto(localUrl)
        }
      } else {
        window.open(el.href, "blank")
      }
    }
  }

  const switchToPreview = () => {
    // @ts-ignore
    if (simpleMDERef.current && simpleMDERef.current.isPreviewActive()) {
      // @ts-ignore
      simpleMDERef.current.togglePreview()
    }
  }

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
          simpleMdeHandle={simpleMdeHandle}
          onClickNote={onClickNote}
          onDoubleClick={switchToPreview}
          goBack={goBack}
        />
      ): (
        <DesktopLayout
          noteMd={noteMd}
          loadingNote={loadingNote}
          onSave={onSave}
          onDelete={onDelete}
          simpleMdeHandle={simpleMdeHandle}
          codeMirrorHandle={codeMirrorHandle}
          playerHandle={playerHandle}
          onClickNote={onClickNote}
          onDoubleClick={switchToPreview}
          video={video}
          goBack={goBack}
        />
      )}
      {cmdControl && (
          <ResourceDialog
            selection={cmdControl}
            onClickAway={closeCMDDialog}
            cm={cmRef.current}
            topic_id={selectedTopic}
          />
      )}
      {vidRefControl && (
          <ReferenceDialog
            onCreate={() => {}}
            onClickAway={closeVidRefDialog}
            player={playerRef.current}
            selection={vidRefControl}
            cm={cmRef.current}
            topic_id={selectedTopic}
          />
      )}
    </div>
  );
};
