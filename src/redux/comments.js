import * as ActionTypes from './ActionTypes';

export const Comments = (state = null, action) => {
    switch (action.type) {
        case ActionTypes._GET_COMMENTS:
            console.log("Fetched comments.");
            return action.payload;
        default:
            return state;
    }
};