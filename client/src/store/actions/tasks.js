import * as actionTypes from "./actionTypes";
export const getWorksTasksStart = () => {
  return { type: actionTypes.GET_WORKS_TASKS_START };
};
export const getWorksTasksFail = (error) => {
  return { type: actionTypes.GET_WORKS_TASKS_FAIL, error: error };
};
export const getWorksTasksSuccess = (worksTask) => {
  return { type: actionTypes.GET_WORKS_TASKS_SUCCESS, worksTask: worksTask };
};
export const getWorksTasks = (userId, token) => {
  return {
    type: actionTypes.GET_WORKS_TASKS_INITIATE,
    userId: userId,
    token: token,
  };
};

export const addTaskFail = (error) => {
  return { type: actionTypes.ADD_TASK_FAIL, error: error };
};
export const addTaskStart = () => {
  return { type: actionTypes.ADD_TASK_START };
};

export const addTaskSuccess = (tasks) => {
  return {
    type: actionTypes.ADD_TASK_SUCCESS,
    tasks: tasks,
  };
};

export const addTask = (
  userId,
  workId,
  recipientId,
  token,
  taskLabel,
  taskDescription
) => {
  return {
    type: actionTypes.ADD_TASK_INITIATE,
    userId: userId,
    workId: workId,
    recipientId: recipientId,
    token: token,
    taskLabel: taskLabel,
    taskDescription: taskDescription,
  };
};

export const uploadSelectedTasksStart = () => {
  return { type: actionTypes.UPLOAD_SELECTED_TASKS_START };
};
export const uploadSelectedTasksFail = (err) => {
  return { type: actionTypes.UPLOAD_SELECTED_TASKS_FAIL, error: err };
};
export const uploadSelectedTasksSuccess = (tasks) => {
  return { type: actionTypes.UPLOAD_SELECTED_TASKS_SUCCESS, tasks: tasks };
};
export const uploadSelectedTasks = (workId, userId, token) => {
  return {
    type: actionTypes.UPLOAD_SELECTED_TASKS_INITATE,
    workId: workId,
    userId: userId,
    token: token,
  };
};
export const getTasksNumberStart = () => {
  return { type: actionTypes.GET_TASKS_NUMBER_START };
};
export const getTasksNumberFail = (error) => {
  return { type: actionTypes.GET_TASKS_NUMBER_FAIL, error: error };
};
export const getTasksNumberSuccess = (countTasks) => {
  return {
    type: actionTypes.GET_TASKS_NUMBER_SUCCESS,
    countTasks: countTasks,
  };
};

export const getTasksNumber = (token, userId) => {
  return {
    type: actionTypes.GET_TASKS_NUMBER_INITIATE,
    token: token,
    userId: userId,
  };
};
