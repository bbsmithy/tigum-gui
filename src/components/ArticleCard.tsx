import React, { ReactElement } from "react";
import { createUseStyles } from "react-jss";
import { deleteArticleSnippet, setPublishStatusResource } from "../clib/api";
import { useStateValue } from "../state/StateProvider";
import { marked } from "marked";
import PublishedBadge from "./PublishedBadge";
import { DELETE_RESOURCE, UPDATE_SNIPPET } from "../state/ActionTypes";
import { snippetToResourceResult } from "../state/StateHelpers";
import { updateResource } from "../state/Actions";

const useStyles = createUseStyles({
  divider: {
    border: "0.5px solid #efefef",
  },
  snippet: {
    fontFamily: "Arial",
    maxWidth: 600,
    padding: "8px 15px",
    "& a": {
      color: "white !important",
      padding: 2,
    },
    "& a:hover": {
      backgroundColor: "#246bf8 !important",
      padding: 2,
      borderRadius: 5,
    },
  },
  source: {
    color: "white",
  },
  sourceContainer: {
    flex: 1,
    overflow: "hidden",
  },
  deleteBtn: {
    borderRadius: 5,
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    fontFamily: "Montserrat, sans-serif",
    padding: 8,
    float: "right",
    fontSize: 13,
    cursor: "pointer",
  },
  editBtn: {
    borderRadius: 5,
    border: "none",
    backgroundColor: "#246bf8",
    fontFamily: "Montserrat, sans-serif",
    color: "white",
    padding: 8,
    float: "right",
    fontSize: 13,
    marginLeft: 10,
    cursor: "pointer",
  },
  btnsConatiner: {
    flex: 1,
  },
  controlsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    marginTop: 15,
    marginBottom: 0,
  },
});

export type ArticleCardProps = {
  onEdit: Function;
  title: string;
  content: string;
  origin: string;
  id: number;
  topicId: number;
  published: boolean;
};

export const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const classes = useStyles();
  const {
    content: { article_snippets },
  } = state;

  const deleteSnippet = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this snippet?")) {
        await deleteArticleSnippet(props.id);
        dispatch({
          type: DELETE_RESOURCE,
          payload: {
            resourceKey: `snippet_${props.id}`,
            topicId: props.topicId,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pub = async () => {
    try {
      const updatedSnippet = await setPublishStatusResource(
        "article_snippets",
        props.id,
        true
      );
      const resource = snippetToResourceResult(updatedSnippet);
      dispatch(updateResource(resource, "snippet"));
    } catch (error) {
      console.log(error);
    }
  };

  const unpub = async () => {
    try {
      const updatedSnippet = await setPublishStatusResource(
        "article_snippets",
        props.id,
        false
      );
      const resource = snippetToResourceResult(updatedSnippet);
      dispatch(updateResource(resource, "snippet"));
    } catch (error) {
      console.log(error);
    }
  };

  const onEditSnippet = () => {
    props.onEdit({
      title: props.title,
      content: props.content,
      id: props.id,
      origin: props.origin,
    });
  };

  return (
    <div className="ph2 pv1">
      <article
        className={`shadow-card hidden br3 ba b--black-10 text ${classes.snippet}`}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            {props.title && (
              <h4 className={classes.title}>
                {props.published && <PublishedBadge />} {props.title}
              </h4>
            )}
          </div>
        </div>

        <div
          className="f6 f5-ns lh-copy white"
          dangerouslySetInnerHTML={{ __html: marked(props.content) }}
        />
        <div className={classes.controlsContainer}>
          <div className={classes.sourceContainer}>
            {props.origin === "TIGUM" ? (
              <span className={classes.source}>Source: You</span>
            ) : (
              <a href={props.origin} target="blank" className={classes.source}>
                View Source
              </a>
            )}
          </div>
          <div className={classes.btnsConatiner}>
            {props.published ? (
              <button className={classes.editBtn} onClick={unpub}>
                <i className="fas fa-download" /> Unpublish
              </button>
            ) : (
              <button className={classes.editBtn} onClick={pub}>
                <i className="fas fa-upload" /> Publish
              </button>
            )}

            <button className={classes.editBtn} onClick={onEditSnippet}>
              <i className="fa fa-edit" /> Edit
            </button>
            <button className={classes.deleteBtn} onClick={deleteSnippet}>
              <i className="fa fa-trash" /> Delete
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
