import React, { useState, useEffect } from 'react';
import { TopicNavigationBar } from '../navbar';
import { MainRouter, SCREENS } from '../../routers/MainRouter';
import { getTopics, createTopic } from '../../clib/api';
import { SideBar } from '../sidebar';
import { Modal } from '../../components';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';
import { resourceTypeToScreen } from '../../util';
import { useReactPath } from '../../hooks';
import {
  SET_SELECTED_RESOURCE,
  FULL_SCREEN,
  SET_SELECTED_TOPIC,
  SET_TOPICS,
  SET_TOPIC_SCREEN,
  FETCHING_TOPICS,
  SET_TOPICS_FAILURE,
  HIDE_SIDEBAR,
  SHOW_SIDEBAR,
} from '../../state/ActionTypes';
import Notification from '../../components/Notification';

const useStyles = createUseStyles({
  topicContainer: {
    height: '100%',
  },
  notFoundContainer: {
    width: '100%',
    marginTop: '20%',
    textAlign: 'center',
  },
  couldNotFindTopic: {
    color: 'white',
  },
});

const TopicNotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.notFoundContainer}>
      <h1 className={classes.couldNotFindTopic}>
        Could not find that topic....
      </h1>
    </div>
  );
};

export const MainContent = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState('');
  const path = useReactPath();
  const classes = useStyles();

  // @ts-ignore
  const [
    {
      content: {
        selectedTopic,
        topics: { data, loading },
        notification,
      },
      navigation: { showTopicNavbar, showSidebar, useFullWidth, topicScreen },
    },
    dispatch,
  ] = useStateValue();

  const topic = data[selectedTopic];
  const isMobile = window.innerWidth < 960

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchTopics = async () => {
    dispatch({ type: FETCHING_TOPICS });
    try {
      const newTopics = await getTopics([]);
      const orderedTopics = newTopics.reverse();
      dispatch({ type: SET_TOPICS, payload: orderedTopics });
    } catch (e) {
      dispatch({ type: SET_TOPICS_FAILURE });
    }
  };

  const handleWindowResize = (evt) => {
    setSidebarDisplay(evt.target.innerWidth);
  };

  const setSidebarDisplay = (width: number) => {
    if (width < 960) {
      dispatch({ type: HIDE_SIDEBAR, payload: { useFullWidth: true } });
    } else if (width > 960) {
      dispatch({ type: SHOW_SIDEBAR, payload: { useFullWidth: false } });
    }
  };

  const handleLocationChange = (path) => {
    const pathVars = path.split(/\//);
    const topicId = Number(pathVars[2]);
    const resourceType = pathVars[3];
    const resourceId = Number(pathVars[4]);

    if (topicId && selectedTopic !== topicId) {
      dispatch({ type: SET_SELECTED_TOPIC, payload: topicId });
    }
    if (pathVars.length === 4) {
      const newTopicScreen = resourceTypeToScreen(resourceType);
      dispatch({ type: "SHOW_TOPIC_NAVBAR", payload: true })
      if(isMobile){
        dispatch({ type: HIDE_SIDEBAR, payload: { useFullWidth: true } })
      } else {
        dispatch({ type: SHOW_SIDEBAR, payload: { useFullWidth: false } })
      }
      dispatch({
        type: SET_TOPIC_SCREEN,
        payload: newTopicScreen,
      });
    } else if (pathVars.length === 5) {
      dispatch({ type: SET_SELECTED_RESOURCE, payload: resourceId });
      dispatch({ type: FULL_SCREEN, payload: true });
      if (resourceType === 'videos') {
        dispatch({
          type: SET_TOPIC_SCREEN,
          payload: SCREENS.VIDEO_PLAYER,
        });
      } else if (resourceType === 'notes') {
        dispatch({
          type: SET_TOPIC_SCREEN,
          payload: SCREENS.VIEW_NOTE,
        });
      }
    }
  };

  useEffect(() => {
    handleLocationChange(path);
  }, [path]);

  useEffect(() => {
    setSidebarDisplay(window.innerWidth);
    fetchTopics();
  }, []);

  const onClickCreateTopic = async () => {
    try {
      const res = await createTopic(topicTitle);
      if (res.status === 200) {
        fetchTopics();
        toggleModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setTopicTitle(e.currentTarget.value);
  };

  return (
    <div id='main-content'>
      <SideBar screen={topicScreen} toggleModal={toggleModal} />
      <div
        style={{
          width: showSidebar && !useFullWidth ? '80%' : '100%',
          position: 'absolute',
          left: showSidebar && !useFullWidth ? '20%' : '0%',
        }}
      >
        {topic && (
          <>
            {showTopicNavbar && (
              <TopicNavigationBar title={topic.title} topic={topic} />
            )}
            <div className={classes.topicContainer}>
              <MainRouter screen={topicScreen} topic={topic} />
            </div>
          </>
        )}
        {!topic && !loading && <TopicNotFound />}
      </div>
      <Modal
        display={modalOpen}
        toggleModal={toggleModal}
        onClickAction={onClickCreateTopic}
        buttonText='Create'
        title='Create Topic'
      >
        <input
          type='text'
          placeholder='Title'
          id='topic-title-input'
          value={topicTitle}
          onChange={onChangeTitle}
        />
      </Modal>
      {notification && (
        <Notification
          message={notification.message}
          variant={notification.variant}
          position={notification.position}
        />
      )}
    </div>
  );
};
