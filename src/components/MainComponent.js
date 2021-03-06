import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './userpages/HomeComponent'
import { Login } from './otherpages/LoginComponent'
import { Signup } from './otherpages/SignupComponent'
import { AdminDashboard } from './adminpages/AdminComponent'
import { Notfound } from './otherpages/NotFoundComponent'
import { Forbidden } from './otherpages/ForbiddenComponent'
import { AdminProtectedRoute } from './ultilities/ProtectedRoutes'
import { EBook } from './userpages/EBookComponent'
import { Cart } from './userpages/CartPage'

export class Main extends Component {
  render () {
    return (
      <Switch location={this.props.location}>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        {/* dir userpages */}
        <Route path="/home" component={() => <Home />} />
        <Route path='/browse/:ebookId' component={({ match }) => <EBook ebookId={match.params.ebookId}/>}/>
        <Route path='/profile/cart' component={() => <Cart />}/>
        {/* dir adminpages */}
        <AdminProtectedRoute path="/admin" exact component={() => <AdminDashboard />} />
        {/* dir otherpages */}
        <Route path="/login" component={() => <Login />} />
        <Route path="/signup" component={() => <Signup />} />
        <Route path="/forbidden" component={() => <Forbidden />} />
        <Route path="*" component={() => <Notfound />} />
      </Switch>
    )
  }
}
