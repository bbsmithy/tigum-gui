import React from "react";

export const NoTopicsMessage: React.FC = () => {
  return (
    <div id="no-topics-container">
      <i className="far fa-folder-open" style={{fontSize: 35, marginBottom: 5}}></i>
      <div style={{ fontSize: 16, maxWidth: 230, margin: "auto", lineHeight: 1.4}}>
        You currently have no topics
      </div>
    </div>
  )
};
