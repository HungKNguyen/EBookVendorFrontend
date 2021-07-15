import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row } from 'reactstrap';
import {
    MDBInput,
    MDBBtn,
    MDBCheckbox,
    MDBIcon
} from 'mdb-react-ui-kit'
class Signup extends Component {
    render() {
        return (
            <div>
                <div className='mt-3'/>
                <p className='title text-center text-black'>Sign Up</p>
                <p className='subtitle text-center text-black'>Already have an account? <Link to='/login'>Log In</Link></p>
                <div className='container'>
                    <div className='row'>
                        <Form className='col-12 col-md-6 border-end pe-5'>
                            <Row className='mb-3'>
                                <div className='col-6'>
                                    <MDBInput label='Firstname' id='firstname' type='text' size='lg'/>

                                </div>
                                <div className='col-6'>
                                    <MDBInput label='Lastname' id='lastname' type='text' size='lg'/>
                                </div>
                            </Row>
                            <MDBInput label='Email' id='email' type='email' size='lg' className='mb-3'/>
                            <MDBInput label='Password' id='password' type='password' size='lg' className='mb-3'/>
                            <MDBInput label='Type your password again' id='passwordRetype' type='password' size='lg' className='mb-3'/>
                            <Row className='mb-3'>
                                <div className='col-1'>
                                    <MDBCheckbox name='Agree' value='' id='agree' label='' className='col-5'/>
                                </div>
                                <div className='col-11'>
                                    <p>By signing up, you agree to our <a href='#'>Terms of Use</a> and <a href='#'>Privacy Policy</a>.</p>
                                </div>
                            </Row>
                            <MDBBtn outline rounded size='lg' className='col-4' type='submit'>Sign Up</MDBBtn>
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

export default Signup