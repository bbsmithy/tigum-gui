import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  videoCardTitleLoading: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  videCardImageLoading: {
    height: 190,
    backgroundColor: '#121111',
  },
});

export const LoadingVideo = () => {
  const classes = useStyles();

  return (
    <div className='w-100 w-50-m w-25-l dib ph2'>
      <article className='br2 video-card w-100 pointer mt2'>
        <div
          className={`db w-100 br2 br--top h3 ${classes.videCardImageLoading}`}
        />
        <div className='ph3 pv3 h-30'>
          <div className='dib w-90'>
            <div className={classes.videoCardTitleLoading}></div>
          </div>
        </div>
      </article>
    </div>
  );
};
