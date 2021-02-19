import * as actionTypes from "./actionTypes";

export const getJobStart = () => {
  return { type: actionTypes.GET_JOB_START };
};
export const getJobFail = (error) => {
  return { type: actionTypes.GET_JOB_FAIL, error: error };
};
export const getJobSuccess = () => {
  return {
    type: actionTypes.GET_JOB_SUCCESS,
  };
};
export const getJob = (password, userId, token) => {
  return {
    type: actionTypes.GET_JOB_INITIATE,
    password: password,
    userId: userId,
    token: token,
  };
};

export const leaveWorkFail = (error) => {
  return { type: actionTypes.LEAVE_WORK_FAIL, error: error };
};
export const leaveWorkStart = () => {
  return { type: actionTypes.LEAVE_WORK_START };
};
export const leaveWorkSuccess = (updatedTasks) => {
  return {
    type: actionTypes.LEAVE_WORK_SUCCESS,
    newTasks: updatedTasks,
  };
};
export const leaveWork = (workId, userId, token) => {
  return {
    type: actionTypes.LEAVE_JOB_INITIATE,
    workId: workId,
    userId: userId,
    token: token,
  };
};
