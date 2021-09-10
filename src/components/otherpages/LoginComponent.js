import React, { Component } from 'react'
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Stack,
  Link,
  useMediaQuery
} from '@material-ui/core'
import { Home } from '@material-ui/icons'
import { instance } from '../../axiosConfig'
import { history } from '../../App'
import { FacebookLoginBtn } from '../ultilities/FacebookLoginBtn'
import { GoogleLoginBtn } from '../ultilities/GoogleLoginBtn'
import { useTheme } from '@material-ui/core/styles'
import { toast } from 'react-toastify'

export const LoginDisplay = (props) => {
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
        <Typography variant='h2' fontWeight='fontWeightBold' align='center'>Log In</Typography>
        <Typography variant='h6' fontWeight='fontWeightRegular' align='center'>
          Don&apos;t have an account? <Link href='/signup' underline='none'>Sign Up</Link>
        </Typography>
        <Grid container mx={'auto'} my={3} paddingX={matches ? 3 : 5}>
          <Grid item xs={12} md={6} paddingX={matches ? 0 : 10} paddingBottom={matches ? 3 : 0}
                sx={{ borderRight: (matches ? 0 : 1), borderBottom: (matches ? 1 : 0) }}>
            <Stack spacing={2} marginBottom={2}>
              <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={props.email}
                  variant="standard"
                  fullWidth
                  onChange={(event) => props.handleUserInput(event)}
              />
              <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={props.password}
                  variant="standard"
                  fullWidth
                  onChange={(event) => props.handleUserInput(event)}
              />
              <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                <FormControlLabel
                    control={
                      <Checkbox
                          name="rememberMe"
                          checked={props.rememberMe}
                          onChange={props.handleUserToggle}
                      />
                    }
                    label="Remember Me"
                />
                <Typography variant="body1">
                  <Link href="#" underline='none'>Forgot Password or Email?</Link>
                </Typography>
              </Stack>
            </Stack>
            <Button
                onClick={props.handleUserSubmit}
                variant='outlined'
                size='large'
            >
              Log In
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

export class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      rememberMe: false
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
    const current = this.state.rememberMe
    this.setState({ rememberMe: !current })
  }

  async handleUserSubmit () {
    try {
      const response = await instance.post('/api/login', {
        email: this.state.email,
        password: this.state.password,
        rememberMe: this.state.rememberMe
      })
      localStorage.setItem('user', JSON.stringify(response.data))
      history.push('/home')
    } catch (error) {
      if (error.message) {
        toast.error(error.message)
      }
      console.log(error)
    }
  }

  render () {
    return (
      <LoginDisplay email={this.state.email} password={this.state.password} rememberMe={this.state.rememberMe}
                    handleUserInput={this.handleUserInput} handleUserToggle={this.handleUserToggle}
                    handleUserSubmit={this.handleUserSubmit}/>
    )
  }
}
