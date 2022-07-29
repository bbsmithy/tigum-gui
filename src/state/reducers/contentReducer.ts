import {
  topicsToKeys,
  deleteTopic,
  resourceResponseToState,
} from "../StateHelpers";

import {
  FETCHING_TOPICS,
  SET_SELECTED_RESOURCE,
  SET_TOPICS,
  SET_TOPICS_FAILURE,
  SET_SELECTED_TOPIC,
  DELETE_TOPIC,
  DISPLAY_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_RESOURCES_FOR_TOPIC,
} from "../ActionTypes";

// const initState = {
//   topics: {},
//   resources: {
//     topicId: {
//       resourceType_id: {}
//     }
//   }
// };

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
    case SET_RESOURCES_FOR_TOPIC:
      const resources = resourceResponseToState(action.payload.resources);
      return {
        ...state,
        resources: {
          ...state.resources,
          [action.payload.topicId]: resources,
        },
      };
    case SET_SELECTED_RESOURCE:
      return {
        ...state,
        selectedResourceId: action.payload,
      };
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
