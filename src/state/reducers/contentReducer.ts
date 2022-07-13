import {
  topicsToKeys,
  videosToKey,
  addNote,
  addSnippet,
  addVideo,
  addLink,
  deleteTopic,
  deleteResource,
  deleteVideo,
  notesToKeys,
} from "../StateHelpers";

import {
  FETCHING_TOPICS,
  SET_SELECTED_RESOURCE,
  SET_TOPICS,
  SET_TOPICS_FAILURE,
  SET_SELECTED_TOPIC,
  SET_SNIPPETS,
  UPDATE_SNIPPET,
  ADD_SNIPPET,
  SET_NOTES,
  UPDATE_NOTE,
  ADD_NOTE,
  SET_VIDEOS,
  ADD_VIDEO,
  SET_CODES,
  ADD_CODE,
  SET_IMAGES,
  ADD_IMAGE,
  SET_LINKS,
  ADD_LINK,
  DELETE_TOPIC,
  DELETE_VIDEO,
  DISPLAY_NOTIFICATION,
  HIDE_NOTIFICATION,
  DELETE_LINK,
  DELETE_NOTE,
  UPDATE_VIDEO,
  UPDATE_LINK,
} from "../ActionTypes";

const ContentReducer = (state: any, action: any) => {
  switch (action.type) {
    case FETCHING_TOPICS:
      return {
        ...state,
        topics: {
          ...state.topics,
          loading: true,
        },
      };
    case SET_TOPICS:
      const { data, keys } = topicsToKeys(action.payload);
      return { ...state, topics: { data, keys, loading: false } };
    case SET_TOPICS_FAILURE:
      return { ...state, topics: { ...state.topics, loading: false } };
    case SET_SELECTED_TOPIC:
      return {
        ...state,
        selectedTopic: action.payload,
        selectedResourceId: null,
        notes: [],
        links: [],
        videos: [],
        article_snippets: [],
      };
    case DELETE_TOPIC:
      const topics = deleteTopic(
        state.topics.data,
        state.topics.keys,
        action.payload
      );
      return {
        ...state,
        selectedResourceId: null,
        topics,
      };
    case SET_SELECTED_RESOURCE:
      return {
        ...state,
        selectedResourceId: action.payload,
      };
    case SET_SNIPPETS:
      return { ...state, article_snippets: action.payload };
    case ADD_SNIPPET: {
      const { id, topic_id } = action.payload;
      const updatedTopicWithSnippet = addSnippet(id, topic_id, state);
      return {
        ...state,
        article_snippets: [action.payload, ...state.article_snippets],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithSnippet,
            ...state.topics.data,
          },
        },
      };
    }
    case UPDATE_SNIPPET: {
      const newArticleSnippets = state.article_snippets;
      const snippetToUpdateIndex = state.article_snippets.findIndex(
        (snippet) => snippet.id === action.payload.id
      );
      newArticleSnippets[snippetToUpdateIndex] = action.payload;
      return {
        ...state,
        article_snippets: newArticleSnippets,
      };
    }
    case SET_NOTES: {
      const { data, keys } = notesToKeys(action.payload);
      return { ...state, notes: { data, keys } };
    }
    case UPDATE_NOTE: {
      const newState = state;
      newState.notes.data[action.payload.id] = action.payload;
      return newState;
    }
    case ADD_NOTE: {
      const { updatedNotesData, updatedTopicWithNoteId } = addNote(
        action.payload,
        state
      );
      return {
        ...state,
        notes: { data: updatedNotesData },
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithNoteId,
            ...state.topics.data,
          },
        },
      };
    }
    case DELETE_NOTE: {
      const { updatedResourceData, updatedTopic } = deleteResource(
        action.payload.id,
        action.payload.topic_id,
        "notes",
        state
      );
      return {
        ...state,
        notes: { data: updatedResourceData, keys: updatedTopic.notes },
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopic,
            ...state.topics.data,
          },
        },
      };
    }
    case SET_VIDEOS: {
      const videos = videosToKey(action.payload);
      return { ...state, videos };
    }
    case ADD_VIDEO: {
      const { updatedTopicWithVideoId, updatedVideoData } = addVideo(
        action.payload,
        state
      );
      return {
        ...state,
        videos: { data: updatedVideoData },
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithVideoId,
            ...state.topics.data,
          },
        },
      };
    }
    case DELETE_VIDEO: {
      const { updatedTopic, updatedVideoData } = deleteVideo(
        action.payload.id,
        action.payload.topic_id,
        state
      );
      return {
        ...state,
        videos: { data: updatedVideoData, keys: updatedTopic.videos },
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopic,
            ...state.topics.data,
          },
        },
      };
    }
    case UPDATE_VIDEO: {
      const newState = state;
      newState.videos.data[action.payload.id] = action.payload;
      return newState;
    }
    case SET_CODES:
      return { ...state, codes: action.payload };
    case ADD_CODE:
      const { id, topic_id } = action.payload;
      const updatedTopicWithLink = addLink(id, topic_id, state);
      return {
        ...state,
        codes: [action.payload, ...state.codes],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithLink,
            ...state.topics.data,
          },
        },
      };
    case SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images],
      };
    case SET_LINKS:
      return {
        ...state,
        links: action.payload,
      };
    case ADD_LINK: {
      const { id, topic_id } = action.payload;
      const updatedTopicWithLink = addLink(id, topic_id, state);
      return {
        ...state,
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithLink,
            ...state.topics.data,
          },
        },
      };
    }
    case UPDATE_LINK: {
      const newLinksState = state.links;
      const linkToUpdateIndex = state.links.findIndex(
        (snippet) => snippet.id === action.payload.id
      );
      newLinksState[linkToUpdateIndex] = action.payload;
      return {
        ...state,
        links: newLinksState,
      };
    }
    case DELETE_LINK: {
      return {
        ...state,
      };
    }
    case DISPLAY_NOTIFICATION: {
      return {
        ...state,
        notification: action.payload,
      };
    }
    case HIDE_NOTIFICATION: {
      return {
        ...state,
        notification: false,
      };
    }
    default:
      return state;
  }
};

export default ContentReducer;
