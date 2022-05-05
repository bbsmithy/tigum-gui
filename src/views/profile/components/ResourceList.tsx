import React, { useEffect, useState } from "react";
import { getDate } from "../../../util";
import marked from "marked";
import { LinkCard, VideoCard } from "../../../components";
import { getPublicNotes } from "../../../clib/api";
import { useNotes, useVideos } from "../hooks";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";

export const NotesList = ({ selectedTopic }: { selectedTopic: any }) => {
  if (selectedTopic?.resources.notes) {
    return selectedTopic?.resources.notes.map((note) => {
      const renderDate = () => {
        const dateText = new Date(note.date_updated);
        return getDate(dateText);
      };

      return (
        <div className="card w-33 note-card pointer">
          <div className="mw9 center">
            <div className="cf ph2-ns">
              <div
                className="fl ph2 w-90 pv3"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <h4 style={{ marginTop: 4, marginBottom: 0 }}>{note.title}</h4>
                <div
                  style={{
                    fontSize: 13,
                    marginTop: 10,
                    fontStyle: "italic",
                    color: "gray",
                  }}
                >
                  {renderDate()}
                </div>
              </div>
              <div className="fl w-10 pv4">
                <div>
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
};

const snippetListUseStyles = createUseStyles({
  snippetCardContainer: {
    maxWidth: "100%",
  },
  snippetCard: {
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#333",
    boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
  },
});

const Snippet = ({ snippet, classes }) => {
  return (
    <div className={classes.snippetCardContainer}>
      <div className={classes.snippetCard}>
        <h4 style={{ marginTop: 5, marginBottom: 5 }}>{snippet.misc2}</h4>
        <div dangerouslySetInnerHTML={{ __html: marked(snippet.title) }} />
        {snippet.origin != "TIGUM" && (
          <div style={{ marginTop: 10 }}>
            <a
              href={`${snippet.misc}`}
              target="blank"
              style={{ color: "rgb(36, 107, 248)" }}
            >
              View Source
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export const SnippetList = ({ selectedTopic }) => {
  const classes = snippetListUseStyles();

  if (selectedTopic?.resources.snippets) {
    const LHSCol = [];
    const RHSCol = [];

    selectedTopic?.resources.snippets.forEach((snippet, idx) => {
      if (idx % 2 === 0) {
        RHSCol.push(snippet);
      } else {
        LHSCol.push(snippet);
      }
    });

    const LHS = LHSCol.map((snippet, idx) => (
      <Snippet snippet={snippet} classes={classes} />
    ));

    const RHS = RHSCol.map((snippet, idx) => (
      <Snippet snippet={snippet} classes={classes} />
    ));

    return (
      <div style={{ width: "100%", display: "flex", flexDirection: "row" }}>
        <div style={{ padding: 10 }}>{LHS}</div>
        <div style={{ padding: 10 }}>{RHS}</div>
      </div>
    );
  } else {
    return (
      <div className="no-resources-message">
        <i className="fas fa-newspaper" /> <span>No snippets yet</span>
      </div>
    );
  }
};
const videoListUseStyles = createUseStyles({
  listContainer: { width: "100%" },
  videoCardContainer: {
    display: "inline-block",
    width: "50%",
    "@media (max-width: 1000px)": {
      width: "95%",
    },
    padding: 5,
  },
  videoCard: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#333",
    boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
    borderRadius: 12,
    cursor: "pointer",
  },
  videoTitle: {
    fontSize: 17,
    "@media (max-width: 1000px)": {
      fontSize: 13,
    },
    fontWeight: "500",
  },
  imageContainer: {
    flex: 3,
    "@media (max-width: 1000px)": {
      height: 80,
    },
    height: 120,
  },
  image: { height: "100%" },
  videoTitleContainer: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export const VideoList = ({ selectedTopic }) => {
  const classes = videoListUseStyles();
  const navigate = useNavigate();

  if (
    selectedTopic &&
    selectedTopic?.resources.videos &&
    selectedTopic?.resources.videos.length > 0
  ) {
    const list = selectedTopic?.resources.videos.map((video, idx) => {
      return (
        <div
          className={classes.videoCardContainer}
          onClick={() => {
            navigate(`/test`);
          }}
        >
          <div className={classes.videoCard}>
            <div className={classes.imageContainer}>
              <img src={video.misc2} className={classes.image} />
            </div>
            <div className={classes.videoTitleContainer}>
              <p className={classes.videoTitle}>{video.title}</p>
            </div>
          </div>
        </div>
      );
    });
    return <div className={classes.listContainer}>{list}</div>;
  }
};

export const LinkList = ({ selectedTopic }) => {
  if (
    selectedTopic &&
    selectedTopic?.resources.links &&
    selectedTopic?.resources.links.length > 0
  ) {
    return selectedTopic?.resources.links.map((link, idx) => {
      return <LinkCard link={link} onClick={() => {}} />;
    });
  } else {
    return (
      <div className="no-resources-message">
        <i className="fas fa-link" /> <span>No links yet</span>
      </div>
    );
  }
};
