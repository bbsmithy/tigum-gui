import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  documentTitle: {
    display: 'block',
    fontSize: 16,
    textOverflow: 'ellipsis',
    /* Required for text-overflow to do anything */
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  documentSubTitle: {
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

export const LinkCard = (props: any) => {
  const classes = useStyles();

  return (
    <div className='fl w-100 w-50-m w-33-l ph2 pv1'>
      <a
        href={props.link.source}
        target='blank'
        className='card note-card pointer w-100'
      >
        <div className='mw9 center'>
          <div className='cf ph2-ns'>
            <div className='fl ph2 w-90 pv1'>
              <div>
                <h4 className={classes.documentTitle}>{props.link.title}</h4>
                <b className={classes.documentSubTitle}>{props.link.source}</b>
              </div>
            </div>
            <div className='fl w-10 pv4'>
              <div>
                <i className='fas fa-chevron-right'></i>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
