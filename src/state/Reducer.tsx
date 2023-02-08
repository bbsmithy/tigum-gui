import { SCREENS } from "../routers/MainRouter";
import ContentReducer from "./reducers/contentReducer";
import NavigationReducer from "./reducers/navigationReducer";
import UserReducer from "./reducers/userReducer";

export type InitialState = typeof initialState;

export const initialState = {
  content: {
    topics: { data: {}, keys: [], loading: true },
    selectedTopic: null,
    resources: null,
    loadingResources: false,
  },
  user: {
    name: "",
    id: null,
    email: "",
    loggedIn: false,
  },
  navigation: {
    showTopicNavbar: true,
    showSidebar: true,
    topicScreen: SCREENS.ALL_NOTES,
  },
};

export const reducer = ({ content, navigation, user }, action: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Action: ${action.type}`,
      "Payload: ",
      action.payload,
      "State: ",
      { content, navigation, user }
    );
  }
  return {
    content: ContentReducer(content, action),
    navigation: NavigationReducer(navigation, action),
    user: UserReducer(user, action),
  };
};
