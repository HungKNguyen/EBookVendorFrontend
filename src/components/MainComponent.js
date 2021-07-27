import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchComments, fetchEbooks, fetchReviews } from "../redux/ActionCreators";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from './HomeComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import AdminComponent from './AdminComponent';

const mapStateToProps = state => {
    return {
        comments: state.comments,
        ebooks: state.ebooks,
        reviews: state.reviews
    }
}

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
                    <Route path='/home' component={() => <Home ebooks={this.props.ebooks}
                    comments={this.props.comments} reviews={this.props.reviews}/>} />
                    <Route path='/login' component={() => <Login />} />
                    <Route path='/signup' component={() => <Signup />} />
                    <Route path='/admin' component={() => <AdminComponent ebooks={this.props.ebooks}/>}
                    />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);