import { SET_TOPIC_SCREEN } from '../ActionTypes';

const navigationReducer = (state: any, action: any) => {
  // Step 1:
  // We want to be able to define what topic screen the user is on
  // We also want the option to set the subscreen the user is on e.g notes/:id

  // Step 2:
  // We want to be able to navigate to this screen state based off of the url
  // We could set up a top level effect that listens for url changes and shoots off navigation actions with scree and sub screen

  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, screenTree: action.payload };
    case 'HIDE_TOPIC_NAVBAR':
      return { ...state, showTopicNavbar: false };
    case 'SHOW_TOPIC_NAVBAR':
      return { ...state, showTopicNavbar: true };
    case 'HIDE_SIDEBAR':
      return {
        ...state,
        showSidebar: false,
        useFullWidth: action.payload.useFullWidth,
      };
    case 'SHOW_SIDEBAR':
      return {
        ...state,
        showSidebar: true,
        useFullWidth: action.payload.useFullWidth,
      };
    case SET_TOPIC_SCREEN:
      return {
        ...state,
        topicScreen: action.payload,
      };
    default:
      return state;
  }
};

export default navigationReducer;
