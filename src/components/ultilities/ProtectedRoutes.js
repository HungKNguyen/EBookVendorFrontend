import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { toast } from 'react-toastify'

export const UserProtectedRoute = ({ component: Component, ...rest }) => {
  return (
        <Route {...rest} render={
            props => {
              if (localStorage.getItem('user')) {
                return <Component {...rest} {...props}/>
              } else {
                toast.error('You need to be logged in to continue')
                return <Redirect to='/login' />
              }
            }
        } />
  )
}

export const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  return (
        <Route {...rest} render={
            props => {
              const user = JSON.parse(localStorage.getItem('user'))
              if (user) {
                if (user.admin) {
                  return <Component {...rest} {...props}/>
                } else {
                  return <Redirect to='/forbidden' />
                }
              } else {
                toast.error('You need to be logged in with an admin account to continue')
                return <Redirect to='/login' />
              }
            }
        } />
  )
}
