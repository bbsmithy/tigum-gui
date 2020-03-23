import { Topic, Code, Note, Link, Image } from '../client-lib/models';
import { contentReducer } from './reducers/contentReducer';
import { navigationReducer } from './reducers/navigationReducer';

export type InitialState = typeof initialState;

export const initialState = {
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
  },
  navigation: {
    showTopicNavbar: true,
    showSidebar: true
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
  console.log(
    `Action: ${action.type}`,
    `Payload ${JSON.stringify(action.payload)}`
  );
  return {
    content: contentReducer(content, action),
    navigation: navigationReducer(navigation, action),
    user: userReducer(user, action)
  };
};
