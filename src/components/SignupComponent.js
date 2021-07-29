import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
import {MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import {TextField, Checkbox, FormControlLabel, Box, FormHelperText, Button, Typography} from '@material-ui/core';
import {Home} from "@material-ui/icons";
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
            firstnameValid: true,
            lastnameValid: true,
            emailValid: true,
            passwordValid: true,
            passwordRetypeValid: true,
            agreeValid: true
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
        this.setState({firstnameValid: this.validate('firstname'),
            lastnameValid: this.validate('lastname'),
            emailValid: this.validate('email'),
            passwordValid: this.validate('password'),
            passwordRetypeValid: this.validate('passwordRetype'),
            agreeValid: this.validate('agree')}, function() {
            if (this.state.firstnameValid &&
                this.state.lastnameValid &&
                this.state.emailValid &&
                this.state.passwordValid &&
                this.state.passwordRetypeValid &&
                this.state.agreeValid) {
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
        switch(name) {
            case 'firstname':
                return this.state.firstname !== ''
            case 'lastname':
                return this.state.lastname !== ''
            case 'email':
                return this.state.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)
            case 'password':
                return this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            case 'passwordRetype':
                return this.state.password === this.state.passwordRetype
            case 'agree':
                return this.state.agree
        }
    }
    render() {
        return (
            <div>
                <Link to='/home'>
                    <Button variant='text' startIcon={<Home />} sx={{ml:3, mt:1, color: '#272727'}}>Home</Button>
                </Link>
                <p className='title text-center text-black'>Sign Up</p>
                <p className='subtitle text-center text-black'>Already have an account? <Link to='/login'>Log In</Link></p>
                <div className='container'>
                    <div className='row'>
                        <Box component='form' className='col-12 col-md-6 border-end border-sm-right-none pe-5' noValidate>
                            <Row className='mb-3'>
                                <div className='col-6'>
                                    <TextField name='firstname' label='Firstname' type='text' inputProps={{ "role": "firstname" }} value={this.state.firstname} variant='standard'
                                               fullWidth onChange={(event) => this.handleUserInput(event)}
                                                error={!this.state.firstnameValid} helperText={this.state.firstnameValid ? '' : 'Firstname must not be empty'}/>
                                </div>
                                <div className='col-6'>
                                    <TextField label='Lastname' name='lastname' type='text' inputProps={{ "role": "lastname" }} value={this.state.lastname} variant='standard'
                                               fullWidth onChange={(event) => this.handleUserInput(event)}
                                               error={!this.state.lastnameValid} helperText={this.state.lastnameValid ? '' : 'Lastname must not be empty'}/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-12'>
                                    <TextField label='Email' name='email' type='email' inputProps={{ "role": "email" }} value={this.state.email} variant='standard'
                                               fullWidth onChange={(event) => this.handleUserInput(event)}
                                               error={!this.state.emailValid} helperText={this.state.emailValid ? '' : 'Please provide a valid email'}/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-12'>
                                    <TextField label='Password' name='password' type='password' inputProps={{ "role": "password" }} value={this.state.password} variant='standard'
                                               fullWidth onChange={(event) => this.handleUserInput(event)}
                                               error={!this.state.passwordValid} helperText={this.state.passwordValid ? '' : 'Password must include a number, a capital letter, and at least 8 characters'}/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <div className='col-12'>
                                    <TextField label='Type your password again' name='passwordRetype' type='password' inputProps={{ "role": "passwordRetype" }} value={this.state.passwordRetype} variant='standard'
                                               fullWidth onChange={(event) => this.handleUserInput(event)}
                                               error={!this.state.passwordRetypeValid} helperText={this.state.passwordRetypeValid ? '' : 'Retype password must match'}/>
                                </div>
                            </Row>
                            <Row className='mb-3'>
                                <FormControlLabel control={<Checkbox name='agree' checked={this.state.agree} inputProps={{ "role": "agree" }} onChange={() => this.handleUserToggle()} />}
                                                  label={<Typography variant='body1'>By signing up, you agree to our <a href='#'>Terms of Use</a> and <a href='#'>Privacy Policy</a>.</Typography>}/>
                                <FormHelperText hidden={this.state.agreeValid} error={!this.state.agreeValid}>You must agree to our agreement</FormHelperText>
                            </Row>
                            <div className='m-0' onClick={() => this.handleUserSubmit()}>
                                <MDBBtn outline rounded size='lg' className='col-4' href='#' role='submitButton'>Sign Up</MDBBtn>
                            </div>
                        </Box>
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