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
    render() {
        return (
            <div>
                <div className='mt-3'/>
                <p className='title text-center text-black'>Log In</p>
                <p className='subtitle text-center text-black'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                <div className='container'>
                    <div className='row'>
                        <Form className='col-12 col-md-6 border-end pe-5'>
                            <MDBInput label='Email' id='email' type='email' size='lg' className='mb-3'/>
                            <MDBInput label='Password' id='password' type='password' size='lg' className='mb-3'/>
                            <Row className='mb-3'>
                                <div className='col-5'>
                                    <MDBCheckbox name='rememberMe' value='' id='rememberMe' label='Remember Me' className='col-5'/>
                                </div>
                                <div className='col-7'>
                                    <Link className='text-body' to='/home'>Forgot Password or Email?</Link>
                                </div>
                            </Row>
                            <MDBBtn outline rounded size='lg' className='col-4' type='submit'>Log In</MDBBtn>
                        </Form>
                        <div className='col-12 col-md-6 my-5 text-center'>
                            <MDBBtn style={{ backgroundColor: '#3b5998'  }} href='#' size='lg' className='col-8'>
                                <MDBIcon className='me-2' fab icon='facebook-f' /> Continue with Facebook
                            </MDBBtn>
                            <MDBBtn style={{ backgroundColor: '#dd4b39' }} href='#' size='lg' className='my-3 col-8'>
                                <MDBIcon className='me-2' fab icon='google' /> Continue with Google
                            </MDBBtn>
                            <MDBBtn style={{ backgroundColor: '#000000' }} href='#' size='lg' className='col-8'>
                                <MDBIcon className='me-2' fab icon='apple' /> Continue with Apple
                            </MDBBtn>
                        </div>
                    </div>
                </div>
                <div className='mt-3'/>

            </div>
        )
    }
}

export default Login