import * as ActionTypes from './ActionTypes'

export const Orders = (
  state = {
    isLoading: true,
    errMess: null,
    content: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes._GET_ORDERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        content: action.payload
      }
    case ActionTypes._GET_ORDERS_LOADING:
      return { ...state, isLoading: true, errMess: null, content: [] }
    case ActionTypes._GET_ORDERS_FAILED:
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
