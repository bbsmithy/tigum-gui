import React, { useState, ChangeEvent, useEffect } from "react";
import { NewNote, Note } from "../../components";
import { Modal } from "../../components/Modal";
import { createNote, getNotes, updateTopic } from "../../client-lib";
import { AppContext } from "../../contexts/AppContext";

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
    fetchNotes(props.topic.topic_content);
  }, []);

  useEffect(() => {
    fetchNotes(props.topic.topic_content);
  }, [props.topic.topic_content]);

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

  const renderNotes = () => notes.map(note => <Note title={note.title} />);

  return (
    <div className="topic-section-container">
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
