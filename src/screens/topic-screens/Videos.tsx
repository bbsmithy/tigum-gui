import React, { useState } from "react";
import { NewVideo } from "../../components/NewVideo";
import { Modal } from "../../components/Modal";
import { createResource } from "../../client-lib";
import { getEmbedFromUrl } from "../../util/resource_to_html";

export const Videos = (props: any) => {
  const [displayVideoModal, setVideoModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const toggleModal = () => {
    setVideoModal(!displayVideoModal);
  };

  const updateNoteContent = async (id: number) => {};

  const createVideoResource = async () => {
    const videoEmbed = getEmbedFromUrl(videoUrl);
    console.log(videoEmbed);
    const res = await createResource("VIDEO", videoEmbed, "USER");
    if (res.status === 200) {
      const body = await res.json();
      console.log(body.id);
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoTitle(e.currentTarget.value);
  };

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    setVideoUrl(e.currentTarget.value);
  };

  return (
    <div className="topic-section-container">
      <NewVideo onClick={toggleModal} />
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
