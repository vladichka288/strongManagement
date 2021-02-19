import * as actionTypes from "../actions/actionTypes";
const initialState = {
  reports: [],
  loading: false,
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_ARTICLE_FAIL: {
      return { ...state, loading: false, error: action.error };
    }
    case actionTypes.UPLOAD_ARTICLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        reports: action.reports
      };
    }
    case actionTypes.UPLOAD_ARTICLE_START: {
      return { ...state, loading: true, error: false };
    }

    default:
      return state;
  }
};
export default reducer;
