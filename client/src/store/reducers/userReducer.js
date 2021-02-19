import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: null,
  userId: null,
  error: null,
  redirect: null,
  loading: null,
  avatar: null,
  nickname: null,
  dataBaseId: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTO_SIGN_UP_SUCCES: {
      return { ...state, userId: action.userId, token: action.token };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        token: null,
        userId: null,
        error: null,
        redirect: "/login",
        loading: false,
      };
    }
    case actionTypes.AUTH_FAIL: {
      return {
        token: null,
        userId: null,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.AUTH_START: {
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
      };
    }
    case actionTypes.LOGIN_START: {
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
        redirect: null,
      };
      return;
    }
    case actionTypes.LOGIN_FAIL: {
      return {
        token: null,
        userId: null,
        error: action.error,
        loading: null,
        redirect: null,
      };
    }
    case actionTypes.LOGIN_SUCCESS: {
      return {
        token: action.token,
        userId: action.userId,
        error: null,
        redirect: "/about",
        loading: false,
      };
    }
    case actionTypes.SET_PATH: {
      if (action.path == "null") {
        return {
          ...state,
          redirect: null,
        };
      } else {
        return {
          ...state,
          redirect: action.path,
        };
      }
    }
    case actionTypes.LOGOUT: {
      return {
        token: null,
        userId: null,
        error: null,
        loading: null,
        redirect: null,
      };
    }
    case actionTypes.CREATE_WORK_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.CREATE_WORK_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case actionTypes.CREATE_WORK_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        redirect: "/myWorks",
      };
    }
    case actionTypes.UPLOAD_IMAGE_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case actionTypes.UPLOAD_IMAGE_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.UPLOAD_IMAGE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        avatar: action.url,
      };
    }
    case actionTypes.UPLOAD_PROFILE_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case actionTypes.UPLOAD_PROFILE_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.UPLOAD_PROFILE_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        avatar: action.avatar,
        nickname: action.nickname,
      };
    }
    case actionTypes.GOOGLE_AUTH_SUCCESS: {
      return {
        token: null,
        userId: null,
        error: null,
        redirect: "/about",
        loading: false,
      };
    }
    case actionTypes.GOOGLE_AUTH_FAIL: {
      return {
        token: null,
        userId: null,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.GOOGLE_AUTH_START: {
      return {
        token: null,
        userId: null,
        error: null,
        loading: true,
      };
    }

    default:
      return state;
  }
};
export default reducer;
