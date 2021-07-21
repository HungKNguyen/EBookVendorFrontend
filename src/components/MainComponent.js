import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchComments, fetchEbooks, fetchOrders, fetchUsers, fetchReviews, fetchSales } from "../redux/ActionCreators";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from './HomeComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import AdminDashboard from './AdminDasboard/AdminDashboard';

const mapStateToProps = state => {
    return {
        users: state.users,
        comments: state.comments,
        ebooks: state.ebooks,
        orders: state.orders,
        reviews: state.reviews,
        sales: state.sales,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchEbooks: () => {dispatch(fetchEbooks())},
    fetchOrders: () => {dispatch(fetchOrders())},
    fetchReviews: () => {dispatch(fetchReviews())},
    fetchSales: () => {dispatch(fetchSales())}
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchEbooks();
        this.props.fetchComments();
        this.props.fetchReviews();
    }

    render() {
        return (
            <div>
                <Switch location={this.props.location}>
                    <Route path='/home' component={() => <Home ebooks={this.props.ebooks}
                    comments={this.props.comments} reviews={this.props.reviews}/>} />
                    <Route path='/login' component={() => <Login />} />
                    <Route path='/signup' component={() => <Signup />} />
                    <Route path='/admin' component={() => <AdminDashboard/>} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);