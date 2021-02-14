import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  videoCardTitleLoading: {
    backgroundColor: 'gray',
    padding: 4,
    borderRadius: 4,
  },
  videoCardSubTitleLoading: {
    backgroundColor: 'gray',
    marginTop: 10,
    padding: 4,
    borderRadius: 4,
    width: "50%"
  },
  videCardImageLoading: {
    height: 190,
    backgroundColor: '#121111',
  },
});

export const LoadingVideo = () => {
  const classes = useStyles();

  return (
    <div className='fl w-100 w-50-m w-33-l ph2 pv1'>
      <article
        style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
        className='br2 video-card w-100 pointer'
      >
        <div style={{ flex: 1, height: 90}}>
          <div className={classes.videCardImageLoading}></div>
        </div>
        <div style={{ flex: 2, margin: "20px 10px 0px 10px" }}>
            <div className={classes.videoCardTitleLoading}></div>
            <div className={classes.videoCardSubTitleLoading}></div>
        </div>
      </article>
    </div>
  );
};
