import React, { useState, useEffect } from 'react';
import { TopicNavigationBar } from '../navbar';
import { MainRouter, SCREENS } from '../../routers/MainRouter';
import { getTopics, createTopic } from '../../clib/api';
import { SideBar } from '../sidebar';
import { Button, Modal } from '../../components';
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
        topics: { data, loading, keys },
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
      dispatch({ type: SET_TOPICS, payload: newTopics });
    } catch (e) {
      dispatch({ type: SET_TOPICS_FAILURE });
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
      if (isMobile) {
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
    console.log("path: ", path)
    handleLocationChange(path);
  }, [path]);

  useEffect(() => {
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

  const actions = [{ text: "Create", action: () => {onClickCreateTopic()}, textColor: "white", "btnColor": "blue", position: 'right' }]

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
        {!topic && !loading && keys.length > 0 && <TopicNotFound />}
        {!topic && !loading && keys.length === 0 && (
          <div className='no-resources-message mt-1'>
              <div style={{marginBottom: 12}}>Welcome to Tigum 🎉🥂</div>
              <div style={{ fontSize: 17, marginTop: 70, maxWidth: 600, margin: "auto", lineHeight: 1.3, marginBottom: 10 }}>
                  Thanks for joing the beta programme! I will be emailing you about Tigums progress weekly,
                  and you can email me with bug reports or feature suggestions any time at briansmith.work578@gmail.com
              </div>
              <div style={{ fontSize: 12, fontStyle: "italic"}}>
                Founder and Creator of Tigum - Brian Smith
              </div>
              <Button buttonText="Create Topic" onClickAction={toggleModal} />
          </div>
        )}
      </div>
      <Modal
        display={modalOpen}
        toggleModal={toggleModal}
        actions={actions}
        actionDisabled={!topicTitle}
        buttonText='Create'
        title='Create Topic'
      >
        <input
          type='text'
          placeholder='Enter Topic Title'
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
