import contentReducer from './reducers/contentReducer';
import navigationReducer from './reducers/navigationReducer';
import userReducer from './reducers//userReducer';
import { TOPIC_SCREENS } from '../routers/TopicRouter';

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
    links: [],
  },
  user: {
    name: '',
    id: null,
    email: '',
    loggedIn: false,
  },
  navigation: {
    showTopicNavbar: true,
    showSidebar: true,
    topicScreen: 0,
  },
};

export const reducer = ({ content, navigation, user }, action: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Action: ${action.type}`, 'Payload: ', action.payload);
  }
  return {
    content: contentReducer(content, action),
    navigation: navigationReducer(navigation, action),
    user: userReducer(user, action),
  };
};
