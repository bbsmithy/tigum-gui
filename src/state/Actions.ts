import { DISPLAY_NOTIFICATION, HIDE_NOTIFICATION } from './ActionTypes';

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
