import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { history } from '../../App'
import { instance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import { Button } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook'

export class FacebookLoginBtn extends Component {
  constructor (props) {
    super(props)
    this.handleFBLogIn = this.handleFBLogIn.bind(this)
  }

  async handleFBLogIn (oauthResponse) {
    try {
      const response = await instance.post('/api/login/facebook', { access_token: oauthResponse.accessToken })
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
        <FacebookLogin
            appId= {process.env.REACT_APP_FB_CLIENT_ID}
            callback={this.handleFBLogIn}
            render={(renderProps) => (
                <Button
                    sx={{
                      backgroundColor: '#3b5998',
                      color: '#FFFFFF',
                      '&:hover, &:focus': {
                        background: '#1d3b7a',
                        color: '#FFFFFF'
                      }
                    }}
                    disabled={renderProps.isDisabled}
                    onClick={renderProps.onClick}
                    variant='outlined'
                    size='large'
                    startIcon={<FacebookIcon/>}
                >
                    Continue with Facebook
                </Button>
            )}
        />
    )
  }
}
