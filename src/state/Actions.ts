import {
  DELETE_LINK,
  DISPLAY_NOTIFICATION,
  HIDE_NOTIFICATION,
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
