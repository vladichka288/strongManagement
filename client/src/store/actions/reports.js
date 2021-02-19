import * as actionTypes from "./actionTypes";
export const sendArticleStart = () => {
  return { type: actionTypes.SEND_ARTICLE_START };
};
export const sendArticleFail = (error) => {
  return { type: actionTypes.SEND_ARTICLE_FAIL, error: error };
};
export const sendArticleSuccess = (taskId) => {
  return {
    type: actionTypes.SEND_ARTICLE_SUCCESS,
    taskId: taskId,
  };
};

export const sendArticle = (
  token,
  taskId,
  googleLink,
  name,
  description,
  ownerId
) => {
  return {
    type: actionTypes.SEND_REPORT_INITIATE,
    token: token,
    taskId: taskId,
    googleLink: googleLink,
    name: name,
    description: description,
    ownerId: ownerId,
  };
};
export const uploadReportsStart = () => {
  return { type: actionTypes.UPLOAD_ARTICLE_START };
};
export const uploadReportsFail = (error) => {
  return { type: actionTypes.UPLOAD_ARTICLE_FAIL, error: error };
};
export const uploadReportsSuccess = (reports) => {
  return {
    type: actionTypes.UPLOAD_ARTICLE_SUCCESS,
    reports: reports,
  };
};

export const uploadReports = (ownerId, token) => {
  return {
    type: actionTypes.UPLOAD_REPORTS_INITIATE,
    ownerId: ownerId,
    token: token,
  };
};
