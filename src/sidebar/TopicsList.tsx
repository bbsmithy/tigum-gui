import React, { useState, useEffect } from 'react';
import { TopicItem } from './TopicItem';
import { Topic } from '../client-lib/models';
import { TOPIC_SCREENS } from '../routers/TopicRouter';
import { useStateValue } from '../state/StateProvider';
import { createUseStyles } from 'react-jss';

interface TopicsListProps {
  screen: TOPIC_SCREENS;
  navigate: (screen: TOPIC_SCREENS, topicId: number) => void;
}

const useStyles = createUseStyles({
  headerLoadingNote: {
    width: '100%',
    padding: 6,
    marginTop: 10,
    background: '#efefef',
    height: 6
  },
  dateLoadingNote: {
    width: '70%',
    padding: 3,
    float: 'left',
    marginTop: 10,
    background: '#efefef',
    height: 6
  },
  container: {
    overflow: 'scroll',
    height: '100%',
    paddingBottom: 200
  }
});

export const TopicsList = ({ screen, navigate }: TopicsListProps) => {
  const [selectedId, setSelected] = useState(0);

  const classes = useStyles();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics }
  } = state;

  const selectTopicItem = (id: number, topic: Topic) => {
    setSelected(id);
    navigate(screen, topic.id);
    dispatch({ type: 'SHOW_TOPIC_NAVBAR' });
  };

  const renderLoading = () => {
    return (
      <>
        <div className='mw9 bb1'>
          <div className='cf ph2-ns pb4'>
            <div className='fr w-100 ph2 pv1'>
              <div className='bg-white'>
                <div className={classes.headerLoadingNote}></div>
                <div className={classes.dateLoadingNote}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='mw9'>
          <div className='cf ph2-ns pb4'>
            <div className='fl ph2 w-90 pv1'>
              <div className='bg-white'>
                <div className={classes.headerLoadingNote}></div>
                <div className={classes.dateLoadingNote}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='mw9'>
          <div className='cf ph2-ns pb4'>
            <div className='fl ph2 w-90 pv1'>
              <div className='bg-white'>
                <div className={classes.headerLoadingNote}></div>
                <div className={classes.dateLoadingNote}></div>
              </div>
            </div>
          </div>
        </div>
        <div className='mw9'>
          <div className='cf ph2-ns pb4'>
            <div className='fl ph2 w-90 pv1'>
              <div className='bg-white'>
                <div className={classes.headerLoadingNote}></div>
                <div className={classes.dateLoadingNote}></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={classes.container}>
      {topics.loading && renderLoading()}
      {!topics.loading &&
        topics.keys.map((topicId, index) => (
          <TopicItem
            topic={topics.data[topicId]}
            key={topics.data[topicId].id}
            selected={selectedId === index}
            id={index}
            onSelectItem={selectTopicItem}
          />
        ))}
    </div>
  );
};
