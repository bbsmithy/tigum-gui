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
import {
  LOADING_RESOURCES_FOR_TOPIC,
  SET_RESOURCES_FOR_TOPIC,
  UPDATE_SNIPPET,
} from "../../state/ActionTypes";
import { useStateValue } from "../../state/StateProvider";
import { resourceResponseToState } from "../../state/StateHelpers";

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
              topicId={r.topic_id}
              index={0}
              onClick={(video: any) => {
                goto(`topic/${r.topic_id}/videos/${video.id}`);
              }}
            />
          );
        } else if (r.result_type === "link") {
          return (
            <LinkCard
              title={r.title}
              id={r.resource_id}
              source={r.misc}
              favicon_source={r.misc2}
              topicId={r.topic_id}
              published={r.published}
            />
          );
        } else {
          return (
            <ArticleCard
              onEdit={onEditSnippet}
              content={r.title}
              origin={r.misc}
              id={r.resource_id}
              topicId={r.topic_id}
              published={r.published}
              title={r.misc2}
            />
          );
        }
      })}
    </div>
  );
};

const splitToMasonaryRows = (resources) => {
  const columns = {
    col1: [],
    col2: [],
  };
  Object.keys(resources).forEach((key, idx) => {
    if (idx % 2 === 0) {
      columns.col2.push({ key, ...resources[key] });
    } else {
      columns.col1.push({ key, ...resources[key] });
    }
  });
  return columns;
};

const MasonaryLayout = ({ topicResources }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [snippetToEdit, setSnippetToEdit] = useState();
  const [edit, setEdit] = useState(false);
  const cmRef = useRef();

  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { topics, selectedTopic, resources },
  } = state;

  const resourceCols = splitToMasonaryRows(topicResources);

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
          // @ts-ignore
          origin: snippetToEdit.origin,
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

  return (
    <>
      <div className={classes.container}>
        <Column resources={resourceCols.col1} onEditSnippet={onEditOpen} />
        <Column resources={resourceCols.col2} onEditSnippet={onEditOpen} />
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
};

const MainTopicScreen = ({ topic }: RouterProps) => {
  const classes = useStyles();
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const {
    content: { resources, loadingResources },
  } = state;

  const fetchTopicResources = async (topicId: number) => {
    try {
      if (resources && resources[topicId]) {
        dispatch({
          type: SET_RESOURCES_FOR_TOPIC,
          payload: { topicId, resources: resources[topicId] },
        });
      } else {
        dispatch({ type: LOADING_RESOURCES_FOR_TOPIC });
        const topicResourcesResponse = await getAllTopicResources(topicId);
        const parsedResourcesResponse = resourceResponseToState(
          topicResourcesResponse
        );
        dispatch({
          type: SET_RESOURCES_FOR_TOPIC,
          payload: { topicId, resources: parsedResourcesResponse },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTopicResources(topic.id);
  }, [topic]);

  if (loadingResources) {
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
  } else if (resources && resources[topic.id]) {
    return <MasonaryLayout topicResources={resources[topic.id]} />;
  } else {
    return null;
  }
};

export default MainTopicScreen;
