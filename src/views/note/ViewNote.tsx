import React, { useEffect, useRef, useState } from "react";
import { MarkdownEditor } from "../../components/MarkdownEditor/lib";
import {
  deleteNote,
  getAllTopicResources,
  getNotes,
  updateNote,
  updateTopicModDate,
} from "../../clib/api";
import {
  deleteImage,
  getFile,
  uploadImageandGetPublicUrl,
  uploadProfilePictureAndUpdateUser,
  uploadToBucket,
} from "../../clib/S3";
import { debounce, goto, setPageTitle } from "../../util";
import { useStateValue } from "../../state/StateProvider";
import ResourceDialog from "../../components/ResourceDialog";
import { notify } from "../../state/Actions";
import { CursorState } from "../../types";
import { createUseStyles } from "react-jss";
import { ImageSelectionDialog } from "../../components/ImageSelectionDialog";
import { resourceResponseToState } from "../../state/StateHelpers";
import { SET_RESOURCES_FOR_TOPIC } from "../../state/ActionTypes";

const theme = {
  toolbar: {
    background: "#333",
    color: "white",
    activeBtnBackground: "#242020",
    activeBtnColor: "white",
    disabledBtnBackground: "gray",
    disabledBtnColor: "#333",
  },
  preview: { background: "#333", color: "white" },
  editor: { background: "#333", color: "white" },
  cursorColor: "white",
  height: "90vh",
};

const useStyles = createUseStyles({
  loadingSpinner: {
    fontSize: 40,
    marginTop: "30%",
  },
  loadingSpinnerContainer: {
    textAlign: "center",
    height: window.innerHeight,
    width: "100%",
  },
});

