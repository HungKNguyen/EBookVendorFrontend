import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rememberMe: false
    }
  }

  handleUserInput (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  handleUserToggle () {
    const current = this.state.rememberMe
    this.setState({ rememberMe: !current })
  }

  handleUserSubmit () {
    console.log(this.state)
  }

  handleFBLogIn () {
    console.log('Send request for Face Book log in.')
  }

  handleGOOGLogIn () {
    console.log('Send request for Google log in.')
  }

  handleAAPLLogIn () {
    console.log('Send request for Apple log in.')
  }

  render () {
    return (
      <div>
        <Link to="/home">
          <Button
            variant="text"
            startIcon={<Home />}
            sx={{ ml: 3, mt: 1, color: '#272727' }}
          >
            Home
          </Button>
        </Link>
        <p className="title text-center text-black">Log In</p>
        <p className="subtitle text-center text-black">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <div className="container">
          <div className="row">
            <form className="col-12 col-md-6 border-end border-sm-right-none pe-5">
              <TextField
                name="email"
                label="Email"
                type="email"
                className="mb-3"
                value={this.state.email}
                variant="standard"
                fullWidth
                onChange={(event) => this.handleUserInput(event)}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                className="mb-3"
                value={this.state.password}
                variant="standard"
                fullWidth
                onChange={(event) => this.handleUserInput(event)}
              />
              <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      checked={this.state.rememberMe}
                      onChange={() => this.handleUserToggle()}
                    />
                  }
                  label="Remember Me"
                />
                <Typography variant="body1">
                  <Link to="#">Forgot Password or Email?</Link>
                </Typography>
              </Stack>
              <div className="m-0" onClick={() => this.handleUserSubmit()}>
                <MDBBtn outline rounded size="lg" className="col-4" href="#">
                  Log In
                </MDBBtn>
              </div>
            </form>
            <div className="col-12 col-md-6 my-5 text-center">
              <div className="m-0" onClick={() => this.handleFBLogIn()}>
                <MDBBtn
                  style={{ backgroundColor: '#3b5998' }}
                  href="#"
                  size="lg"
                  className="col-8"
                >
                  <MDBIcon className="me-2" fab icon="facebook-f" /> Continue
                  with Facebook
                </MDBBtn>
              </div>
              <div className="m-0" onClick={() => this.handleGOOGLogIn()}>
                <MDBBtn
                  style={{ backgroundColor: '#dd4b39' }}
                  href="#"
                  size="lg"
                  className="my-3 col-8"
                >
                  <MDBIcon className="me-2" fab icon="google" /> Continue with
                  Google
                </MDBBtn>
              </div>
              <div className="m-0" onClick={() => this.handleAAPLLogIn()}>
                <MDBBtn
                  style={{ backgroundColor: '#000000' }}
                  href="#"
                  size="lg"
                  className="col-8"
                >
                  <MDBIcon className="me-2" fab icon="apple" /> Continue with
                  Apple
                </MDBBtn>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3" />
      </div>
    )
  }
}

export default Login
