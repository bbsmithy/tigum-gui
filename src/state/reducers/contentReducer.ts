import {
  topicsToKeys,
  addNote,
  addSnippet,
  addVideo,
  addLink
} from '../StateHelpers';

export const contentReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'FETCHING_TOPICS':
      return {
        ...state,
        topics: {
          ...state.topics,
          loading: true
        }
      };
    case 'SET_TOPICS':
      const { data, keys } = topicsToKeys(action.payload);
      return { ...state, topics: { data, keys, loading: false } };
    case 'SET_TOPICS_FAILURE':
      return { ...state, topics: { ...state.topics, loading: false } };
    case 'SET_SELECTED_TOPIC':
      return {
        ...state,
        selectedTopic: action.payload,
        notes: [],
        links: [],
        videos: [],
        article_snippets: []
      };
    case 'SET_SNIPPETS':
      return { ...state, article_snippets: action.payload };
    case 'ADD_SNIPPET': {
      const { id, topic_id } = action.payload;
      const updatedTopicWithSnippet = addSnippet(id, topic_id, state);
      return {
        ...state,
        article_snippets: [action.payload, ...state.article_snippets],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithSnippet,
            ...state.topics.data
          }
        }
      };
    }
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTE': {
      const { id, topic_id } = action.payload;
      const updatedTopicWithNote = addNote(id, topic_id, state);
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithNote,
            ...state.topics.data
          }
        }
      };
    }

    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'ADD_VIDEO': {
      const { id, topic_id } = action.payload;
      const updatedTopicWithVideo = addVideo(id, topic_id, state);
      return {
        ...state,
        videos: [action.payload, ...state.videos],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithVideo,
            ...state.topics.data
          }
        }
      };
    }

    case 'SET_CODES':
      return { ...state, codes: action.payload };
    case 'ADD_CODE':
      const { id, topic_id } = action.payload;
      const updatedTopicWithLink = addLink(id, topic_id, state);
      return {
        ...state,
        codes: [action.payload, ...state.codes],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithLink,
            ...state.topics.data
          }
        }
      };
    case 'SET_IMAGES':
      return {
        ...state,
        images: action.payload
      };
    case 'ADD_IMAGE':
      return {
        ...state,
        images: [action.payload, ...state.images]
      };
    case 'SET_LINKS':
      return {
        ...state,
        links: action.payload
      };
    case 'ADD_LINK': {
      const { id, topic_id } = action.payload;
      const updatedTopicWithLink = addLink(id, topic_id, state);
      debugger;
      return {
        ...state,
        codes: [action.payload, ...state.links],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopicWithLink,
            ...state.topics.data
          }
        }
      };
    }

    default:
      return state;
  }
};