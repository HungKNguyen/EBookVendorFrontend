import * as ActionTypes from './ActionTypes';
import { COMMENTS } from "../shared/comments";
import { USERS } from "../shared/users";
import { EBOOKS } from "../shared/ebooks";
import { ORDERS } from "../shared/orders";

export const fetchComments = () => ({
    type: ActionTypes._GET_COMMENTS,
    payload: COMMENTS
})

export const fetchUsers = () => ({
    type: ActionTypes._GET_USERS,
    payload: USERS
})

export const fetchEbooks = () => ({
    type: ActionTypes._GET_BOOKS,
    payload: EBOOKS
})

export const fetchOrders = () => ({
    type: ActionTypes._GET_ORDERS,
    payload: ORDERS
})