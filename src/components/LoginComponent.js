import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row } from 'reactstrap';
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit'
class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rememberMe: false
        }
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    handleUserToggle() {
        let current = this.state.rememberMe;
        this.setState({rememberMe : !current})
    }
    handleUserSubmit() {
        console.log(this.state)
    }
    handleFBLogIn() {
        console.log('Send request for Face Book log in.')
    }
    handleGOOGLogIn() {
        console.log('Send request for Google log in.')
    }
    handleAAPLLogIn() {
        console.log('Send request for Apple log in.')
    }
    render() {
        return (
            <div>
                <div className='mt-3'/>
                <p className='title text-center text-black'>Log In</p>
                <p className='subtitle text-center text-black'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                <div className='container'>
                    <div className='row'>
                        <form className='col-12 col-md-6 border-end pe-5'>
                            <MDBInput label='Email' name='email' type='email' size='lg' className='mb-3' value={this.state.email}
                                      onChange={(event) => this.handleUserInput(event)}/>
                            <MDBInput label='Password' name='password' type='password' size='lg' className='mb-3' value={this.state.password}
                                      onChange={(event) => this.handleUserInput(event)}/>
                            <Row className='mb-3'>
                                <div className='col-5'>
                                    <MDBCheckbox name='rememberMe' value={this.state.rememberMe} id='rememberMe' label='Remember Me' className='col-5'
                                                 onChange={() => this.handleUserToggle()}/>
                                </div>
                                <div className='col-7'>
                                    <Link className='text-body' to='#'>Forgot Password or Email?</Link>
                                </div>
                            </Row>
                            <div className='m-0' onClick={() => this.handleUserSubmit()}>
                                <MDBBtn outline rounded size='lg' className='col-4' href='#'>Log In</MDBBtn>
                            </div>
                        </form>
                        <div className='col-12 col-md-6 my-5 text-center'>
                            <div className='m-0' onClick={() => this.handleFBLogIn()}>
                                <MDBBtn style={{ backgroundColor: '#3b5998'  }} href='#' size='lg' className='col-8'>
                                    <MDBIcon className='me-2' fab icon='facebook-f' /> Continue with Facebook
                                </MDBBtn>
                            </div>
                            <div className='m-0' onClick={() => this.handleGOOGLogIn()}>
                                <MDBBtn style={{ backgroundColor: '#dd4b39' }} href='#' size='lg' className='my-3 col-8'>
                                    <MDBIcon className='me-2' fab icon='google' /> Continue with Google
                                </MDBBtn>
                            </div>
                            <div className='m-0' onClick={() => this.handleAAPLLogIn()}>
                                <MDBBtn style={{ backgroundColor: '#000000' }} href='#' size='lg' className='col-8'>
                                    <MDBIcon className='me-2' fab icon='apple' /> Continue with Apple
                                </MDBBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-3'/>

            </div>
        )
    }
}

export default Login