import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { NewButton, Note } from "../../components";
import { Modal } from "../../components/Modal";
import { createNote, getNotes, updateTopic } from "../../client-lib/api";
import { NOTE_SCREENS } from "../../routers/NoteRouter";

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
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const toggleModal = () => {
    setNewNoteModalOpen(!newNoteModalIsOpen);
  };

  const fetchNotes = async (topic_content: Array<number>) => {
    try {
      const res = await getNotes(topic_content);
      if (res.status === 200) {
        const body = await res.json();
        setNotes(body.reverse());
        setLoading(false);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchNotes(props.topic.notes);
  }, [props.topic.notes]);

  const updateTopicContent = async (newNoteId: number) => {
    return await updateTopic({
      ...props.topic,
      notes: [...props.topic.notes, newNoteId]
    });
  };

  const createNewNote = async () => {
    const res = await createNote(noteTitle, props.topic.id, 123);
    if (res.status === 200) {
      const body = await res.json();
      const topicUpdate = await updateTopicContent(body.id);
      const topicJson = await topicUpdate.json();
      if (topicUpdate.status === 200) {
        props.setTopic(topicJson);
        toggleModal();
        setNoteTitle("");
      }
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
      <div className="card w-25">
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
    return notes.map(note => (
      <Note note={note} key={note.note_id} onClick={onClickNote} />
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
