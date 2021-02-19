export { auth, login, logout,googleAuth } from "./auth.js";
export { createWork, uploadWorks, removeWork } from "./work.js";
export { getJob, leaveWork } from "./job.js";
export { uploadWorkers, deleteWorker } from "./workers.js";
export { sendArticle, uploadReports } from "./reports.js";
export { uploadImage, uploadProfile } from "./user.js";
export {
  getWorksTasks,
  addTask,
  uploadSelectedTasks,
  getTasksNumber,
} from "./tasks.js";
export {
  setRedirectPath,
  setRedirectWorkPath,
  setEmptyWorkers,
  autoSignUp,
} from "./actions";
