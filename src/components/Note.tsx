import React from "react";
import { getDate } from "../util/date";

export const Note = (props: any) => {
  const navigateToNote = () => {
    props.onClick(props.note);
  };

  const renderDate = () => {
    const dateText = new Date(props.note.date_created);
    return getDate(dateText);
  };

  return (
    <div className="card w-25" onClick={navigateToNote}>
      <div className="mw9 center">
        <div className="cf ph2-ns">
          <div className="fl ph2 w-90 pv1">
            <div className="bg-white">
              <h4 className="note-card-title">{props.note.title}</h4>
              <p className="note-sub-title">{renderDate()}</p>
            </div>
          </div>
          <div className="fl w-10 pv4">
            <div className="bg-white">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
