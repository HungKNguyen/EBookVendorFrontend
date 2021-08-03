import * as ActionTypes from './ActionTypes'
import { COMMENTS } from '../shared/comments'
import { USERS } from '../shared/users'
import { EBOOKS } from '../shared/ebooks'
import { ORDERS } from '../shared/orders'
import { REVIEWS } from '../shared/reviews'
import { SALES } from '../shared/sales'

const addComments = (comments) => ({
  type: ActionTypes._GET_COMMENTS,
  payload: comments
})

const commentsLoading = () => ({
  type: ActionTypes._GET_COMMENTS_LOADING
})

// const commentsFailed = (errmess) => ({
//   type: ActionTypes._GET_COMMENTS_FAILED,
//   payload: errmess
// })

export const fetchComments = () => (dispatch) => {
  dispatch(commentsLoading())
  dispatch(addComments(COMMENTS))
}

const addUsers = (users) => ({
  type: ActionTypes._GET_USERS,
  payload: users
})

const usersLoading = () => ({
  type: ActionTypes._GET_USERS_LOADING
})

// const usersFailed = (errmess) => ({
//   type: ActionTypes._GET_USERS_FAILED,
//   payload: errmess
// })

export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading())
  dispatch(addUsers(USERS))
}

const addEbooks = (ebooks) => ({
  type: ActionTypes._GET_BOOKS,
  payload: ebooks
})

const ebooksLoading = () => ({
  type: ActionTypes._GET_BOOKS_LOADING
})

// const ebooksFailed = (errmess) => ({
//   type: ActionTypes._GET_BOOKS_FAILED,
//   payload: errmess
// })

export const fetchEbooks = () => (dispatch) => {
  dispatch(ebooksLoading())
  dispatch(addEbooks(EBOOKS))
}

const addOrders = (orders) => ({
  type: ActionTypes._GET_ORDERS,
  payload: orders
})

const ordersLoading = () => ({
  type: ActionTypes._GET_ORDERS_LOADING
})

// const ordersFailed = (errmess) => ({
//   type: ActionTypes._GET_ORDERS_FAILED,
//   payload: errmess
// })

export const fetchOrders = () => (dispatch) => {
  dispatch(ordersLoading())
  dispatch(addOrders(ORDERS))
}

const addReviews = (reviews) => ({
  type: ActionTypes._GET_REVIEWS,
  payload: reviews
})

const reviewsLoading = () => ({
  type: ActionTypes._GET_REVIEWS_LOADING
})

// const reviewsFailed = (errmess) => ({
//   type: ActionTypes._GET_REVIEWS_FAILED,
//   payload: errmess
// })

export const fetchReviews = () => (dispatch) => {
  dispatch(reviewsLoading())
  dispatch(addReviews(REVIEWS))
}

const addSales = (sales) => ({
  type: ActionTypes._GET_SALES,
  payload: sales
})

const salesLoading = () => ({
  type: ActionTypes._GET_SALES_LOADING
})

// const saleFailed = (errmess) => ({
//   type: ActionTypes._GET_REVIEWS_FAILED,
//   payload: errmess
// })

export const fetchSales = () => (dispatch) => {
  dispatch(salesLoading())
  dispatch(addSales(SALES))
}
