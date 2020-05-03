import React from 'react';
import { truncated } from '../util';
import { OptionsButton } from './OptionsButton';
import { deleteVideo } from '../clib/api';
import { createUseStyles } from 'react-jss';

type VideoCardProps = {
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
    textOverflow: 'ellipsis',
    /* Required for text-overflow to do anything */
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    '@media (max-width: 1196px)': {
      fontSize: 12,
    },
  },
});

export const VideoCard = (props: VideoCardProps) => {
  const classes = useStyles();

  const onSelect = () => {
    props.onClick({ title: props.title, iframe: props.iframe, id: props.id });
  };

  const onClickDelete = async () => {
    try {
      await deleteVideo(props.id);
      props.onDelete(props.id, props.topicId);
    } catch (e) {
      console.log(e);
    }
  };

  const videoCardOptions = [
    {
      title: 'Delete',
      icon: 'fas fa-trash',
      onClick: onClickDelete,
    },
  ];

  const title = truncated(props.title, 50);

  return (
    <div className='w-100 w-50-m w-25-l dib ph2'>
      <article className='br2 video-card w-100 pointer mt2' onClick={onSelect}>
        <img src={props.thumbnail_img} className='db w-100 br2 br--top' />
        <div className='ph3 pv3 h-30'>
          <div className='dib w-90'>
            <h5 className={`mv0 white ${classes.videoCardTitle}`}>{title}</h5>
          </div>
          <div className='dib w-10'>
            <OptionsButton options={videoCardOptions} />
          </div>
        </div>
      </article>
    </div>
  );
};
