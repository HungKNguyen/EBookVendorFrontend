import React, { Component } from 'react'
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  FormHelperText,
  Button,
  Typography,
  Link,
  Grid, Stack, useMediaQuery
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import { instance } from '../../axiosConfig'
import { history } from '../../App'
import { FacebookLoginBtn } from '../ultilities/FacebookLoginBtn'
import { GoogleLoginBtn } from '../ultilities/GoogleLoginBtn'
import { useTheme } from '@material-ui/core/styles'

export const SignupDisplay = (props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  return (
      <Box my={3}>
        <Button
            variant="text"
            startIcon={<Home />}
            sx={{ ml: 3, color: '#272727' }}
            component={Link}
            href='/home'
        >
          Home
        </Button>
        <Typography variant='h2' fontWeight='fontWeightBold' align='center'>Sign Up</Typography>
        <Typography variant='h6' fontWeight='fontWeightRegular' align='center'>
          Already have an account? <Link href="/login" underline='none'>Log In</Link>
        </Typography>
        <Grid container mx={'auto'} my={3} paddingX={matches ? 3 : 5}>
          <Grid item xs={12} md={6} paddingX={matches ? 0 : 10} paddingBottom={matches ? 3 : 0}
                sx={{ borderRight: (matches ? 0 : 1), borderBottom: (matches ? 1 : 0) }}>
            <Stack spacing={2} marginBottom={2}>
              <Grid container columnSpacing={3}>
                <Grid item xs={6}>
                  <TextField
                      name="firstname"
                      label="Firstname"
                      type="text"
                      inputProps={{ role: 'firstname' }}
                      value={props.formControl.firstname}
                      variant="standard"
                      fullWidth
                      onChange={(event) => props.handleUserInput(event)}
                      error={!props.formControl.firstnameValid}
                      helperText={
                        props.formControl.firstnameValid
                          ? ''
                          : 'Firstname must not be empty'
                      }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Lastname"
                      name="lastname"
                      type="text"
                      inputProps={{ role: 'lastname' }}
                      value={props.formControl.lastname}
                      variant="standard"
                      fullWidth
                      onChange={(event) => props.handleUserInput(event)}
                      error={!props.formControl.lastnameValid}
                      helperText={
                        props.formControl.lastnameValid
                          ? ''
                          : 'Lastname must not be empty'
                      }
                  />
                </Grid>
              </Grid>
              <TextField
                  label="Email"
                  name="email"
                  type="email"
                  inputProps={{ role: 'email' }}
                  value={props.formControl.email}
                  variant="standard"
                  fullWidth
                  onChange={(event) => props.handleUserInput(event)}
                  error={!props.formControl.emailValid}
                  helperText={
                    props.formControl.emailValid
                      ? ''
                      : 'Please provide a valid email'
                  }
              />
              <TextField
                  label="Password"
                  name="password"
                  type="password"
                  inputProps={{ role: 'password' }}
                  value={props.formControl.password}
                  variant="standard"
                  fullWidth
                  onChange={(event) => props.handleUserInput(event)}
                  error={!props.formControl.passwordValid}
                  helperText={
                    props.formControl.passwordValid
                      ? ''
                      : 'Password must include a number, a capital letter, and at least 8 characters'
                  }
              />
              <TextField
                  label="Type your password again"
                  name="passwordRetype"
                  type="password"
                  inputProps={{ role: 'passwordRetype' }}
                  value={props.formControl.passwordRetype}
                  variant="standard"
                  fullWidth
                  onChange={(event) => props.handleUserInput(event)}
                  error={!props.formControl.passwordRetypeValid}
                  helperText={
                    props.formControl.passwordRetypeValid
                      ? ''
                      : 'Retype password must match'
                  }
              />
              <FormControlLabel
                  control={
                    <Checkbox
                        name="agree"
                        checked={props.formControl.agree}
                        inputProps={{ role: 'agree' }}
                        onChange={props.handleUserToggle}
                    />
                  }
                  label={
                    <Typography variant="body1">
                      By signing up, you agree to our{' '}
                      <Link href="#" underline='none'>Terms of Use</Link> and{' '}
                      <Link href="#" underline='none'>Privacy Policy</Link>.
                    </Typography>
                  }
              />
              <FormHelperText
                  hidden={props.formControl.agreeValid}
                  error={!props.formControl.agreeValid}
              >
                You must agree to our agreement
              </FormHelperText>
            </Stack>
            <Button
                onClick={props.handleUserSubmit}
                variant='outlined'
                size='large'
                inputProps={{ role: 'submitButton' }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} md={6} paddingX={matches ? 0 : 10} paddingTop={matches ? 3 : 0} my={'auto'}>
            <Stack spacing={2}>
              <FacebookLoginBtn/>
              <GoogleLoginBtn/>
            </Stack>
          </Grid>
        </Grid>
      </Box>
  )
}

export class Signup extends Component {
  constructor (props) {
    super(props)
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
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleUserToggle = this.handleUserToggle.bind(this)
    this.handleUserSubmit = this.handleUserSubmit.bind(this)
  }

  handleUserInput (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  handleUserToggle () {
    const current = this.state.agree
    this.setState({ agree: !current })
  }

  handleUserSubmit () {
    this.setState(
      {
        firstnameValid: this.validate('firstname'),
        lastnameValid: this.validate('lastname'),
        emailValid: this.validate('email'),
        passwordValid: this.validate('password'),
        passwordRetypeValid: this.validate('passwordRetype'),
        agreeValid: this.validate('agree')
      },
      async function () {
        if (
          this.state.firstnameValid &&
          this.state.lastnameValid &&
          this.state.emailValid &&
          this.state.passwordValid &&
          this.state.passwordRetypeValid &&
          this.state.agreeValid
        ) {
          try {
            const response = await instance.post('/api/signup', {
              email: this.state.email,
              password: this.state.password,
              firstname: this.state.firstname,
              lastname: this.state.lastname
            })
            localStorage.setItem('user', JSON.stringify(response.data))
            history.push('/home')
          } catch (error) {
            console.log(error)
          }
        }
      }
    )
  }

  validate (name) {
    switch (name) {
      case 'firstname':
        return this.state.firstname !== ''
      case 'lastname':
        return this.state.lastname !== ''
      case 'email':
        return this.state.email.match(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        )
      case 'password':
        return this.state.password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        )
      case 'passwordRetype':
        return this.state.password === this.state.passwordRetype
      case 'agree':
        return this.state.agree
    }
  }

  render () {
    return (
      <SignupDisplay formControl={this.state} handleUserInput={this.handleUserInput}
                     handleUserToggle={this.handleUserToggle} handleUserSubmit={this.handleUserSubmit}
      />
    )
  }
}
