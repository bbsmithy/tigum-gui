import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { NewButton, Note } from '../../components';
import { Modal } from '../../components/Modal';
import { createNote, getNotes, updateTopic } from '../../clib/api';
import { NOTE_SCREENS } from '../../routers/NoteRouter';
import { useStateValue } from '../../state/StateProvider';

const useStyles = createUseStyles({
  headerLoadingNote: {
    width: '70%',
    padding: 5,
    marginTop: 10,
    background: 'gray',
    borderRadius: 5,
    height: 6,
  },
  dateLoadingNote: {
    width: '50%',
    padding: 3,
    marginTop: 10,
    background: 'gray',
    borderRadius: 5,
    height: 6,
  },
});

export const AllNotes = (props: any) => {
  const [newNoteModalIsOpen, setNewNoteModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: {
      notes,
      selectedTopic,
      topics: { data },
    },
  } = state;

  const toggleModal = () => {
    setNewNoteModalOpen(!newNoteModalIsOpen);
  };

  const fetchNotes = async (topic_content: Array<number>) => {
    try {
      setLoading(true);
      const res = await getNotes(topic_content);
      if (res.status === 200) {
        const body = await res.json();
        dispatch({ type: 'SET_NOTES', payload: body.reverse() });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(data[selectedTopic].notes);
  }, [data[selectedTopic].notes]);

  const createNewNote = async () => {
    const res = await createNote(noteTitle, data[selectedTopic].id);
    if (res.status === 200) {
      const newNote = await res.json();
      dispatch({ type: 'ADD_NOTE', payload: newNote });
      toggleModal();
      setNoteTitle('');
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setNoteTitle(e.currentTarget.value);
  };

  const onClickNote = (note: any) => {
    dispatch({ type: 'HIDE_TOPIC_NAVBAR' });
    props.navigate(NOTE_SCREENS.VIEW_NOTE, note);
  };

  const renderLoading = () => {
    return (
      <div className='w-100 w-50-m w-33-l'>
        <div className='card note-card w-100'>
          <div className='mw9 center'>
            <div className='cf ph2-ns pb4'>
              <div className='fl ph2 w-90 pv1'>
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
    if (!loading) {
      if (notes.length) {
        return notes.map((note: any) => (
          <Note note={note} key={note.id} onClick={onClickNote} />
        ));
      } else {
        return renderNoNotes();
      }
    } else {
      return renderLoading();
    }
  };

  const renderNoNotes = () => {
    return (
      <div className='no-resources-message'>
        <i className='fas fa-pen-square' /> <span>No notes yet</span>
      </div>
    );
  };

  return (
    <div className='ph2 mt4 pt3'>
      <NewButton onClick={toggleModal} />
      {renderNotes()}
      <Modal
        title='New Note'
        display={newNoteModalIsOpen}
        toggleModal={toggleModal}
        buttonText='Add Note'
        onClickAction={createNewNote}
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
