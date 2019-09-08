import React, { useState } from "react";
import { createTopic } from "./client-lib/";

interface ModalProps {
  display: boolean;
  toggleModal: () => void;
}

export const Modal = (props: ModalProps) => {
  const [topicTitle, setTopicTitle] = useState("");

  const onChangeTitle = (e: any) => {
    setTopicTitle(e.target.value);
  };

  const onClickCreateTopic = () => {
    createTopic(topicTitle, []);
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
            placeholder="Enter Title"
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
