import * as actionTypes from "./actionTypes";
export const authStart = () => {
  return { type: actionTypes.AUTH_START };
};
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const authFail = (error) => {
  return { type: actionTypes.AUTH_FAIL, error: error };
};
export const auth = (login, password, repeatPassword, nickname) => {
  return {
    type: actionTypes.AUTH_INITATE,
    login: login,
    password: password,
    repeatPassword: repeatPassword,
    nickname: nickname,
  };
};
//
//
export const loginStart = () => {
  return { type: actionTypes.LOGIN_START };
};
export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const loginFail = (error) => {
  return { type: actionTypes.LOGIN_FAIL, error: error };
};
export const login = (login, password) => {
  return {
    type: actionTypes.LOGIN_INITIATE,
    login: login,
    password: password,
  };
};
export const logout = () => {
  return { type: actionTypes.LOGOUT };
};
export const googleAuthStart = () => {
  return { type: actionTypes.GOOGLE_AUTH_START };
};
export const googleAuthFail = (error) => {
  return { type: actionTypes.GOOGLE_AUTH_FAIL, error: error };
};
export const googleAuthSuccess = (token, userId) => {
  return {
    type: actionTypes.GOOGLE_AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const googleAuth = () => {
  return { type: actionTypes.GOOGLE_AUTH_INITIATE };
};
