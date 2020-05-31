import React from 'react';
import { createUseStyles } from 'react-jss';

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

export const LoadingCard = () => {
  const classes = useStyles();
  return (
    <div className='w-100 w-50-m w-33-l ph2 pv1'>
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
