import { put, select } from "redux-saga/effects";
import * as actions from "../actions/job";
import axios from "axios";
import getWorkByPassword from "../../functions/getWorkByPassword";
export function* getJobSaga(action) {
  let password = action.password;
  let userId = action.userId;
  let token = action.token;
  yield put(actions.getJobStart());
  if (password.length != 36)
    yield put(actions.getJobFail("Ooops,password must be 36 characters long"));
  else {
    try {
      let response = yield axios.get(
        `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
      );
      let allWorks = response.data;
      let findedWork = getWorkByPassword(allWorks, password);
      if (findedWork.error) throw `${findedWork.error}`;
      else {
        let findedWorkValue = findedWork.work;
        let updatedWorkers = [];
        console.log(findedWorkValue + "findedWork");
        if (findedWorkValue.workers) {
          console.log(findedWorkValue.workers + "findedWork.workers");
          updatedWorkers = findedWorkValue.workers;
          for (let existedWorker of updatedWorkers) {
            if (existedWorker == userId) {
              throw `You already work at this job`;
            }
          }
          updatedWorkers.push(userId);
        } else updatedWorkers.push(userId);
        console.log(updatedWorkers + "updated workers");
        let updatedWork = { ...findedWorkValue, workers: updatedWorkers };
        console.log(findedWork.id);
        yield axios.patch(
          `https://strongmanagment-default-rtdb.firebaseio.com/works/${findedWorkValue.id}.json?auth=${token}`,
          updatedWork
        );
        yield put(actions.getJobSuccess());
      }
    } catch (error) {
      if (typeof error == "string") yield put(actions.getJobFail(error));
      else yield put(actions.getJobFail("Ooops, some propblem exists"));
    }
  }
}
export function* leaveJobSaga(action) {
  let workId = action.workId;
  let userId = action.userId;
  let token = action.token;
  try {
    yield put(actions.leaveWorkStart());
    let response = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/works.json?auth=${token}`
    );
    let selectedWork = response.data[workId];
    console.log(selectedWork);
    let workersIdSelectedWork = selectedWork.workers;
    console.log(workersIdSelectedWork);
    let selfLeaveFromWork = workersIdSelectedWork.filter(
      (workerId) => workerId != userId
    );
    let updatedWork = { ...selectedWork, workers: selfLeaveFromWork };
    yield axios.patch(
      `https://strongmanagment-default-rtdb.firebaseio.com/works/${workId}.json?auth=${token}`,
      updatedWork
    );
    let state = yield select();
    let updatedTasks = state.works.worksTask.filter((w) => w.id != workId);
    console.log(updatedTasks);
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
    yield put(actions.leaveWorkSuccess(updatedTasks));
  } catch (err) {
    console.log(err);
    yield put(actions.leaveWorkFail(err));
  }
}
