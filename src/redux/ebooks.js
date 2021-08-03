import * as ActionTypes from './ActionTypes'

export const Ebooks = (
  state = {
    isLoading: true,
    errMess: null,
    content: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes._GET_BOOKS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        content: action.payload
      }
    case ActionTypes._GET_BOOKS_LOADING:
      return { ...state, isLoading: true, errMess: null, content: [] }
    case ActionTypes._GET_BOOKS_FAILED:
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
