import * as actionTypes from "./actionTypes";
//CREATE
import getUserWorks from "../../functions/getUserWorks";
export const createWorkFail = (error) => {
  return { type: actionTypes.CREATE_WORK_FAIL, error: error };
};
export const createWorkStart = () => {
  return { type: actionTypes.CREATE_WORK_START };
};
export const createWorkSuccess = () => {
  return {
    type: actionTypes.CREATE_WORK_SUCCESS,
  };
};
export const createWork = (name, description, userId, token) => {
  return {
    type: actionTypes.CREATE_WORK_INITIATE,
    name: name,
    description: description,
    userId: userId,
    token: token,
  };
};
//UPLOAD
export const uploadWorksStart = () => {
  return { type: actionTypes.UPLOAD_WORKS_START };
};
export const uploadWorksFail = (error) => {
  return { type: actionTypes.UPLOAD_WORKS_FAIL, error: error };
};
export const uploadWorksSuccess = (works) => {
  return {
    type: actionTypes.UPLOAD_WORKS_SUCCESS,
    works: works,
  };
};
export const uploadWorks = (userId, token) => {
  return {
    type: actionTypes.UPLOAD_WORKS_INITIATE,
    userId: userId,
    token: token,
  };
};
//REMOVE
export const removeWorkStart = () => {
  return { type: actionTypes.REMOVE_WORK_START };
};
export const removeWorkFail = (error) => {
  return { type: actionTypes.REMOVE_WORK_FAIL, error: error };
};
export const removeWorkSuccess = (works) => {
  return {
    type: actionTypes.REMOVE_WORK_SUCCESS,
    works: works,
  };
};
export const removeWork = (workId, token, prevWorks) => {
  return {
    type: actionTypes.REMOVE_WORK_INITIATE,
    workId: workId,
    token: token,
    prevWorks: prevWorks,
  };
};
//
//
//
