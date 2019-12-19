import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { NewButton, Note } from "../../components";
import { Modal } from "../../components/Modal";
import { createNote, getNotes, updateTopic } from "../../client-lib/api";
import { NOTE_SCREENS } from "../../routers/NoteRouter";
import { useStateValue } from "../../state/StateProvider";

const useStyles = createUseStyles({
  headerLoadingNote: {
    width: "70%",
    padding: 6,
    marginTop: 10,
    background: "#efefef",
    height: 6
  },
  dateLoadingNote: {
    width: "50%",
    padding: 3,
    marginTop: 10,
    background: "#efefef",
    height: 6
  }
});

export const AllNotes = (props: any) => {
  const [newNoteModalIsOpen, setNewNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: {
      notes,
      selectedTopic,
      topics: { data }
    }
  } = state;

  const toggleModal = () => {
    setNewNoteModalOpen(!newNoteModalIsOpen);
  };

  const topic = data[selectedTopic];

  const fetchNotes = async (topic_content: Array<number>) => {
    try {
      const res = await getNotes(topic_content);
      if (res.status === 200) {
        const body = await res.json();
        dispatch({ type: "SET_NOTES", payload: body.reverse() });
        setLoading(false);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchNotes(topic.notes);
  }, [topic.notes]);

  const createNewNote = async () => {
    const res = await createNote(noteTitle, topic.id, 123);
    if (res.status === 200) {
      const newNote = await res.json();
      dispatch({ type: "ADD_NOTE", payload: newNote });
      toggleModal();
      setNoteTitle("");
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setNoteTitle(e.currentTarget.value);
  };

  const onClickNote = (note: any) => {
    props.navigate(NOTE_SCREENS.VIEW_NOTE, note);
  };

  const renderLoading = () => {
    return (
      <div className="card note-card">
        <div className="mw9 center">
          <div className="cf ph2-ns pb4">
            <div className="fl ph2 w-90 pv1">
              <div className="bg-white">
                <div className={classes.headerLoadingNote}></div>
                <div className={classes.dateLoadingNote}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNotes = () => {
    return notes.map((note: any) => (
      <Note note={note} key={note.id} onClick={onClickNote} />
    ));
  };

  const renderNoNotes = () => {
    return (
      <div className="no-resources-message">
        <i className="fas fa-pen-square" /> <span>No notes yet</span>
      </div>
    );
  };

  return (
    <div className="ph2 mt4 pt3">
      <NewButton onClick={toggleModal} text="New Note" />
      {loading ? renderLoading() : renderNotes()}
      {!notes.length && !loading && renderNoNotes()}
      <Modal
        title="New Note"
        display={newNoteModalIsOpen}
        toggleModal={toggleModal}
        buttonText="Add Note"
        onClickAction={createNewNote}
      >
        <input
          type="text"
          placeholder="Note Title"
          id="topic-title-input"
          value={noteTitle}
          onChange={onChangeTitle}
        />
      </Modal>
    </div>
  );
};
