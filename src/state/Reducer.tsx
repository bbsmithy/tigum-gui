import { Topic, Code, Note, Link, Image } from '../client-lib/models';
import { topicsToKeys, addNote, addSnippet } from './StateHelpers';

export type InitialState = {
  content: {
    topics: { data: any; keys: number[]; loading: boolean };
    selectedTopic: number;
    notes: Array<Note>;
    videos: Array<any>;
    article_snippets: Array<any>;
    codes: Array<Code>;
    images: Array<Image>;
    links: Array<Link>;
  };
  user: {
    name: string;
    id: number;
    email: string;
    loggedIn: boolean;
  };
};

export const initialState: InitialState = {
  content: {
    topics: { data: {}, keys: [], loading: true },
    selectedTopic: null,
    notes: [],
    videos: [],
    codes: [],
    article_snippets: [],
    images: [],
    links: []
  },
  user: {
    name: '',
    id: null,
    email: '',
    loggedIn: false
  }
};

const contentReducer = (state: any, action: any) => {
  console.log(state);
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
      return { ...state, selectedTopic: action.payload };
    case 'SET_SNIPPETS':
      return { ...state, article_snippets: action.payload };
    case 'ADD_SNIPPET':
      const { id, topic_id } = action.payload;
      const updatedTopicWithSnippet = addSnippet(id, topic_id, state);
      debugger;
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
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTE': {
      const { id, topic_id } = action.payload;
      const updatedTopic = addNote(id, topic_id, state);
      debugger;
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        topics: {
          ...state.topics,
          data: {
            [action.payload.topic_id]: updatedTopic,
            ...state.topics.data
          }
        }
      };
    }

    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'ADD_VIDEO':
      return { ...state, videos: [action.payload, ...state.videos] };
    case 'SET_CODES':
      return { ...state, codes: action.payload };
    case 'ADD_CODE':
      return {
        ...state,
        codes: [action.payload, ...state.codes]
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
    case 'ADD_LINK':
      return {
        ...state,
        links: [action.payload, ...state.links]
      };
    default:
      return state;
  }
};

export const navigationReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screenTree: action.payload };
    default:
      return state;
  }
};

export const userReducer = (state: any, action: any) => {
  console.log(state);
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        email: action.payload.email,
        loggedIn: true
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        name: action.payload.name,
        id: action.payload.id,
        email: action.payload.email,
        loggedIn: true
      };
    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

export const reducer = ({ content, navigation, user }, action: any) => {
  console.log(`Action: ${action.type}`, `Payload ${action.payload}`);
  return {
    content: contentReducer(content, action),
    navigation: navigationReducer(navigation, action),
    user: userReducer(user, action)
  };
};
