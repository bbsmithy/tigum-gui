import React, { useState } from "react";
import { createTopic } from "./client-lib/";

interface ModalProps {
  display: boolean;
  toggleModal: () => void;
  refresh: () => void;
}

export const Modal = (props: ModalProps) => {
  const [topicTitle, setTopicTitle] = useState("");

  const onChangeTitle = (e: any) => {
    setTopicTitle(e.target.value);
  };

  const onClickCreateTopic = async () => {
    try {
      const res = await createTopic(topicTitle, []);
      if (res.status === 200) {
        props.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      id="app-modal"
      className={props.display ? "modal modal-show" : "modal modal-hidden"}
    >
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={props.toggleModal}>
            &times;
          </span>
          <h2>New Topic</h2>
        </div>
        <div className="modal-body">
          <input
            type="text"
            placeholder="Title"
            id="topic-title-input"
            value={topicTitle}
            onChange={onChangeTitle}
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn"
            id="create-topic-btn"
            onClick={onClickCreateTopic}
          >
            Create Topic
          </button>
        </div>
      </div>
    </div>
  );
};
