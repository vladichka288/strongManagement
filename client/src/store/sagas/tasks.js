import { put } from "redux-saga/effects";
import * as actions from "../actions/tasks";
import axios from "axios";
export function* getWorksTasksSaga(action) {
  let userId = action.userId;
  let token = action.token;
  yield put(actions.getWorksTasksStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
    );
    let worksTasks = [];
    let allWorks = response.data;
    for (let key in allWorks) {
      if (allWorks[key].hasOwnProperty("workers")) {
        if (allWorks[key].workers.includes(userId)) {
          worksTasks.push({ ...allWorks[key], tasks: [] });
        }
      }
    }
    let responseTwo = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
    );
    let allTasks = responseTwo.data;
    console.log(allTasks);
    for (let taskId in allTasks) {
      if (allTasks[taskId].recipientId == userId)
        for (let work of worksTasks) {
          if (work.id == allTasks[taskId].workId)
            work = {
              ...work,
              tasks: work.tasks.push({ ...allTasks[taskId], id: taskId }),
            };
        }
    }
    yield put(actions.getWorksTasksSuccess(worksTasks));
  } catch (error) {
    console.log(error);
    yield put(actions.getWorksTasksFail(error));
  }
}
export function* addTaskSaga(action) {
  let userId = action.userId;
  let workId = action.workId;
  let recipientId = action.recipientId;
  let token = action.token;
  let taskLabel = action.taskLabel;
  let taskDescription = action.taskDescription;

  yield put(actions.addTaskStart());
  try {
    yield axios.post(
      `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`,
      {
        workId: workId,
        recipientId: recipientId,
        name: taskLabel,
        ownerId: userId,
        description: taskDescription,
      }
    );
    yield put(actions.addTaskSuccess());
  } catch (err) {
    console.log(err);
    if (typeof err == "string") yield put(actions.addTaskFail(err));
    else yield put(actions.addTaskFail("Something went wrong"));
  }
}
export function* uploadSelectedTasksSaga(action) {
  let workId = action.workId;
  let userId = action.userId;
  let token = action.token;
  yield put(actions.uploadSelectedTasksStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
    );
    let allTasks = response.data;
    let resultTasks = [];
    for (let taskId in allTasks) {
      if (
        allTasks[taskId].workId == workId &&
        allTasks[taskId].recipientId == userId
      )
        resultTasks.push({ ...allTasks[taskId], id: taskId });
    }
    yield put(actions.uploadSelectedTasksSuccess(resultTasks));
  } catch (err) {
    if (typeof err == "string") yield put(actions.uploadSelectedTasksFail(err));
    else
      yield put(actions.uploadSelectedTasksFail("Ooops, some propblem exists"));
  }
}
export function* getTasksNumberSaga(action) {
  let token = action.token;
  let userId = action.userId;
  yield put(actions.getTasksNumberStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
    );
    let countTasks = 0;
    let Tasks = response.data;
    for (let key in Tasks) {
      if (Tasks[key].recipientId == userId) countTasks++;
    }
    yield put(actions.getTasksNumberSuccess(countTasks));
  } catch (error) {
    console.log(error);
    yield put(actions.getTasksNumberFail(error));
  }
}
