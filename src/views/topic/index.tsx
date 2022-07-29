import React, { useEffect, useRef, useState } from "react";
import { Topic } from "../../clib/models";
import { getAllTopicResources, updateArticleSnippet } from "../../clib/api";
import {
  ArticleCard,
  LinkCard,
  LoadingCard,
  Modal,
  Note,
  VideoCard,
} from "../../components";
import { createUseStyles } from "react-jss";
import { goto } from "../../util";
import LoadingSnippet from "../../components/LoadingSnippet";
import { LoadingVideo } from "../../components/LoadingVideo";
import { MarkdownEditor } from "../../components/MarkdownEditor/lib";
import { UPDATE_SNIPPET } from "../../state/ActionTypes";
import { useStateValue } from "../../state/StateProvider";

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

export enum SCREENS {
  LINKS,
  ARTICLE_SNIPPETS,
  ALL_VIDEOS,
  ALL_NOTES,
  VIDEO_PLAYER,
  VIEW_NOTE,
  CODE,
  IMAGES,
  EXCERCISES,
  LOADING,
  NONE,
}

type RouterProps = {
  topic: Topic;
};

const useStyles = createUseStyles({
  container: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    padding: 10,
    marginTop: "4%",
  },
});

const Column = ({ resources, onEditSnippet }) => {
  return (
    <div style={{ flex: 1 }}>
      {resources?.map((r) => {
        if (r.result_type === "note") {
          return (
            <Note
              title={r.title}
              id={r.resource_id}
              topicId={r.topic_id}
              date_updated={r.updated}
              published={r.published}
            />
          );
        } else if (r.result_type === "video") {
          return (
            <VideoCard
              date_created=""
              date_updated={r.updated}
              published={r.published}
              iframe={r.misc1}
              title={r.title}
              thumbnail_img={r.misc2}
              id={r.resource_id}
              topicId={r.topicId}
              index={0}
              onClick={(video: any) => {
                goto(`topic/${r.topic_id}/videos/${video.id}`);
              }}
              onDelete={() => {}}
            />
          );
        } else if (r.result_type === "link") {
          return (
            <LinkCard
              title={r.title}
              id={r.resource_id}
              source={r.misc}
              favicon_source={r.misc2}
              index={0}
              published={r.published}
            />
          );
        } else {
          return (
            <ArticleCard
              onEdit={onEditSnippet}
              content={r.title}
              origin={r.misc}
              id={0}
              index={0}
              published={r.published}
              title={r.misc2}
            />
          );
        }
      })}
    </div>
  );
};

const MainTopicScreen = ({ topic }: RouterProps) => {
  const [loading, setLoading] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [snippetToEdit, setSnippetToEdit] = useState();
  const [edit, setEdit] = useState(false);
  const cmRef = useRef();

  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics, selectedTopic },
  } = state;

  const [topicResources, setTopicResources] = useState({
    col1: [],
    col2: [],
  });

  const classes = useStyles();

  const topicsCache = useRef(new Map<number, any>());
  const splitToMasonaryRows = (resources) => {
    const columns = {
      col1: [],
      col2: [],
    };
    resources.forEach((r, idx) => {
      if (idx % 2 === 0) {
        columns.col2.push(r);
      } else {
        columns.col1.push(r);
      }
    });
    return columns;
  };

  const fetchTopicResources = async (topicId: number) => {
    const cachedTopic = topicsCache.current.get(topicId);
    if (cachedTopic) {
      setTopicResources(cachedTopic);
    } else {
      setLoading(true);
      const topicResources = await getAllTopicResources(topicId);
      const topicResourceColumns = splitToMasonaryRows(topicResources);
      topicsCache.current.set(topicId, topicResourceColumns);
      setTopicResources(topicResourceColumns);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopicResources(topic.id);
  }, [topic]);

  const onEditSnippet = async () => {
    if (cmRef.current) {
      // @ts-ignore
      const snippetValue = cmRef.current.getValue();
      if (snippetValue) {
        const editedSnippet = {
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

  const codeMirrorHandle = (cm) => {
    cmRef.current = cm;
  };

  const onEditOpen = (snippet) => {
    setEditTitle(snippet.title);
    setEditContent(snippet.content);
    setSnippetToEdit(snippet);
    toggleEdit();
  };

  const onChangeSnippetEditTitle = (val) => {
    setEditTitle(val);
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  if (loading) {
    return (
      <div className={classes.container}>
        <div style={{ flex: 1 }}>
          <LoadingCard />
          <LoadingSnippet />
          <LoadingVideo />
        </div>
        <div style={{ flex: 1 }}>
          <LoadingSnippet />
          <LoadingCard />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className={classes.container}>
          <Column resources={topicResources.col1} onEditSnippet={onEditOpen} />
          <Column resources={topicResources.col2} onEditSnippet={onEditOpen} />
        </div>
        {edit && editContent && (
          <Modal
            title="Edit snippet"
            buttonText="Edit Snippet"
            actions={[
              {
                action: onEditSnippet,
                text: "Edit Snippet",
                textColor: "white",
                btnColor: "#246bf8",
                position: "white",
              },
            ]}
            display={edit}
            onClickAction={onEditSnippet}
            toggleModal={toggleEdit}
          >
            <MarkdownEditor
              initialValue={editContent}
              onSave={onEditSnippet}
              codeMirrorHandle={codeMirrorHandle}
              spellChecker={false}
              useHighlightJS
              highlightTheme="ally-dark"
              theme={theme}
              title={editTitle}
              onEditTitle={onChangeSnippetEditTitle}
              autoFocusEditTitle={true}
            />
          </Modal>
        )}
      </>
    );
  }
};

export default MainTopicScreen;
