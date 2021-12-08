import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NewButton, Note, LoadingCard } from '../../components';
import { Modal } from '../../components/Modal';
import { createNote, getNotes } from '../../clib/api';
import { useStateValue } from '../../state/StateProvider';
import { ADD_NOTE } from '../../state/ActionTypes';
import { setPageTitle } from '../../util';
import FeedbackButton from '../../components/FeedbackButton';

export const AllNotes = (props: any) => {
  const [newNoteModalIsOpen, setNewNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [creatingNote, setCreatingNote] = useState(false);
  const [runningAction, setRunningAction] = useState("")

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { notes, selectedTopic, topics },
  } = state;

  const toggleModal = () => {
    setNewNoteModalOpen(!newNoteModalIsOpen);
  };

  const fetchNotes = async (topic_content: Array<number>) => {
    try {
      setLoading(true);
      const body = await getNotes(topic_content);
      dispatch({ type: 'SET_NOTES', payload: body });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageTitle(`${topics.data[selectedTopic].title} | Notes`);
    fetchNotes(topics.data[selectedTopic].notes);
  }, [topics.data[selectedTopic].notes]);

  const createNewNote = async () => {
    setRunningAction("Create")
    setCreatingNote(true);
    const res = await createNote(noteTitle, topics.data[selectedTopic].id);
    if (res.status === 200) {
      const newNote = await res.json();
      dispatch({ type: ADD_NOTE, payload: newNote });
      toggleModal();
      setNoteTitle('');
      setRunningAction("")
      setCreatingNote(false);
    } else {
      setRunningAction("");
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setNoteTitle(e.currentTarget.value);
  };

  const renderNotes = () => {
    if (!loading) {
      if (notes.keys && notes.keys.length && notes.data) {
        return notes.keys.map((noteKey: number) => {
          if (notes.data[noteKey]) {
            return <Note note={notes.data[noteKey]} key={noteKey} />;
          }
        });
      } else {
        return (
          <div className='no-resources-message'>
            <i className='fas fa-pen-square' /> <span>No notes yet</span>
          </div>
        );
      }
    } else {
      return <LoadingCard />;
    }
  };

  const actions = [{
    text: "Create",
    textColor: "white",
    btnColor: "blue",
    action: createNewNote,
    position: "right"
  }]

  return (
    <div className='ph2 pb4 mb4 mt4 pt3'>
      <NewButton onClick={toggleModal} />
      <FeedbackButton />
      {renderNotes()}
      <Modal
        title='New Note'
        actions={actions}
        display={newNoteModalIsOpen}
        toggleModal={toggleModal}
        buttonText='Create Note'
        loadingAction={runningAction}
      >
        <input
          type='text'
          placeholder='Note Title'
          id='topic-title-input'
          value={noteTitle}
          onChange={onChangeTitle}
        />
      </Modal>
    </div>
  );
};
