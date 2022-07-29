import React, { useState, useEffect, useRef } from "react";
import { ArticleCard, NewButton, Modal } from "../../components";
import { MarkdownEditor } from "devkeep-md-editor";
import { createUseStyles } from "react-jss";
import {
  getArticleSnippets,
  createArticleSnippet,
  updateArticleSnippet,
} from "../../clib/api";
import { NewArticleSnippet } from "../../clib/models";

import { useStateValue } from "../../state/StateProvider";
import { setPageTitle } from "../../util";
import { UPDATE_SNIPPET } from "../../state/ActionTypes";
import FeedbackButton from "../../components/FeedbackButton";

const useStyles = createUseStyles({
  paragraphLoading: {
    width: "100%",
    marginTop: 10,
    height: 8,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  linkLoading: {
    width: "60%",
    marginTop: 30,
    height: 8,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  snippetBox: {
    height: 250,
    color: "white",
    border: "1px solid white",
    resize: "none",
  },
  snippetsContainer: {
    paddingBottom: 200,
  },
  snippetLoading: {
    width: "85%",
    maxWidth: 1000,
    "@media (max-width: 600px)": {
      width: "100%",
    },
    margin: "auto",
    marginTop: 15,
    padding: "8px 15px",
  },
});

const theme = {
  toolbar: {
    background: "#424242",
    color: "white",
    activeBtnBackground: "#242020",
    activeBtnColor: "white",
    disabledBtnBackground: "gray",
    disabledBtnColor: "#333",
  },
  preview: { background: "#424242", color: "white" },
  editor: { background: "#424242", color: "white" },
  cursorColor: "white",
  height: "40vh",
};

const Snippets = (props) => {
  const classes = useStyles();
  const { snippets, loading } = props;
  if (!loading) {
    if (snippets.length) {
      return snippets.map((snippet, idx) => {
        if (snippet) {
          return (
            <ArticleCard
              onEdit={props.onEdit}
              title={snippet.title}
              content={snippet.content}
              origin={snippet.origin}
              published={snippet.published}
              topicId={0}
              id={snippet.id}
              key={snippet.id}
            />
          );
        } else {
          return null;
        }
      });
    } else {
      return (
        <div className="no-resources-message">
          <i className="fas fa-newspaper" /> <span>No snippets yet</span>
        </div>
      );
    }
  } else {
    return (
      <>
        <article
          className={`shadow-card mw5 mw7-ns hidden br3 ba dark-gray b--black-10  mv3 ${classes.snippetLoading}`}
        >
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.linkLoading}></div>
        </article>
        <article
          className={`shadow-card mw5 mw7-ns hidden br3 ba dark-gray b--black-10  mv3 ${classes.snippetLoading}`}
        >
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.paragraphLoading}></div>
          <div className={classes.linkLoading}></div>
        </article>
      </>
    );
  }
};

export const ArticleSnippets = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [createSnippetModalOpen, setCreateSnippetModalOpen] = useState(false);
  const [snippetTitle, setSnippetTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [snippetToEdit, setSnippetToEdit] = useState();
  const [edit, setEdit] = useState(false);
  const cmRef = useRef();

  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { article_snippets, topics, selectedTopic },
  } = state;

  const fetchArticleSnippets = async (ids: number[]) => {
    setLoading(true);
    const res = await getArticleSnippets(ids);
    dispatch({ type: "SET_SNIPPETS", payload: res });
    setLoading(false);
  };

  useEffect(() => {
    if (topics.data[selectedTopic].article_snippets) {
      setPageTitle(`${topics.data[selectedTopic].title} | Snippets`);
      fetchArticleSnippets(topics.data[selectedTopic].article_snippets);
    }
  }, [selectedTopic, topics.data]);

  const toggleModal = () => {
    setCreateSnippetModalOpen(!createSnippetModalOpen);
  };

  const onChangeSnippetTitle = (val) => {
    setSnippetTitle(val);
  };

  const onChangeSnippetEditTitle = (val) => {
    setEditTitle(val);
  };

  const codeMirrorHandle = (cm) => {
    cmRef.current = cm;
  };

  const onCreateSnippet = async () => {
    try {
      if (cmRef.current) {
        // @ts-ignore
        const snippetValue = cmRef.current.getValue();
        if (snippetValue) {
          const newSnippet: NewArticleSnippet = {
            title: snippetTitle,
            content: snippetValue,
            origin: "TIGUM",
            topic_id: topics.data[selectedTopic].id,
          };
          const res = await createArticleSnippet(newSnippet);
          dispatch({ type: "ADD_SNIPPET", payload: res });
          toggleModal();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEditSnippet = async () => {
    if (cmRef.current) {
      // @ts-ignore
      const snippetValue = cmRef.current.getValue();
      if (snippetValue) {
        const editedSnippet: NewArticleSnippet = {
          // @ts-ignore
          id: snippetToEdit.id,
          title: editTitle,
          content: snippetValue,
          origin: "TIGUM",
          topic_id: topics.data[selectedTopic].id,
        };
        const res = await updateArticleSnippet(editedSnippet);
        dispatch({ type: UPDATE_SNIPPET, payload: res });
        toggleEdit();
      }
    }
  };

  const onEditOpen = (snippet) => {
    setEditTitle(snippet.title);
    setEditContent(snippet.content);
    setSnippetToEdit(snippet);
    toggleEdit();
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className="ph2 mt4 pt3">
      {createSnippetModalOpen && (
        <Modal
          title="Create snippet"
          buttonText="Create Snippet"
          actions={[
            {
              action: onEditSnippet,
              text: "Edit Snippet",
              textColor: "white",
              btnColor: "#246bf8",
              position: "white",
            },
          ]}
          display={createSnippetModalOpen}
          onClickAction={onCreateSnippet}
          toggleModal={toggleModal}
        >
          <MarkdownEditor
            initialValue={""}
            onSave={onCreateSnippet}
            codeMirrorHandle={codeMirrorHandle}
            spellChecker={false}
            useHighlightJS
            highlightTheme="ally-dark"
            theme={theme}
            title={""}
            onEditTitle={onChangeSnippetTitle}
            autoFocusEditTitle={true}
          />
        </Modal>
      )}
      <NewButton onClick={toggleModal} text="New Snippet" />
      <FeedbackButton />
      <div className={classes.snippetsContainer}>
        <Snippets
          snippets={article_snippets}
          loading={loading}
          onEdit={onEditOpen}
        />
      </div>
    </div>
  );
};
