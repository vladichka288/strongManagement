import * as actionTypes from "../actions/actionTypes";
const initialState = {
  works: [],
  loading: false,
  error: false,
  redirectWork: null,
  worksTask: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_WORKS_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.UPLOAD_WORKS_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.UPLOAD_WORKS_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        works: action.works,
      };
    }
    case actionTypes.REMOVE_WORK_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.REMOVE_WORK_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.REMOVE_WORK_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        works: action.works,
        redirectWork: "/myWorks",
      };
    }
    case actionTypes.GET_JOB_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.GET_JOB_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.GET_JOB_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        redirectWork: "/about",
      };
    }
    case actionTypes.SET_REDIRECT_WORK_PATH: {
      if (action.path == "null") {
        return {
          ...state,
          redirectWork: null,
        };
      } else {
        return {
          ...state,
          redirectWork: action.path,
        };
      }
    }
    //
    //
    //
    case actionTypes.GET_WORKS_TASKS_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.GET_WORKS_TASKS_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.GET_WORKS_TASKS_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        worksTask: action.worksTask,
      };
    }
    //
    //
    //
    case actionTypes.LEAVE_WORK_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.LEAVE_WORK_START: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }
    case actionTypes.LEAVE_WORK_SUCCESS: {
     
      return {
        ...state,
        error: false,
        loading: false,
        worksTask:action.newTasks,
      };
    }
    default:
      return state;
  }
};
export default reducer;
