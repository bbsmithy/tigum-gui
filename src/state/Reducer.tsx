import { Topic, Code, Note, Link, Image } from '../client-lib/models';
import { contentReducer } from './reducers/contentReducer';

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
