import { put } from "redux-saga/effects";
import * as actions from "../actions/work";
import axios from "axios";
import getUserWorks from "../../functions/getUserWorks";
export function* createWorkSaga(action) {
  let name = action.name;
  let description = action.description;
  let userId = action.userId;
  let token = action.token;
  yield put(actions.createWorkStart());
  if (name.length < 1 || name.length > 50) {
    yield put(
      actions.createWorkFail(
        "Ooops, name has to be between 1 and 20 characters!"
      )
    );
  } else if (description.length < 3 || description.length > 500) {
    yield put(
      actions.createWorkFail(
        "Ooops, description has to be between 3 and 500 characters!"
      )
    );
  } else {
    let work = {
      name: name,
      description: description,
      ownerId: userId,
      workers: [],
    };
    try {
      let response = yield axios.get(
        "https://www.uuidgenerator.net/api/version1"
      );
      work = { ...work, password: response.data };
      yield axios.post(
        `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`,
        work
      );
      yield put(actions.createWorkSuccess());
    } catch (error) {
      if (typeof error == "string") yield put(actions.createWorkFail(error));
      else yield put(actions.createWorkFail("Ooops, some propblem exists"));
    }
  }
}
export function* uploadWorksSaga(action) {
  let userId = action.userId;
  let token = action.token;
  yield put(actions.uploadWorksStart());
  try {
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
    );
    yield put(actions.uploadWorksSuccess(getUserWorks(userId, response.data)));
  } catch (error) {
    if (typeof error == "string") yield put(actions.uploadWorksFail(error));
    else yield put(actions.uploadWorksFail("Ooops, some propblem exists"));
  }
}
export function* removeWorkSaga(action) {
  let prevWorks = action.prevWorks;
  let workId = action.workId;
  let token = action.token;
  yield put(actions.removeWorkStart());
  try {
    yield axios.delete(
      `https://strongmanagment-default-rtdb.firebaseio.com/works/${workId}.json?auth=${token}`
    );
    let newWorks = [];
    for (let i = 0; i < prevWorks.length; i++) {
      if (prevWorks[i].id != workId) {
        newWorks.push(prevWorks[i]);
      }
    }
    yield put(actions.removeWorkSuccess(newWorks));
  } catch (err) {
    if (typeof err == "string") yield put(actions.removeWorkFail(err));
    else yield put(actions.removeWorkFail("Ooops, some propblem exists"));
  }
}
