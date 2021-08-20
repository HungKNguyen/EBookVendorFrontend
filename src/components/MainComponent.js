import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HomePage } from './userpages/HomeComponent'
import Login from './otherpages/LoginComponent'
import Signup from './otherpages/SignupComponent'
import { AdminDashboardPage } from './adminpages/AdminComponent'
import { ProductsPage } from './adminpages/ProductsComponent'
import { OrdersPage } from './adminpages/OrdersComponent'

class Main extends Component {
  render () {
    return (
      <div>
        <Switch location={this.props.location}>
          {/* dir otherpages */}
          <Route path="/login" component={() => <Login />} />
          <Route path="/signup" component={() => <Signup />} />
          {/* dir userpages */}
          <Route path="/home" component={() => <HomePage />} />
          {/* dir adminpages */}
          <Route path="/admin" exact component={() => <AdminDashboardPage />} />
          <Route path="/products" exact component={() => <ProductsPage />} />
          <Route path="/orders" exact component={() => <OrdersPage/>} />
          <Redirect to="/home" />
        </Switch>
      </div>
    )
  }
}

export default Main
