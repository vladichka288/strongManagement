import { authSaga, loginSaga } from "./auth";
import { createWorkSaga, uploadWorksSaga, removeWorkSaga } from "./work";
import { getJobSaga, leaveJobSaga } from "./job.js";
import { takeEvery } from "redux-saga/effects";
import { uploadWorkersSaga, deleteWorkerSaga } from "./workers";
import { uploadImageSaga, uploadProfileSaga } from "./user";
import {
  getWorksTasksSaga,
  addTaskSaga,
  uploadSelectedTasksSaga,
  getTasksNumberSaga,
} from "./tasks";
import { sendReportSaga, uploadReportsSaga } from "./reports.js";
import * as actionTypes from "../actions/actionTypes";
export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITATE, authSaga);
  yield takeEvery(actionTypes.LOGIN_INITIATE, loginSaga);
 // yield takeEvery(actionTypes.GOOGLE_AUTH_INITIATE, googleAuth);
}
export function* watchWork() {
  yield takeEvery(actionTypes.CREATE_WORK_INITIATE, createWorkSaga);
  yield takeEvery(actionTypes.UPLOAD_WORKS_INITIATE, uploadWorksSaga);
  yield takeEvery(actionTypes.REMOVE_WORK_INITIATE, removeWorkSaga);
  yield takeEvery(actionTypes.UPLOAD_REPORTS_INITIATE, uploadImageSaga);
}
export function* watchJob() {
  yield takeEvery(actionTypes.GET_JOB_INITIATE, getJobSaga);
  yield takeEvery(actionTypes.LEAVE_JOB_INITIATE, leaveJobSaga);
}
export function* watchWorkers() {
  yield takeEvery(actionTypes.UPLOAD_WORKERS_INITIATE, uploadWorkersSaga);
  yield takeEvery(actionTypes.DELETE_WORKER_INITIATE, deleteWorkerSaga);
}
export function* watchTasks() {
  yield takeEvery(actionTypes.GET_WORKS_TASKS_INITIATE, getWorksTasksSaga);
  yield takeEvery(actionTypes.ADD_TASK_INITIATE, addTaskSaga);
  yield takeEvery(
    actionTypes.UPLOAD_SELECTED_TASKS_INITATE,
    uploadSelectedTasksSaga
  );
  yield takeEvery(actionTypes.GET_TASKS_NUMBER_INITIATE, getTasksNumberSaga);
}
export function* watchReports() {
  yield takeEvery(actionTypes.SEND_REPORT_INITIATE, sendReportSaga);
  yield takeEvery(actionTypes.UPLOAD_REPORTS_INITIATE, uploadReportsSaga);
}
export function* watchUser() {
  yield takeEvery(actionTypes.UPLOAD_IMAGE_INITIATE, uploadImageSaga);
  yield takeEvery(actionTypes.UPLOAD_PROFILE_INITIATE, uploadProfileSaga);
}
