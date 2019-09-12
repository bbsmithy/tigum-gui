import React, { useState, ChangeEvent } from "react";
import { NewNote } from "../../components";
import { Modal } from "../../components/Modal";
import { createNote, getNotes, updateTopic } from "../../client-lib";
import { AppContext } from "../../contexts/AppContext";

export const AllNotes = (props: any) => {
  const [newNoteModalIsOpen, setNewNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const appContext = AppContext;

  console.log(props);

  const toggleModal = () => {
    setNewNoteModalOpen(!newNoteModalIsOpen);
  };

  const updateTopicContent = async (newNoteId: number) => {
    const res = await updateTopic({
      ...props.topic,
      topic_content: [...props.topic.topic_content, newNoteId]
    });
    return await res;
  };

  const createNewNote = async () => {
    const res = await createNote(noteTitle);
    if (res.status === 200) {
      const body = await res.json();
      const topicUpdate = await updateTopicContent(body.id);
      if (topicUpdate.status === 200) {
        toggleModal();
        setNoteTitle("");
      }
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setNoteTitle(e.currentTarget.value);
  };

  return (
    <div className="topic-section-container">
      <NewNote onClick={toggleModal} />
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
