import * as actionTypes from "./actionTypes";
export const uploadImageStart = () => {
  return { type: actionTypes.UPLOAD_IMAGE_START };
};
export const uploadImageFail = (error) => {
  return { type: actionTypes.UPLOAD_IMAGE_FAIL, error: error };
};
export const uploadImageSuccess = (avatar) => {
  return { type: actionTypes.UPLOAD_IMAGE_SUCCESS, url: avatar };
};
export const uploadImage = (userId, token, photo) => {
  console.log(photo);
  return {
    type: actionTypes.UPLOAD_IMAGE_INITIATE,
    userId: userId,
    token: token,
    photo: photo,
  };
};
export const uploadProfileStart = () => {
  return { type: actionTypes.UPLOAD_PROFILE_START };
};
export const uploadProfileFail = (error) => {
  return { type: actionTypes.UPLOAD_PROFILE_FAIL, error: error };
};
export const uploadProfileSuccess = (nickname, avatar) => {
  return {
    type: actionTypes.UPLOAD_PROFILE_SUCCESS,
    nickname: nickname,
    avatar: avatar,
  };
};
export const uploadProfile = (userId, token) => {
  return {
    type: actionTypes.UPLOAD_PROFILE_INITIATE,
    userId: userId,
    token: token,
  };
};
