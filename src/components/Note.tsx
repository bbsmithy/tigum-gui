import React from 'react';
import { getDate } from '../util';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  noteTitle: {
    display: 'block',
    fontSize: 16,
    textOverflow: 'ellipsis',
    /* Required for text-overflow to do anything */
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  noteSubTitle: {
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic',
    display: 'block',
    marginBottom: 10,
    textOverflow: 'ellipsis',
    /* Required for text-overflow to do anything */
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
});

export const Note = (props: any) => {
  const classes = useStyles();

  const navigateToNote = () => {
    props.onClick(props.note);
  };

  const renderDate = () => {
    const dateText = new Date(props.note.date_created);
    return getDate(dateText);
  };

  return (
    <div className='fl w-100 w-50-m w-33-l ph2 pv1'>
      <div className='card w-100 note-card pointer' onClick={navigateToNote}>
        <div className='mw9 center'>
          <div className='cf ph2-ns'>
            <div className='fl ph2 w-90 pv1'>
              <div>
                <h4 className={classes.noteTitle}>{props.note.title}</h4>
                <b className={classes.noteSubTitle}>{renderDate()}</b>
              </div>
            </div>
            <div className='fl w-10 pv4'>
              <div>
                <i className='fas fa-chevron-right'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
