import React from 'react';
import { createUseStyles } from 'react-jss';

type NoteHeaderProps = {
  title: string;
  saving: boolean;
  onBack: () => void;
  onDelete?: () => void;
};

const useStyles = createUseStyles(() => ({
  btn: {
    backgroundColor: '#333',
    color: 'white',
    padding: '3px 10px 3px 10px',
    border: 'none',
    fontSize: 12,
    borderRadius: 4,
    height: 30,
    marginRight: 4,
    cursor: 'pointer',
    display: 'inline',
  },
  deleteBtn: {
    float: 'right',
  },
  header: {
    display: 'inline',
    marginLeft: 10,
  },
  headerContainer: {
    marginBottom: 10,
    marginTop: 0,
  },
}));

export const NoteHeader = (props: NoteHeaderProps) => {
  const { onBack, title, saving, onDelete } = props;
  const classes = useStyles();

  const deleteNote = () => {
    const yesDelete = window.confirm(
      'Are you sure you want to delete this note?'
    );
    if (yesDelete) {
      onDelete();
    }
  };

  return (
    <div className={classes.headerContainer}>
      <button className={classes.btn} onClick={onBack}>
        <i className='fa fa-arrow-left' />
      </button>
      <h3 className={`${classes.header} white`}>{title}</h3>
      {saving && (
        <span className='white bg-black pa2 ma1 br1 f6'>
          Saving <i className='ml1 fas fa-circle-notch fa-spin'></i>
        </span>
      )}
      {onDelete && (
        <button
          className={`${classes.deleteBtn} ${classes.btn}`}
          onClick={deleteNote}
        >
          <i className='fa fa-trash' />
        </button>
      )}
    </div>
  );
};
