import { put } from "redux-saga/effects";
import * as actions from "../actions/auth";
import axios from "axios";
var config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
};

export function* authSaga(action) {
  let nickname = action.nickname;
  let password = action.password;
  let repeatPassword = action.repeatPassword;
  let login = action.login;

  yield put(actions.authStart());
  if (nickname.length < 4 || nickname.length > 25) {
    yield put(
      actions.authFail("Ooops, nickname has to be between 4 and 25 characters!")
    );
  } else if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      login
    ) == false
  ) {
    yield put(actions.authFail("Ooops, it seems that email isn't correct!"));
  } else if (password.length < 6 || password.length > 20) {
    yield put(
      actions.authFail("Ooops, password has to be between 6 and 20 characters!")
    );
  } else if (repeatPassword !== password) {
    yield put(actions.authFail("Ooops, passwords do not match!"));
  } else {
    const authData = {
      email: login,
      password: password,
      returnSecureToken: true,
    };
    try {
      let response = yield axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByJGBJ1ZfClAOLx6PR3391TK2f7bZM6bs",
        authData
      );
      yield put(
        actions.authSuccess(
          response.data.idToken,
          response.data.localId,
          nickname
        )
      );
      let responseUser = yield axios.post(
        `https://strongmanagment-default-rtdb.firebaseio.com/users.json?auth=${response.data.idToken}`,
        {
          nickname: nickname,
          userId: response.data.localId,
          rating: "0/0",
          tasks: [],
        }
      );
    } catch (err) {
      if (typeof err == "string") yield put(actions.authFail(err));
      else
        yield put(
          actions.authFail("Ooops user with this email already exists")
        );
    }
  }
}
export function* loginSaga(action) {
  let login = action.login;
  let password = action.password;
  yield put(actions.loginStart());
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      login
    ) == false
  ) {
    yield put(actions.loginFail("Ooops, it seems that email isn't correct!"));
  } else if (password.length < 6 || password.length > 20) {
    yield put(
      actions.loginFail(
        "Ooops, password has to be between 6 and 20 characters!"
      )
    );
  } else {
    const authData = {
      email: login,
      password: password,
      returnSecureToken: true,
    };
    try {
      let response = yield axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByJGBJ1ZfClAOLx6PR3391TK2f7bZM6bs",
        authData
      );
      yield (document.cookie = `userManagement=${response.data.localId};max-age=3600`);
      yield (document.cookie = `tokenManagement=${response.data.idToken};max-age=3600`);
      yield put(
        actions.loginSuccess(response.data.idToken, response.data.localId)
      );
    } catch (err) {
      if (typeof err == "string") yield put(actions.loginFail(err));
      else
        yield put(actions.loginFail("Ooops, login or password is incorrect"));
    }
  }
}
/*export function* googleAuth(action) {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      let credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      console.log(result);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error);
    });
    ///LOGOUT GOOGLE
}
*/