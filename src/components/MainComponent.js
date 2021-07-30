import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchComments, fetchEbooks, fetchReviews } from "../redux/ActionCreators";
import {Switch, Route, Redirect} from "react-router-dom";
import {HomePage} from './userpages/HomeComponent';
import Login from './otherpages/LoginComponent';
import Signup from './otherpages/SignupComponent';
import {AdminDashboardPage} from './adminpages/AdminComponent';

const mapDispatchToProps = (dispatch) => ({
    fetchComments: () => {dispatch(fetchComments())},
    fetchEbooks: () => {dispatch(fetchEbooks())},
    fetchReviews: () => {dispatch(fetchReviews())}
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
                    {/* dir otherpages */}
                    <Route path='/login' component={() => <Login />} />
                    <Route path='/signup' component={() => <Signup />} />
                    {/* dir userpages */}
                    <Route path='/home' component={() => <HomePage/>} />
                    {/* dir adminpages */}
                    <Route path='/admin' exact component={() => <AdminDashboardPage/>}/>
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(Main);