import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import marked from "marked";
import { getFile } from "../../../clib/S3";
import { dragElement } from "../util";
import { createUseStyles } from "react-jss";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

const useStyles = createUseStyles({
  notesContainer: {
    padding: 20,
    width: "55%",
    maxWidth: 1200,
    height: "100%",
    color: "white",
    backgroundColor: "#333",
    position: "fixed",
    overflowX: "scroll",
    boxShadow: "0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%)",
    margin: "auto",
  },
  notes: {
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
});

const DisplayNote = ({ openMenu }) => {
  const [markdown, setMarkdown] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // @ts-ignore
  const locationState: { misc: string; title: string; resource_id: number } =
    location.state;

  marked.setOptions({
    langPrefix: "hljs language-",
    highlight: function (code) {
      return hljs.highlightAuto(code, ["html", "javascript", "rust", "sql"])
        .value;
    },
  });

  const onClickNote = (evt) => {
    evt.preventDefault();
    const el = evt.target;
    if (el.tagName === "A" && el.href) {
      if (el.href.includes("tigum.io")) {
        const localUrl = el.href.split("tigum.io")[1];
        const paths = localUrl.split("/");
        const currentPaths = location.pathname.split("/");
        const topicId = paths[2];
        const resourceType = paths[3];
        const resourceId = paths[4];
        const navTo = `${topicId}/${resourceType}/${resourceId}`;

        navigate(navTo, { replace: true });
      } else {
        window.open(el.href, "blank");
      }
    }
  };

  const classes = useStyles();

  const loadNotes = async (id: number) => {
    const resMD = await getFile(`${id}.md`, "notes");
    setMarkdown(resMD);
  };

  const goBack = () => {
    window.history.back();
    openMenu();
  };

  useEffect(() => {
    loadNotes(locationState.resource_id);
  }, [locationState.resource_id]);

  return (
    <div style={{ width: "55%", justifyContent: "center", margin: "auto" }}>
      <div className={classes.notesContainer}>
        <div style={{ padding: 5, cursor: "pointer" }} onClick={goBack}>
          <i className="fa fa-arrow-left" style={{ fontSize: 20 }} />
        </div>
        <h1 style={{ color: "white" }}>{locationState.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          className={classes.notes}
          onClick={onClickNote}
          style={{ maxWidth: 1000 }}
        />
      </div>
    </div>
  );
};

export default DisplayNote;
