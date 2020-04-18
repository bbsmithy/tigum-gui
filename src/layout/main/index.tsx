import React, { useState, useEffect } from 'react';
import { TopicNavigationBar } from '../navbar';
import { TopicRouter, TOPIC_SCREENS } from '../../routers/TopicRouter';
import { getTopics, createTopic } from '../../clib/api';
import { SideBar } from '../sidebar';
import { Modal } from '../../components';
import { useStateValue } from '../../state/StateProvider';
import { createUseStyles } from 'react-jss';

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
  const classes = useStyles();

  // @ts-ignore
  const [
    {
      content: {
        selectedTopic,
        topics: { data, loading },
      },
      navigation: { showTopicNavbar, showSidebar, useFullWidth, topicScreen },
    },
    dispatch,
  ] = useStateValue();

  const topic = data[selectedTopic];

  const navigate = (screen: TOPIC_SCREENS, topic_id: number) => {
    dispatch({ type: 'SET_SELECTED_TOPIC', payload: topic_id });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchTopics = async () => {
    dispatch({ type: 'FETCHING_TOPICS' });
    try {
      const newTopics = await getTopics([]);
      const orderedTopics = newTopics.reverse();
      dispatch({ type: 'SET_TOPICS', payload: orderedTopics });
    } catch (e) {
      dispatch({ type: 'SET_TOPICS_FAILURE' });
    }
  };

  const handleWindowResize = (evt) => {
    setSidebarDisplay(evt.target.innerWidth);
  };

  const setSidebarDisplay = (width: number) => {
    if (width < 960) {
      dispatch({ type: 'HIDE_SIDEBAR', payload: { useFullWidth: true } });
    } else if (width > 960) {
      dispatch({ type: 'SHOW_SIDEBAR', payload: { useFullWidth: false } });
    }
  };

  useEffect(() => {
    const topicId = window.location.pathname.split(/\//)[2];
    if (topicId && selectedTopic !== topicId) {
      dispatch({ type: 'SET_SELECTED_TOPIC', payload: Number(topicId) });
    }
  }, [window.location.pathname]);

  useEffect(() => {
    setSidebarDisplay(window.innerWidth);
    fetchTopics();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
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
      <SideBar
        navigate={navigate}
        screen={topicScreen}
        toggleModal={toggleModal}
      />
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
              <TopicNavigationBar
                title={topic.title}
                navigate={navigate}
                topic={topic}
              />
            )}
            <div className={classes.topicContainer}>
              <TopicRouter screen={topicScreen} topic={topic} />
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
    </div>
  );
};
