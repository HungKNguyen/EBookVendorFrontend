import React, { Component } from 'react'
import GoogleLogin from 'react-google-login'
import { instance } from '../../axiosConfig'
import { history } from '../../App'
import { toast } from 'react-toastify'
import { Button } from '@material-ui/core'
import GoogleIcon from '@material-ui/icons/Google'

export class GoogleLoginBtn extends Component {
  constructor (props) {
    super(props)
    this.handleGOOGLogIn = this.handleGOOGLogIn.bind(this)
  }

  async handleGOOGLogIn (oauthResponse) {
    try {
      const response = await instance.post('/api/login/google', { access_token: oauthResponse.accessToken })
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response.data))
      history.push('/home')
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        toast.error('Error when logging you in, make sure your email isn\'t connected to an existing account')
      }
    }
  }

  render () {
    return (
        <GoogleLogin
            clientId= {process.env.REACT_APP_GOOG_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={this.handleGOOGLogIn}
            onFailure={this.handleGOOGLogIn}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
                <Button
                    sx={{
                      backgroundColor: '#dd4b49',
                      color: '#FFFFFF',
                      '&:hover, &:focus': {
                        background: '#bf2d2b',
                        color: '#FFFFFF'
                      }
                    }}
                    disabled={renderProps.disabled}
                    onClick={renderProps.onClick}
                    variant='outlined'
                    size='large'
                    startIcon={<GoogleIcon/>}
                >
                Continue with Google
                </Button>
            )}
        />
    )
  }
}
