import React, { useState, useEffect } from 'react';
import { TopicNavigationBar } from '../topic-navigation-bar';
import { TopicRouter, TOPIC_SCREENS } from '../routers/TopicRouter';
import { getTopics, createTopic } from '../client-lib/api';
import { SideBar } from '../sidebar';
import { Modal } from '../components/';
import { useStateValue } from '../state/StateProvider';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  topicContainer: {
    height: '100%'
  }
});

export const MainContent = (props: any) => {
  const [screen, setScreen] = useState(TOPIC_SCREENS.LOADING);
  const [modalOpen, setModalOpen] = useState(false);
  const [topicTitle, setTopicTitle] = useState('');
  const classes = useStyles();

  // @ts-ignore
  const [
    {
      content: {
        selectedTopic,
        topics: { data, loading }
      },
      navigation: { showTopicNavbar, showSidebar, useFullWidth }
    },
    dispatch
  ] = useStateValue();

  const topic = data[selectedTopic];

  const navigate = (screen: TOPIC_SCREENS, topic_id: number) => {
    setScreen(screen);
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
      navigate(TOPIC_SCREENS.MY_NOTES, orderedTopics[0].id);
    } catch (e) {
      console.log(e.status);
      console.log('Could not fetch topics');
      dispatch({ type: 'SET_TOPICS_FAILURE' });
    }
  };

  const handleWindowResize = evt => {
    if (evt.target.innerWidth < 960) {
      dispatch({ type: 'HIDE_SIDEBAR', payload: { useFullWidth: true } });
    } else if (evt.target.innerWidth > 960) {
      dispatch({ type: 'SHOW_SIDEBAR', payload: { useFullWidth: false } });
    }
  };

  useEffect(() => {
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

  const renderApp = () => {
    return (
      <>
        <SideBar
          navigate={navigate}
          screen={screen}
          toggleModal={toggleModal}
        />
        {topic && (
          <div
            style={{
              width: showSidebar && !useFullWidth ? '80%' : '100%',
              position: 'absolute',
              left: showSidebar && !useFullWidth ? '20%' : '0%'
            }}
          >
            {showTopicNavbar && (
              <TopicNavigationBar
                title={topic.title}
                navigate={navigate}
                topic={topic}
              />
            )}
            <div className={classes.topicContainer}>
              <TopicRouter screen={screen} topic={topic} />
            </div>
          </div>
        )}
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
      </>
    );
  };

  const renderLoginSignUp = () => {
    return <p>Hello</p>;
  };

  return <div id='main-content'>{renderApp()}</div>;
};
