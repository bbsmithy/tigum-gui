import React from "react";

const ResultTypeIcon = ({ type }) => {
  switch (type) {
    case "topic": {
      return (
        <span
          style={{
            marginRight: 10,
            background: "#246bf8",
            padding: 5,
            borderRadius: 4,
          }}
        >
          Topic:
        </span>
      );
    }
    case "note": {
      return <span>📝</span>;
    }
    case "snippet": {
      return <span>📋</span>;
    }
    case "video": {
      return <span>📺</span>;
    }
    case "link": {
      return <span>🔗</span>;
    }
    default: {
      return null;
    }
  }
};
export default ResultTypeIcon;
