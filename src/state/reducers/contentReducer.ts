import { topicsToKeys, deleteTopic, deleteResource } from "../StateHelpers";

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
  LOADING_RESOURCES_FOR_TOPIC,
  UPDATE_RESOURCE,
  DELETE_RESOURCE,
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
    case LOADING_RESOURCES_FOR_TOPIC:
      return {
        ...state,
        loadingResources: true,
      };
    case SET_RESOURCES_FOR_TOPIC:
      return {
        ...state,
        loadingResources: false,
        resources: {
          ...state.resources,
          [action.payload.topicId]: action.payload.resources,
        },
      };
    case UPDATE_RESOURCE:
      return {
        ...state,
      };
    case DELETE_RESOURCE:
      const newResourceState = deleteResource(
        state.resources,
        action.payload.resourceKey,
        action.payload.topicId
      );
      return {
        ...state,
        resources: newResourceState,
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
