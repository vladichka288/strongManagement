import { put } from "redux-saga/effects";
import * as actions from "../actions/user";
import axios from "axios";
require("dotenv").config();
const url = "https://strongmanagement.herokuapp.com";
const url2 = "http://localhost:8000";
export function* uploadImageSaga(action) {
  console.log(url);
  let userId = action.userId;
  let token = action.token;
  let image = action.photo;
  console.log(image);
  yield put(actions.uploadImageStart());
  try {
    const formData = new FormData();
    formData.append("file", image);
    let response = yield axios.post(`${url2}/upload`, formData);
    console.log(response);
    let photoUrl = response.data.url;
    let responseUsers = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/users.json?auth=${token}`
    );
    let allUsersObject = responseUsers.data;
    console.log(allUsersObject);
    let neededUserDatabaseId = [];
    Object.keys(allUsersObject).map((key) => {
      if (allUsersObject[key].userId == userId) {
        console.log("kakaka");
        neededUserDatabaseId.push({ ...allUsersObject[key], id: key });
      }
    });

    if (photoUrl != "error syka") {
      console.log(neededUserDatabaseId);
      neededUserDatabaseId[0].avatar = photoUrl;
      let updatedUser = yield axios.patch(
        `https://strongmanagment-default-rtdb.firebaseio.com/users/${neededUserDatabaseId[0].id}.json?auth=${token}`,
        neededUserDatabaseId[0]
      );
      console.log(photoUrl);
      yield put(actions.uploadImageSuccess(photoUrl));
    } else {
      throw "Error while uploading photo";
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    if (typeof err == "string") yield put(actions.uploadImageFail(err));
    else yield put(actions.uploadImageFail("Ooops, some problems exists"));
  }
}

export function* uploadProfileSaga(action) {
  let userId = action.userId;
  let token = action.token;

  yield put(actions.uploadProfileStart());
  try {
    let responseUsers = yield axios.get(
      `https://strongmanagment-default-rtdb.firebaseio.com/users.json?auth=${token}`
    );
    let allUsersObject = responseUsers.data;
    console.log(allUsersObject);
    let resultObject = {
      nickname: "",
      avatar: "",
    };
    Object.keys(allUsersObject).map((key) => {
      if (allUsersObject[key].userId == userId) {
        if (allUsersObject[key].avatar)
          resultObject.avatar = allUsersObject[key].avatar;
        resultObject.nickname = allUsersObject[key].nickname;
      }
    });
    yield put(
      actions.uploadProfileSuccess(resultObject.nickname, resultObject.avatar)
    );
  } catch (err) {
    console.log(err);
    if (typeof err == "string") yield put(actions.uploadProfileFail(err));
    else yield put(actions.uploadProfileFail("Ooops, some problems exists"));
  }
}
