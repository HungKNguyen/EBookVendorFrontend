import * as ActionTypes from "./ActionTypes";

export const Reviews = (
  state = {
    isLoading: true,
    errMess: null,
    content: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes._GET_REVIEWS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        content: action.payload,
      };
    case ActionTypes._GET_REVIEWS_LOADING:
      return { ...state, isLoading: true, errMess: null, content: [] };
    case ActionTypes._GET_REVIEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        content: [],
      };
    default:
      return state;
  }
};
