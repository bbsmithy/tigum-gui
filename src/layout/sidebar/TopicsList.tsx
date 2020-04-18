import React, { useEffect } from 'react';
import { goto, screenToResourceType } from '../../util';
import { TopicItem } from './TopicItem';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  headerLoadingNote: {
    width: '100%',
    padding: 6,
    borderRadius: 5,
    marginTop: 10,
    background: 'gray',
    height: 6,
  },
  dateLoadingNote: {
    width: '70%',
    borderRadius: 5,
    padding: 3,
    float: 'left',
    marginTop: 10,
    background: 'gray',
    height: 6,
  },
  container: {
    overflow: 'scroll',
    height: '100%',
    paddingBottom: 200,
  },
});

export const TopicsList = () => {
  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics, selectedTopic },
    navigation: { topicScreen },
  } = state;

  useEffect(() => {
    if (!selectedTopic && topics.keys[0]) {
      selectTopicItem(topics.keys[0]);
    }
  }, [topics]);

  const selectTopicItem = (id: number) => {
    const screen = screenToResourceType(topicScreen);
    if (screen) {
      goto(`/topic/${id}/${screen}`);
    } else {
      goto(`/topic/${id}`);
    }
    dispatch({ type: 'SHOW_TOPIC_NAVBAR' });
    if (window.innerWidth < 960) {
      dispatch({ type: 'HIDE_SIDEBAR', payload: { useFullWidth: true } });
    }
  };

  const renderLoading = () => {
    return (
      <>
        <div className='mw9 bb1'>
          <div className='cf ph2-ns pb4'>
            <div className='fr w-100 ph2 pv1'>
              <div className={classes.headerLoadingNote}></div>
              <div className={classes.dateLoadingNote}></div>
            </div>
          </div>
        </div>
        <div className='mw9'>
          <div className='cf ph2-ns pb4'>
            <div className='fl ph2 w-90 pv1'>
              <div className={classes.headerLoadingNote}></div>
              <div className={classes.dateLoadingNote}></div>
            </div>
          </div>
        </div>
        <div className='mw9'>
          <div className='cf ph2-ns pb4'>
            <div className='fl ph2 w-90 pv1'>
              <div className={classes.headerLoadingNote}></div>
              <div className={classes.dateLoadingNote}></div>
            </div>
          </div>
        </div>
        <div className='mw9'>
          <div className='cf ph2-ns pb4'>
            <div className='fl ph2 w-90 pv1'>
              <div className={classes.headerLoadingNote}></div>
              <div className={classes.dateLoadingNote}></div>
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
        topics.keys.map((topicId) => {
          const selected = selectedTopic ? selectedTopic === topicId : false;
          return (
            <TopicItem
              topic={topics.data[topicId]}
              key={topicId}
              selected={selected}
              id={topicId}
              onSelectItem={selectTopicItem}
            />
          );
        })}
    </div>
  );
};
