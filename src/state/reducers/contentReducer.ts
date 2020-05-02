import {
  topicsToKeys,
  videosToKey,
  addNote,
  addSnippet,
  addVideo,
  addLink,
  deleteTopic,
  notesToKeys,
} from '../StateHelpers';

import {
  FETCHING_TOPICS,
  SET_SELECTED_RESOURCE,
  SET_TOPICS,
  SET_TOPICS_FAILURE,
  SET_SELECTED_TOPIC,
  SET_SNIPPETS,
  ADD_SNIPPET,
  SET_NOTES,
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
} from '../ActionTypes';

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
    case SET_NOTES: {
      const { data, keys } = notesToKeys(action.payload);
      return { ...state, notes: { data, keys } };
    }
    case ADD_NOTE: {
      const { id, topic_id } = action.payload;
      const updatedTopicWithNote = addNote(id, topic_id, state);
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithNote,
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
      const { id, topic_id } = action.payload;
      const updatedTopicWithVideo = addVideo(id, topic_id, state);
      return {
        ...state,
        videos: [action.payload, ...state.videos],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithVideo,
            ...state.topics.data,
          },
        },
      };
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
        codes: [action.payload, ...state.links],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithLink,
            ...state.topics.data,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default ContentReducer;
