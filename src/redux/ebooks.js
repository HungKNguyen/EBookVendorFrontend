import * as ActionTypes from './ActionTypes';

export const Ebooks = (state = null, action) => {
    switch (action.type) {
        case ActionTypes._GET_BOOKS:
            console.log("Fetched ebooks.");
            return action.payload;
        default:
            return state;
    }
};