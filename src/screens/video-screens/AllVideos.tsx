import React, { useState, useEffect } from "react";
import { NewVideo } from "../../components/NewVideo";
import { Modal, VideoCard } from "../../components/";
import { createResource, updateTopic, getResources } from "../../client-lib";
import { getEmbedFromUrl } from "../../util/resource_to_html";
import { VIDEO_SCREENS } from "../../routers/VideoRouter";

export const AllVideos = (props: any) => {
  const [displayVideoModal, setVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoResources, setVideoResources] = useState({
    resources: [],
    loading: true
  });
  const [selectedVideo, setSelectedVideo] = useState();

  const fetchResources = async (ids: Array<number>) => {
    const res = await getResources(ids);
    if (res.status === 200) {
      const body = await res.json();
      console.log(body);
      setVideoResources({ resources: body.reverse(), loading: false });
    }
  };

  useEffect(() => {
    fetchResources(props.topic.resources);
  }, []);

  useEffect(() => {
    fetchResources(props.topic.resources);
  }, [props.topic.resources]);

  const toggleModal = () => {
    setVideoModal(!displayVideoModal);
  };

  const updateTopicContent = async (newResourceId: number) => {
    const res = await updateTopic({
      ...props.topic,
      resources: [...props.topic.resources, newResourceId]
    });
    return await res;
  };
  const createVideoResource = async () => {
    const { embedUrl, thumbnailUrl } = getEmbedFromUrl(videoUrl);
    if (embedUrl && thumbnailUrl) {
      const res = await createResource(
        "VIDEO",
        embedUrl,
        "USER",
        videoTitle,
        thumbnailUrl
      );
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

  const renderVideoResources = () => {
    if (videoResources.resources.length) {
      return videoResources.resources.map(video => {
        return (
          <VideoCard
            html={video.content}
            title={video.title}
            thumbnail_img={video.thumbnail_img}
            resource_id={video.resource_id}
            onClick={onClickVideoCard}
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
      <NewVideo onClick={toggleModal} />
      <div className="center w-100 ph3">
        {!videoResources.loading && !selectedVideo && renderVideoResources()}
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
