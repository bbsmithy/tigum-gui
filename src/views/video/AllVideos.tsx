import React, { useState, useEffect } from 'react';
import { NewButton } from '../../components';
import { Modal, VideoCard } from '../../components';
import { createVideo, updateTopic, getVideos } from '../../clib/api';
import { getVideoTitle } from '../../clib/yt';
import { getEmbedFromUrl, goto } from '../../util';

import { createUseStyles } from 'react-jss';
import { useStateValue } from '../../state/StateProvider';
import { DELETE_VIDEO } from '../../state/ActionTypes';
import { LoadingVideo } from '../../components/LoadingVideo';

const useStyles = createUseStyles({
  videoLoadingCover: {
    backgroundColor: '#efefef',
    height: 200,
    width: '100%',
    textAlign: 'center',
  },
  headerLoadingNote: {
    width: '80%',
    padding: 6,
    marginTop: 10,
    background: '#efefef',

    height: 6,
  },
  videoIconLoading: {
    fontSize: 50,
    marginTop: 90,
    color: 'gray',
  },
});

export const AllVideos = (props: any) => {
  const [displayVideoModal, setVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [creatingVideo, setCreatingVideo] = useState(false);

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { videos, selectedTopic, topics },
  } = state;

  const fetchVideos = async (ids: Array<number>) => {
    setLoadingVideos(true);
    const res = await getVideos(ids);
    if (res.status === 200) {
      const body = await res.json();
      dispatch({ type: 'SET_VIDEOS', payload: body });
      setLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (topics.data[selectedTopic].videos) {
      fetchVideos(topics.data[selectedTopic].videos);
    }
  }, [topics.data[selectedTopic].videos]);

  const toggleModal = () => {
    setVideoModal(!displayVideoModal);
  };

  const createVideoResource = async () => {
    setCreatingVideo(true);
    const embed = getEmbedFromUrl(videoUrl);

    if (embed) {
      const { embedUrl, thumbnailUrl } = embed;
      const videoTitle = await getVideoTitle(videoUrl);
      if (embedUrl && thumbnailUrl && videoTitle) {
        const res = await createVideo({
          thumbnail_img: thumbnailUrl,
          topic_id: topics.data[selectedTopic].id,
          title: videoTitle.title,
          iframe: embedUrl,
          origin: videoUrl,
        });
        if (res.status === 200) {
          const body = await res.json();
          dispatch({ type: 'ADD_VIDEO', payload: body });
          toggleModal();
        }
      }
    } else {
      alert('Could not find that video');
    }
    setCreatingVideo(false);
  };

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoUrl(e.currentTarget.value);
  };

  const onClickVideoCard = (video: any) => {
    goto(`${window.location.pathname}/${video.id}`);
  };

  const onDeleteVideoCard = (id: number, topic_id: number) => {
    dispatch({ type: DELETE_VIDEO, payload: { id, topic_id } });
  };

  const renderVideoResources = () => {
    if (topics.data[selectedTopic].videos.length !== 0 && videos.data) {
      return topics.data[selectedTopic].videos.map((videoId, index) => {
        const video = videos.data[videoId];
        if (video) {
          return (
            <VideoCard
              iframe={video.iframe}
              title={video.title}
              key={videoId}
              thumbnail_img={video.thumbnail_img}
              topicId={video.topic_id}
              id={videoId}
              index={index}
              onClick={onClickVideoCard}
              onDelete={onDeleteVideoCard}
            />
          );
        }
      });
    }
    return (
      <div className='no-resources-message'>
        <i className='fab fa-youtube' /> <span>No videos yet</span>
      </div>
    );
  };

  const renderLoadingVidoes = () => {
    return <LoadingVideo />;
  };

  return (
    <>
      <div className='ph2 mt4 pt3'>
        <NewButton onClick={toggleModal} text='New Video' />
        <div className='center w-100 ph1'>
          {loadingVideos ? renderLoadingVidoes() : renderVideoResources()}
        </div>
      </div>
      <Modal
        title='New Video'
        display={displayVideoModal}
        toggleModal={toggleModal}
        onClickAction={createVideoResource}
        loadingAction={creatingVideo}
        buttonText='Create Video'
      >
        <input
          type='text'
          placeholder='URL (Youtube)'
          id='topic-title-input'
          value={videoUrl}
          onChange={onChangeUrl}
        />
      </Modal>
    </>
  );
};
