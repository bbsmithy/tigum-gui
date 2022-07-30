import { ResourceResult, ResourceTypeName } from "../types";
import {
  DELETE_LINK,
  DELETE_RESOURCE,
  DISPLAY_NOTIFICATION,
  HIDE_NOTIFICATION,
  UPDATE_RESOURCE,
} from "./ActionTypes";

export const notify = (dispatch, message, variant, position) => {
  dispatch({
    type: DISPLAY_NOTIFICATION,
    payload: { message, variant, position },
  });
  setTimeout(() => {
    dispatch({
      type: HIDE_NOTIFICATION,
    });
  }, 2000);
};

export const deleteLinkAction = (id: number) => ({
  type: DELETE_LINK,
  payload: id,
});

export const updateResource = (
  resource: ResourceResult,
  type: ResourceTypeName
) => {
  return {
    type: UPDATE_RESOURCE,
    payload: {
      topicId: resource.topic_id,
      resourceKey: resource.key,
      resource,
    },
  };
};
export const deleteResource = (topicId, type: ResourceTypeName) => {
  return {
    type: DELETE_RESOURCE,
    payload: {
      topicId,
      resourceKey: `${type}_${topicId}`,
    },
  };
};
