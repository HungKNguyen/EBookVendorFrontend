import * as ActionTypes from './ActionTypes'

export const Sales = (
  state = {
    isLoading: true,
    errMess: null,
    content: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes._GET_SALES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        content: action.payload
      }
    case ActionTypes._GET_SALES_LOADING:
      return { ...state, isLoading: true, errMess: null, content: [] }
    case ActionTypes._GET_SALES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        content: []
      }
    default:
      return state
  }
}
