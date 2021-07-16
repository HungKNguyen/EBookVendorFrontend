import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchComments, fetchEbooks, fetchOrders, fetchUsers } from "../redux/ActionCreators";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from './HomeComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';

const mapStateToProps = state => {
    return {
        users: state.users,
        comments: state.comments,
        ebooks: state.ebooks,
        orders: state.orders
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => {dispatch(fetchUsers())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchEbooks: () => {dispatch(fetchEbooks())},
    fetchOrders: () => {dispatch(fetchOrders())},
})

class Main extends Component {

    componentDidMount() {
        this.props.fetchEbooks();
        this.props.fetchComments();
    }

    render() {
        return (
            <div>
                <Switch location={this.props.location}>
                    {/* To be developed later */}
                    <Route path='/home' component={() => <Home ebooks={this.props.ebooks}
                    comments={this.props.comments}/>} />
                    {/* Hung 16/7 */}
                    <Route path='/login' component={() => <Login />} />
                    <Route path='/signup' component={() => <Signup />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);