export const ViewNote = (props: any) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [md, setNoteMD] = useState<any>("");
  const [loadingHTML, setLoadingHTML] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cmdControl, setCMDControl] = useState<CursorState>();
  const [imageSelectionDialog, setImageSelectionDialog] = useState<{
    x: number;
    y: number;
    height: number;
    width: number;
  }>();
  const [uploadingImageFile, setUploadingImageFile] = useState(false);
  const diffCheckerWorkerRef = useRef<Worker>();
  const cmRef = useRef();
  const simpleMDERef = useRef();
  const initialNoteMDRef = useRef<string>();
  const classes = useStyles();
  const {
    content: {
      selectedResourceKey,
      selectedResourceId,
      notes,
      selectedTopic,
      topics,
      resources,
      isLoadingResources,
    },
  } = state;

  const currentTopic = topics.data ? topics.data[selectedTopic] : false;
  const note =
    currentTopic && !isLoadingResources && resources
      ? resources[currentTopic.id][selectedResourceKey]
      : false;

  console.log("note: ", note, selectedResourceKey);

  const openImageFiles = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // add onchange handler if you wish to get the file :)
    input.id = "image-input-uploader";
    input.onchange = async (evt) => {
      // @ts-ignore
      var files = evt.target.files; // FileList object
      var file = files[0];
      try {
        setUploadingImageFile(true);
        const imageUrl = await uploadImageandGetPublicUrl({
          // @ts-ignore
          data: file,
          type: file.type,
          fileName: file.name.replaceAll(" ", "_"),
        });
        // @ts-ignore
        insertNewImageUrl(imageUrl);
        setUploadingImageFile(false);
        input.remove();
        setImageSelectionDialog(null);
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    input.click();
  };

  const toolbarOptions = [
    {
      name: "home",
      action: function customFunction(editor) {
        goto(`topic/${selectedTopic}/notes`);
      },
      className: "fa fa-home",
      title: "Custom Button",
    },
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "ordered-list",
    "unordered-list",
    "|",
    {
      name: "resource",
      action: function customFunction(editor) {
        showReferenceDialog();
      },
      className: "fa fa-book",
      title: "Find Resource",
    },
    "code",
    {
      name: "latex",
      action: () => {
        // @ts-ignore
        const cursorPos = cmRef.current.getCursor();
        if (cmRef.current) {
          // @ts-ignore
          cmRef.current.replaceRange(`$$\n\n$$`, cursorPos);
          // @ts-ignore
          cmRef.current.focus();
          // @ts-ignore
          cmRef.current.setCursor({
            line: cursorPos.line + 1,
            ch: 0,
          });
        }
      },
      className: "fas fa-square-root-alt",
      title: "LaTex",
    },
    "link",
    {
      name: "image",
      action: function openImageSelectionDialog() {
        const imageBtn = document.getElementsByClassName("fa fa-picture-o")[0];
        setImageSelectionDialog(imageBtn.getBoundingClientRect());
      },
      className: "fa fa-picture-o",
      title: "Upload Image",
    },
    "table",
    "|",
    "preview",
    "fullscreen",
    "side-by-side",
    "guide",
    "|",
  ];

  useEffect(() => {
    return () => {
      if (cmRef.current) {
        // @ts-ignore
        const currentMD = cmRef.current.getValue();
        if (currentMD !== initialNoteMDRef.current) {
          save(currentMD);
        }
      }
      if (diffCheckerWorkerRef.current) {
        // @ts-ignore
        diffCheckerWorkerRef.current.terminate();
        diffCheckerWorkerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setupNote();
  }, [selectedResourceId]);

  useEffect(() => {
    if (note) {
      setPageTitle(`${note.title} | ${currentTopic.title}`);
    }
  }, [note]);

  const setupNote = () => {
    if (!note) {
      fetchNotes();
    } else {
      getNoteData(selectedResourceId);
    }
    document.addEventListener("keydown", commandListener);
    return () => {
      document.removeEventListener("keydown", commandListener);
    };
  };

  const closeCMDDialog = () => {
    setCMDControl(null);
  };

  const commandListener = (event) => {
    if (event.ctrlKey && event.key === "/") {
      if (cmRef.current !== undefined) {
        showReferenceDialog();
      }
    } else if (event.ctrlKey && event.key === "i") {
      openImageFiles();
    }
  };

  const insertNewImageUrl = (url) => {
    let parsedUrl = url.replaceAll(" ", "%20");
    // @ts-ignore
    const cursorPos = cmRef.current.getCursor();
    // @ts-ignore
    cmRef.current.replaceRange(`![](${parsedUrl})`, cursorPos);
  };

  const showReferenceDialog = () => {
    // @ts-ignore
    const absPos = cmRef.current.cursorCoords(true);
    // @ts-ignore
    const cursorPos = cmRef.current.getCursor();
    setCMDControl({ absPos, cursorPos });
  };

  const getNoteData = async (noteId: number) => {
    try {
      setLoadingHTML(true);
      const noteHTML = await getFile(`${noteId}.md`, "notes");
      setNoteMD(noteHTML);
      setLoadingHTML(false);
      initialNoteMDRef.current = noteHTML;
    } catch (e) {
      setLoadingHTML(false);
    }
  };

  const fetchNotes = async () => {
    try {
      const topicId = topics.data[selectedTopic].id;
      const resourcesForTopic = await getAllTopicResources(topicId);
      dispatch({
        type: SET_RESOURCES_FOR_TOPIC,
        payload: {
          topicId,
          resources: resourceResponseToState(resourcesForTopic),
        },
      });
      getNoteData(selectedResourceId);
    } catch (e) {
      console.log(e);
    }
  };

  const save = async (MD) => {
    try {
      notify(dispatch, "Saving notes", "progress", "right");
      setNoteMD(MD);
      await uploadToBucket(MD, `${selectedResourceId}.md`, "notes");
      await updateTopicModDate(selectedTopic);
      setTimeout(
        () => notify(dispatch, "Saved successfully", "success", "right"),
        150
      );
    } catch (e) {
      notify(dispatch, "Could not upload notes", "error", "right");
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
      updateNote({ ...note, title: newTitle });
    }
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
    cmRef.current = cm;
  };

  const handleCodeMirrorChanges = debounce((val) => {
    diffCheckerWorkerRef.current.postMessage(val);
  }, 1000);

  const autoSaveOnChangeFinished = debounce((val) => {
    save(val);
  }, 3500);

  const simpleMdeHandle = (simpleMDE) => {
    simpleMDERef.current = simpleMDE;
    if (simpleMDERef.current) {
      diffCheckerWorkerRef.current = new Worker("./documentDiffListener.js");
      diffCheckerWorkerRef.current.addEventListener("message", (msg) => {
        switch (msg.data.action) {
          case "DELETE_IMAGES": {
            const deleteImageReqs = msg.data.deletedImageUrls.map((url) => {
              let fileName = url.replace(
                "https://images-tigum.cellar-c2.services.clever-cloud.com/",
                ""
              );
              return deleteImage(fileName);
            });
            Promise.all(deleteImageReqs)
              .then((res) => {
                console.log("Success", res);
              })
              .catch((err) => {
                console.log("Error: ", err);
              });
            console.log("received ww urls: ");
            break;
          }
        }
      });
      // @ts-ignore
      simpleMDERef.current.codemirror.on("changes", () => {
        // @ts-ignore
        const val = simpleMDERef.current.value();
        handleCodeMirrorChanges(val);
        autoSaveOnChangeFinished(val);
      });
    }
  };

  const onClickNote = (evt) => {
    evt.preventDefault();
    const el = evt.target;
    if (el.tagName === "A" && el.href) {
      if (el.href.includes("tigum.io")) {
        const localUrl = el.href.split("tigum.io")[1];
        goto(localUrl);
      } else {
        window.open(el.href, "blank");
      }
    }
  };

  const onDoubleClick = () => {
    // @ts-ignore
    if (simpleMDERef.current && simpleMDERef.current.isPreviewActive()) {
      // @ts-ignore
      simpleMDERef.current.togglePreview();
    }
  };

  if (note) {
    return (
      <div
        className="z-1 center w-100-m w-70-l w-100"
        id="view-note-container"
        onClick={onClickNote}
        onDoubleClick={onDoubleClick}
      >
        {imageSelectionDialog && (
          <ImageSelectionDialog
            x={imageSelectionDialog.x}
            y={imageSelectionDialog.y - imageSelectionDialog.height + 15}
            uploading={uploadingImageFile}
            onClickAway={() => {
              setImageSelectionDialog(null);
            }}
            insertNewImageUrl={insertNewImageUrl}
            openImageFiles={openImageFiles}
          />
        )}
        {loadingHTML && (
          <div className={classes.loadingSpinnerContainer}>
            <i
              className={`fas fa-circle-notch fa-spin white ${classes.loadingSpinner}`}
            ></i>
          </div>
        )}
        {!loadingHTML && selectedResourceId && (
          <MarkdownEditor
            initialValue={md}
            onSave={onSave}
            onDelete={onClickDelete}
            codeMirrorHandle={codeMirrorHandle}
            simplemdeHandle={simpleMdeHandle}
            spellChecker
            useHighlightJS
            toolbarOptions={toolbarOptions}
            highlightTheme="ally-dark"
            previewClassName="editor-preview-side"
            theme={theme}
            onBack={goBack}
            title={note.title}
            onEditTitle={onEditTitle}
            editTitleWidth={"50%"}
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
