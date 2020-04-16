import React from 'react';
import { getDate } from '../../util';
import { goto } from '../../util';
import { Topic } from '../../clib/models';
import { createUseStyles } from 'react-jss';

interface TopicItemProps {
  topic: Topic;
  selected: boolean;
  id: number;
  onSelectItem: (id: number, topic: Topic) => void;
}

const useStyles = createUseStyles({
  topicTitle: {
    fontSize: 15,
    '@media (max-width: 1196px)': {
      fontSize: 13,
    },
  },
  topicItemSelected: {
    borderRight: '6px solid #246bf8',
  },
});

export const TopicItem = ({
  topic,
  selected,
  id,
  onSelectItem,
}: TopicItemProps) => {
  const classes = useStyles();

  const onSelect = () => {
    onSelectItem(id, topic);
  };

  const renderDate = () => {
    const dateText = new Date(topic.date_created);
    return getDate(dateText);
  };

  return (
    <div
      className={`topic-item-container pointer ${
        selected ? classes.topicItemSelected : ''
      }`}
      onClick={onSelect}
    >
      <div className='topic-item-name-container'>
        <span className={classes.topicTitle}>{topic.title}</span>
      </div>
      <i className='topic-item-date'>{renderDate()}</i>
    </div>
  );
};
