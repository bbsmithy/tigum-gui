import React, { useState, ChangeEvent, useEffect } from "react";
import { NewNote, Note } from "../../components";
import { Modal } from "../../components/Modal";
import { createNote, getNotes, updateTopic } from "../../client-lib/api";
import { NOTE_SCREENS } from "../../routers/NoteRouter";

export const AllNotes = (props: any) => {
  const [newNoteModalIsOpen, setNewNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([]);

  const toggleModal = () => {
    setNewNoteModalOpen(!newNoteModalIsOpen);
  };

  const fetchNotes = async (topic_content: Array<number>) => {
    try {
      const res = await getNotes(topic_content);
      if (res.status === 200) {
        const body = await res.json();
        setNotes(body.reverse());
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchNotes(props.topic.notes);
  }, []);

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
    const res = await createNote(noteTitle);
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

  const renderNotes = () => {
    if (notes.length) {
      return notes.map(note => (
        <Note note={note} key={note.note_id} onClick={onClickNote} />
      ));
    } else {
      return (
        <div className="no-resources-message">
          <i className="fas fa-pen-square" /> <span>No notes yet</span>
        </div>
      );
    }
  };

  return (
    <div className="ph1 mt5">
      <NewNote onClick={toggleModal} />
      {renderNotes()}
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
