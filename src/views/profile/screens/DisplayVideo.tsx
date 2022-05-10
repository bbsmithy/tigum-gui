import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import marked from "marked";
import { getFile } from "../../../clib/S3";
import { dragElement } from "../util";
import { createUseStyles } from "react-jss";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

const useStyles = createUseStyles({
  videoNotesContainer: {
    padding: 20,
    width: "50%",
    maxWidth: 1200,
    height: "100%",
    color: "white",
    backgroundColor: "#333",
    position: "fixed",
    overflowX: "scroll",
  },
  videoNotes: {
    "& a": {
      color: "white",
      overflowWrap: "break-word",
    },
    "& blockquote": {
      borderRadius: 12,
      marginTop: 20,
      marginBottom: 20,
    },
    "& pre": {
      marginBottom: "20px !important",
    },
    "& code": {
      borderRadius: 12,
    },
  },
  videoFrame: {
    position: "fixed",
    width: 705,
    overflow: "hidden",
    height: 450,
    right: 5,
    top: 5,
    zIndex: 1000,
    cursor: "move",
    backgroundColor: "#333",
    border: "1px solid white",
    borderRadius: 12,
    resize: "both",
  },
});

const DisplayVideo = (props) => {
  const [markdown, setMarkdown] = useState("");
  const location = useLocation();

  const navigate = useNavigate();

  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code, ["html", "javascript", "rust", "sql"])
        .value;
    },
  });

  const classes = useStyles();

  // @ts-ignore
  const locationState: { misc: string; title: string; resource_id: number } =
    location.state;

  const loadNotes = async (id: number) => {
    const resMD = await getFile(`${id}_video.md`, "video-notes");
    setMarkdown(resMD);
  };

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    loadNotes(locationState.resource_id);
    dragElement(document.getElementById("video-iframe"));
  }, [locationState.resource_id]);

  return (
    <div style={{ width: "100%" }}>
      <div className={classes.videoNotesContainer}>
        <div style={{ padding: 5, cursor: "pointer" }} onClick={goBack}>
          <i className="fa fa-arrow-left" style={{ fontSize: 20 }} />
        </div>

        <h1 style={{ color: "white" }}>{locationState.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          className={classes.videoNotes}
          style={{ maxWidth: 1000 }}
        />
      </div>

      <div id="video-iframe" className={classes.videoFrame}>
        <iframe
          src={locationState.misc}
          style={{ width: "100%", height: "90%", border: "none" }}
        />
      </div>
    </div>
  );
};

export default DisplayVideo;
