import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row } from 'reactstrap';
import {
    MDBInput,
    MDBBtn,
    MDBCheckbox,
    MDBIcon,
    MDBValidation
} from 'mdb-react-ui-kit'
class Signup extends Component {
    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordRetype: '',
            agree: false,
            firstnameClass: '',
            lastnameClass: '',
            emailClass: '',
            passwordClass: '',
            passwordRetypeClass: '',
            agreeClass: ''
        }
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    }
    handleUserToggle() {
        let current = this.state.agree;
        this.setState({agree : !current})
    }
    handleUserSubmit() {
        this.setState({firstnameClass: this.validate('firstname'),
            lastnameClass: this.validate('lastname'),
            emailClass: this.validate('email'),
            passwordClass: this.validate('password'),
            passwordRetypeClass: this.validate('passwordRetype'),
            agreeClass: this.validate('agree')}, function() {
            if (this.state.firstnameClass === 'is-valid' &&
                this.state.lastnameClass === 'is-valid' &&
                this.state.emailClass === 'is-valid' &&
                this.state.passwordClass === 'is-valid' &&
                this.state.passwordRetypeClass === 'is-valid' &&
                this.state.agreeClass === 'is-valid') {
                console.log(this.state);
            }
        });
    }
    handleFBSignUp() {
        console.log('Send request for Face Book sign up.')
    }
    handleGOOGSignUp() {
        console.log('Send request for Google sign up.')
    }
    handleAAPLSignUp() {
        console.log('Send request for Apple sign up.')
    }
    validate(name) {
        let className
        switch(name) {
            case 'firstname':
                className = this.state.firstname !== '' ? 'is-valid' : 'is-invalid'
                break;
            case 'lastname':
                className = this.state.lastname !== '' ? 'is-valid' : 'is-invalid'
                break;
            case 'email':
                className = this.state.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ? 'is-valid' : 'is-invalid'
                break;
            case 'password':
                className = this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) ? 'is-valid' : 'is-invalid'
                break;
            case 'passwordRetype':
                className = this.state.password === this.state.passwordRetype ? 'is-valid' : 'is-invalid'
                break;
            case 'agree':
                className = this.state.agree ? 'is-valid' : 'is-invalid'
                break;
        }
        return className;
    }
    render() {
        return (
            <div>
                <div className='mt-3'/>
                <p className='title text-center text-black'>Sign Up</p>
                <p className='subtitle text-center text-black'>Already have an account? <Link to='/login'>Log In</Link></p>
                <div className='container'>
                    <div className='row'>
                        <MDBValidation className='col-12 col-md-6 border-end pe-5' noValidate>
                            <Row className='mb-3'>
                                <div className='col-6'>
                                    <MDBInput label='Firstname' name='firstname' type='text' size='lg'
                                              value={this.state.firstname} onChange={(event) => this.handleUserInput(event)}
                                              validation='Firstname must not be empty' invalid
                                              className={this.state.firstnameClass}/>
                                </div>
                                <div className='col-6'>
                                    <MDBInput label='Lastname' name='lastname' type='text' size='lg'
                                              value={this.state.lastname} onChange={(event) => this.handleUserInput(event)}
                                              validation='Lastname must not be empty' invalid
                                              className={this.state.lastnameClass}/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-12'>
                                    <MDBInput label='Email' name='email' type='email' size='lg'
                                              className={this.state.emailClass}
                                              value={this.state.email} onChange={(event) => this.handleUserInput(event)}
                                              validation='Please provide a valid email' invalid/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-12'>
                                    <MDBInput label='Password' name='password' type='password' size='lg'
                                              className={this.state.passwordClass}
                                              value={this.state.password} onChange={(event) => this.handleUserInput(event)}
                                              validation='Password must include a number, a capital letter, and at least 8 characters' invalid/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-12'>
                                    <MDBInput label='Type your password again' name='passwordRetype' type='password' size='lg'
                                              className={this.state.passwordRetypeClass}
                                              value={this.state.passwordRetype} onChange={(event) => this.handleUserInput(event)}
                                              validation='Retype password must match' invalid/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-1'>
                                    <MDBCheckbox name='agree' value='' label=''
                                                 className={'mb-3 ' + this.state.agreeClass}
                                                 onChange={() => this.handleUserToggle()}
                                                 validation='You must agree to our agreement' invalid/>
                                </div>
                                <div className='col-11'>
                                    <p>By signing up, you agree to our <a href='#'>Terms of Use</a> and <a href='#'>Privacy Policy</a>.</p>
                                </div>
                            </Row>
                            <div className='m-0' onClick={() => this.handleUserSubmit()}>
                                <MDBBtn outline rounded size='lg' className='col-4' href='#'>Sign Up</MDBBtn>
                            </div>
                        </MDBValidation>
                        <div className='col-12 col-md-6 my-5 text-center'>
                            <div className='m-0' onClick={() => this.handleFBSignUp()}>
                                <MDBBtn style={{ backgroundColor: '#3b5998'  }} href='#' size='lg' className='col-8'>
                                    <MDBIcon className='me-2' fab icon='facebook-f' /> Continue with Facebook
                                </MDBBtn>
                            </div>
                            <div className='m-0' onClick={() => this.handleGOOGSignUp()}>
                                <MDBBtn style={{ backgroundColor: '#dd4b39' }} href='#' size='lg' className='my-3 col-8'>
                                    <MDBIcon className='me-2' fab icon='google' /> Continue with Google
                                </MDBBtn>
                            </div>
                            <div className='m-0' onClick={() => this.handleAAPLSignUp()}>
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

export default Signup