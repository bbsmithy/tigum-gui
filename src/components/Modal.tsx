import React, { useState, ReactNode } from "react";

interface ModalProps {
  display: boolean;
  toggleModal: () => void;
  onClickAction: () => void;
  title: string;
  buttonText: string;
  children: ReactNode;
}

export const Modal = (props: ModalProps) => {
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
          <h2>{props.title}</h2>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-blue"
            id="create-topic-btn"
            onClick={props.onClickAction}
          >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
