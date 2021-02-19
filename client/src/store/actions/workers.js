import * as actionTypes from "./actionTypes";

export const uploadWorkersFail = (error) => {
  return { type: actionTypes.UPLOAD_WORKERS_FAIL, error: error };
};
export const uploadWorkersStart = () => {
  return { type: actionTypes.UPLOAD_WORKERS_START };
};
export const uploadWorkersSuccess = (workers) => {
  return {
    type: actionTypes.UPLOAD_WORKERS_SUCCESS,
    workers: workers,
  };
};
export const uploadWorkers = (workId, userId, token) => {
  return {
    type: actionTypes.UPLOAD_WORKERS_INITIATE,
    workId: workId,
    userId: userId,
    token: token,
  };
};

export const deleteWorkerStart = () => {
  return { type: actionTypes.DELETE_WORKER_START };
};
export const deleteWorkerFail = (error) => {
  return { type: actionTypes.DELETE_WORKER_FAIL, error: error };
};
export const deleteWorkerSuccess = (currentWorkers) => {
  return {
    type: actionTypes.DELETE_WORKER_SUCCESS,
    currentWorkers: currentWorkers,
  };
};

export const deleteWorker = (token, workId, userId) => {
  return {
    type: actionTypes.DELETE_WORKER_INITIATE,
    token: token,
    workId: workId,
    userId: userId,
  };
};
