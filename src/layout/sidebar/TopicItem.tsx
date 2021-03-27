import React from 'react';
import { getDate } from '../../util';
import { Topic } from '../../clib/models';
import { createUseStyles } from 'react-jss';

interface TopicItemProps {
  topic: Topic;
  selected: boolean;
  id: number;
  onSelectItem: (id: number) => void;
}

const useStyles = createUseStyles({
  topicTitle: {
    fontSize: 15,
    '@media (max-width: 1196px)': {
      fontSize: 13,
    },
  },
  topicItemSelected: {
    borderRight: '7px solid #246bf8',
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
    onSelectItem(id);
  };

  const renderDate = () => {
    console.log(topic)
    const dateText = new Date(topic.date_updated);
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
