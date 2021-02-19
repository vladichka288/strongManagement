import { put } from "redux-saga/effects";
import * as actions from "../actions/workers";
import axios from "axios";
import getWorkersByWork from "../../functions/getWorkersByWork";
export function* uploadWorkersSaga(action) {
  let workId = action.workId;
  let userId = action.userId;
  let token = action.token;
  yield put(actions.uploadWorkersStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
    );
    let selectedWork = response.data[workId];
    if (selectedWork.ownerId != userId)
      throw "Oooops, you dont have enough permissions to upload this page";
    let responseTwo = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/users.json?auth=${token}`
    );
    let allWorkersArray = getWorkersByWork(responseTwo.data, selectedWork);
    yield put(actions.uploadWorkersSuccess(allWorkersArray.workers));
  } catch (error) {
    if (typeof error == "string") yield put(actions.uploadWorkersFail(error));
    else yield put(actions.uploadWorkersFail("Ooops, something went wrong"));
  }
}
export function* deleteWorkerSaga(action) {
  let token = action.token;
  let workId = action.workId;
  let userId = action.userId;
  yield put(actions.deleteWorkerStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/works/${workId}.json?auth=${token}`
    );
    let currentWorkers = response.data.workers;
    let indexUserId = currentWorkers.indexOf(userId);
    if (indexUserId > -1) {
      currentWorkers.splice(indexUserId, 1);
    }
    yield axios.patch(
      `https://strongmanagment-default-rtdb.firebaseio.com/works/${workId}.json?auth=${token}`,
      response.data
    );
    let allTasksObject = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/tasks.json?auth=${token}`
    );
    let tasksToDelete = [];
    let allTasksObjectData = allTasksObject.data;
    Object.keys(allTasksObjectData).map((key) => {
      console.log(key);
      console.log(allTasksObjectData[key]);
      if (
        allTasksObjectData[key].workId == workId &&
        allTasksObjectData[key].recipientId == userId
      )
        tasksToDelete.push({ ...allTasksObjectData[key], id: key });
    });
    console.log(tasksToDelete);
    for (let i = 0; i < tasksToDelete.length; i++) {
      yield axios.delete(
        `https://strongmanagment-default-rtdb.firebaseio.com/tasks/${tasksToDelete[i].id}.json?auth=${token}`
      );
    }
    yield put(actions.deleteWorkerSuccess(currentWorkers));
  } catch (error) {
    console.log(error);
    yield put(actions.deleteWorkerFail(error));
  }
}
