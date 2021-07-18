import * as ActionTypes from './ActionTypes';

export const Users = (state = {
    isLoading: true,
    errMess: null,
    content: []
}, action) => {
    switch (action.type) {
        case ActionTypes._GET_USERS:
            return {...state, isLoading: false, errMess: null, content: action.payload};
        case ActionTypes._GET_USERS_LOADING:
            return {...state, isLoading: true, errMess: null, content: []}
        case ActionTypes._GET_USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, content: []}
        default:
            return state;
    }
};