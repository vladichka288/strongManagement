import { put, select } from "redux-saga/effects";
import * as actions from "../actions/reports";
import axios from "axios";
export function* sendReportSaga(action) {
  let token = action.token;
  let taskId = action.taskId;
  let googleLink = action.googleLink;
  let name = action.name;
  let description = action.description;
  let ownerId = action.ownerId;
  yield put(actions.sendArticleStart());
  try {
    yield axios.delete(
      `https://strongmanagment-default-rtdb.firebaseio.com/tasks/${taskId}.json?auth=${token}`
    );
    yield axios.post(
      `https://strongmanagment-default-rtdb.firebaseio.com/reports.json?auth=${token}`,
      {
        name: name,
        description: description,
        answer: googleLink,
        ownerId: ownerId,
      }
    );
    yield put(actions.sendArticleSuccess(taskId));
  } catch (error) {
    console.log(error);
    if (typeof error == "string") yield put(actions.sendArticleFail(error));
    else yield put(actions.sendArticleFail("Something went wrong"));
  }
}
export function* uploadReportsSaga(action) {
  let ownerId = action.ownerId;
  let token = action.token;
  yield put(actions.uploadReportsStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/reports.json?auth=${token}`
    );
    let reportsObject = response.data;
    let reportsArray = [];
    Object.keys(reportsObject).map((key) => {
      if (reportsObject[key].ownerId == ownerId) {
        reportsArray.push({ ...reportsObject[key], id: key });
      }
    });
    yield put(actions.uploadReportsSuccess(reportsArray));
  } catch (error) {
    console.log(error);
    if (typeof error == "string") yield put(actions.uploadReportsFail(error));
    else {
      yield put(actions.uploadReportsFail("Something went wrong"));
    }
  }
}
