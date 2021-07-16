import * as ActionTypes from './ActionTypes';

export const Orders = (state = null, action) => {
    switch (action.type) {
        case ActionTypes._GET_ORDERS:
            console.log("Fetched orders.");
            return action.payload;
        default:
            return state;
    }
};