import React from 'react';
import { getDate, truncated } from '../util';
import { createUseStyles } from 'react-jss';

type VideoCardProps = {
  date_created: string;
  date_updated: string;
  iframe: string;
  title: string;
  thumbnail_img: string;
  id: number;
  topicId: number;
  index: number;
  onClick: (video: any) => void;
  onDelete: (id: number, topic_id: number) => void;
};

const useStyles = createUseStyles({
  videoCardTitle: {
    '@media (max-width: 1196px)': {
      justifyContent: "center",
      alignItem: "center"
    },
    '@media (min-width: 1196px)': {
      marginTop: 12,
      marginBottom: 0
    },
    fontSize: 12,
  },
  videoCardImage: {
    backgroundColor: "black",
    height: "100%"
  },
  videoCardTextContent: { 
    flex: 2, 
    margin: "0px 10px 0px 10px", 
    '@media (max-width: 1196px)': {
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
},
  subTitle: {
    color: 'gray',
    fontSize: 11,
    fontStyle: 'italic',
    display: 'block',
    marginBottom: 10,
    textOverflow: 'ellipsis',
    /* Required for text-overflow to do anything */
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '@media (max-width: 1196px)': {
      display: "none",
    }
  },
});

export const VideoCard = (props: VideoCardProps) => {
  const classes = useStyles();

  const onSelect = () => {
    props.onClick({ title: props.title, iframe: props.iframe, id: props.id });
  };

  const renderDate = () => {
    const dateText = new Date(props.date_updated);
    return getDate(dateText);
  };

  const title = truncated(props.title, 100);

  return (
    <div className='fl w-100 w-50-m w-33-l ph2 pv1'>
      <article
        style={{ display: "flex", flexDirection: "row", overflow: "hidden" }}
        className='br2 video-card w-100 pointer' onClick={onSelect}
      >
        <div style={{ flex: 1, height: 90}}>
          <img src={props.thumbnail_img} className={`${classes.videoCardImage}`} />
        </div>
        <div className={classes.videoCardTextContent}>
          <h6 className={`white ${classes.videoCardTitle}`}>{title}</h6>
          <p className={`${classes.subTitle} white`}>{renderDate()}</p>
        </div>
      </article>
    </div>
  );
};
