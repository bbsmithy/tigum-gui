import React, { useState, useEffect } from "react";
import { NewVideo } from "../../components/NewVideo";
import { Modal } from "../../components/Modal";
import { createResource, updateTopic, getResources } from "../../client-lib";
import { getEmbedFromUrl } from "../../util/resource_to_html";

export const Videos = (props: any) => {
  const [displayVideoModal, setVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoResources, setVideoResources] = useState({
    resources: [],
    loading: true
  });

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
    const videoEmbed = getEmbedFromUrl(videoUrl);
    const res = await createResource("VIDEO", videoEmbed, "USER");
    if (res.status === 200) {
      const body = await res.json();
      const update = await updateTopicContent(body.id);
      if (update.status === 200) {
        const topicJson = await update.json();
        props.setTopic(topicJson);
        toggleModal();
      }
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoUrl(e.currentTarget.value);
  };

  const renderVideoResources = () => {
    return videoResources.resources.map(video => {
      return <div dangerouslySetInnerHTML={{ __html: video.content }}></div>;
    });
  };

  return (
    <div className="topic-section-container">
      <NewVideo onClick={toggleModal} />
      {!videoResources.loading && renderVideoResources()}
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
