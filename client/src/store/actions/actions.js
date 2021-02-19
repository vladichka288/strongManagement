import * as actionTypes from "./actionTypes";
export const setPath = (path) => {
  return { type: actionTypes.SET_PATH, path: path };
};
export const setRedirectPath = (path) => {
  return (dispatch) => {
    if (path == "null") {
      dispatch(setPath("null"));
    } else {
      dispatch(setPath(path));
    }
  };
};
export const setRedirectWorkPath = (path) => {
  return { type: actionTypes.SET_REDIRECT_WORK_PATH, path: path };
};
export const setEmptyWorkers = () => {
  return {
    type: actionTypes.SET_EMPTY_WORKERS,
  };
};
export const autoSignUpSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTO_SIGN_UP_SUCCES,
    userId: userId,
    token: token,
  };
};
export const autoSignUp = (userId, token) => {
  return (dispatch) => {
    dispatch(autoSignUpSuccess(userId, token));
  };
};

