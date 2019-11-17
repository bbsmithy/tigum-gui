import React, { useState, useEffect } from "react";
import { NewButton } from "../../components/";
import { Modal, VideoCard } from "../../components/";
import { createVideo, updateTopic, getVideos } from "../../client-lib/api";
import { getEmbedFromUrl } from "../../util/resource_to_html";
import { VIDEO_SCREENS } from "../../routers/VideoRouter";

export const AllVideos = (props: any) => {
  const [displayVideoModal, setVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoResources, setVideoResources] = useState({
    videos: [],
    loading: true
  });

  const fetchVideos = async (ids: Array<number>) => {
    const res = await getVideos(ids);
    if (res.status === 200) {
      const body = await res.json();
      setVideoResources({ videos: body.reverse(), loading: false });
    }
  };

  useEffect(() => {
    fetchVideos(props.topic.videos);
  }, [props.topic.videos]);

  const toggleModal = () => {
    setVideoModal(!displayVideoModal);
  };

  const updateTopicContent = async (newVideoId: number) => {
    return await updateTopic({
      ...props.topic,
      videos: [...props.topic.videos, newVideoId]
    });
  };
  const createVideoResource = async () => {
    const { embedUrl, thumbnailUrl } = getEmbedFromUrl(videoUrl);
    if (embedUrl && thumbnailUrl) {
      const res = await createVideo({
        thumbnail_img: thumbnailUrl,
        topic_id: props.topic.id,
        user_id: 123,
        title: videoTitle,
        iframe: embedUrl,
        origin: videoUrl
      });
      if (res.status === 200) {
        const body = await res.json();
        const update = await updateTopicContent(body.id);
        if (update.status === 200) {
          const topicJson = await update.json();
          props.setTopic(topicJson);
          toggleModal();
        }
      }
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoUrl(e.currentTarget.value);
  };

  const onClickVideoCard = (video: any) => {
    props.navigate(VIDEO_SCREENS.VIDEO_PLAYER, video);
  };

  const onDeleteVideoCard = (index: number) => {
    let refreshedVideoResources = [...videoResources.videos];
    delete refreshedVideoResources[index];
    setVideoResources({ videos: refreshedVideoResources, loading: false });
  };

  const renderVideosLoading = () => {
    return (
      <article className="br2 mv3 mw dib video-card ma3">
        <img className="db w-100 br2 br--top" />
        <div className="ph3-ns pv3-ns h-30">
          <div className="dib w-90">
            <h2 className="f3 f5-ns mv0">Loading</h2>
          </div>
          <div className="dib w-10">
            <span></span>
          </div>
        </div>
      </article>
    );
  };

  const renderVideoResources = () => {
    if (videoResources.videos.length) {
      return videoResources.videos.map((video, index) => {
        return (
          <VideoCard
            iframe={video.iframe}
            title={video.title}
            thumbnail_img={video.thumbnail_img}
            id={video.id}
            index={index}
            onClick={onClickVideoCard}
            onDelete={onDeleteVideoCard}
          />
        );
      });
    }
    return (
      <div className="no-resources-message">
        <i className="fab fa-youtube" /> <span>No videos yet</span>
      </div>
    );
  };

  return (
    <div className="video-page-container">
      <NewButton onClick={toggleModal} text="New Video" />
      <div className="center w-100 ph3">
        {videoResources.loading && renderVideosLoading()}
        {!videoResources.loading && renderVideoResources()}
      </div>
      <Modal
        title="New Video"
        display={displayVideoModal}
        toggleModal={toggleModal}
        onClickAction={createVideoResource}
        buttonText="Create Video"
      >
        <input
          type="text"
          placeholder="Video Title"
          id="topic-title-input"
          value={videoTitle}
          onChange={onChangeTitle}
        />
        <input
          type="text"
          placeholder="URL (Youtube)"
          id="topic-title-input"
          value={videoUrl}
          onChange={onChangeUrl}
        />
      </Modal>
    </div>
  );
};
