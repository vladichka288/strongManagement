import * as actionTypes from "../actions/actionTypes";
const initialState = {
  tasks: [],
  loading: false,
  error: null,
  countTasks: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.ADD_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.ADD_TASK_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }

    //
    //
    //
    case actionTypes.GET_TASKS_NUMBER_START: {
      return {
        ...state,
        error: false,
        loading: true,
      };
    }
    case actionTypes.GET_TASKS_NUMBER_FAIL: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.GET_TASKS_NUMBER_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        countTasks: action.countTasks,
      };
    }

    case actionTypes.UPLOAD_SELECTED_TASKS_START: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.UPLOAD_SELECTED_TASKS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.UPLOAD_SELECTED_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
      };
    }
    case actionTypes.SEND_ARTICLE_FAIL: {
      return { ...state, loading: false, error: action.error };
    }
    case actionTypes.SEND_ARTICLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
      };
    }
    case actionTypes.SEND_ARTICLE_START: {
      return { ...state, loading: true, error: false };
    }

    default:
      return state;
  }
};
export default reducer;
