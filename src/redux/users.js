import * as ActionTypes from './ActionTypes';

export const Users = (state = null, action) => {
    switch (action.type) {
        case ActionTypes._GET_USERS:
            console.log("Fetched users.");
            return action.payload;
        default:
            return state;
    }
};