import React, { Component } from 'react'
import {
  AppBar,
  Box,
  Button,
  createTheme,
  Modal,
  Rating,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  Link
} from '@material-ui/core'
import { SearchBar } from '../ultilities/SearchBar'
import { ProfileButton } from '../ultilities/ProfileButton'
import { instance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import { history } from '../../App'

const theme = createTheme({
  palette: {
    black: {
      main: '#272727',
      contrastText: '#fff'
    },
    white: {
      main: '#fff',
      contrastText: '#272727'
    },
    primary: {
      main: '#fff',
      contrastText: '#272727'
    },
    button: {
      main: '#3873CA',
      contrastText: '#fff'
    }
  }
})

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = { anchor: null }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClick = (event) => {
    this.setState({ anchor: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchor: null })
  }

  render () {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="black">
            <Toolbar>
              <Link href="/home" underline='none' sx={{ flexGrow: 1 }}>
                <Typography variant='h6'>
                  EBookVendor
                </Typography>
              </Link>
              <SearchBar placeholder='Search Ebook...' inputProps={{ name: 'search' }}/>
              <ProfileButton profile={this.props.profile} anchor={this.state.anchor} logOut={this.props.logOut}
                             handleClick={this.handleClick} handleClose={this.handleClose} color='white'/>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    )
  }
}

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: 4.5,
      review: '',
      isOpen: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen () {
    if (localStorage.getItem('user')) {
      this.setState({ isOpen: true })
    } else {
      history.push('/login')
      toast.error('You need to be logged in to continue')
    }
  }

  handleClose () {
    this.setState({
      isOpen: false
    })
  }

  handleUserInput (e) {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  handleRating (newValue) {
    this.setState({
      rating: newValue
    })
  }

  handleSubmit () {
    this.props.submitReview(this.state.rating, this.state.review)
    this.handleClose()
  }

  render () {
    const style = {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      background: '#fff',
      border: '2px solid #272727',
      p: 4,
      textAlign: 'center'
    }
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="black">
            <Toolbar sx={{ mx: 'auto' }}>
              <Button
                variant="text"
                size="large"
                color="white"
                onClick={this.handleOpen}
              >
                Write us a review
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Modal open={this.state.isOpen} onClose={this.handleClose}>
          <Stack spacing={2} sx={style}>
            <Typography variant="h5">Write a review</Typography>
            <TextField
              label="Multiline"
              multiline
              rows={4}
              color='black'
              fullWidth
              variant="filled"
              value={this.state.review}
              name="review"
              onChange={(event) => this.handleUserInput(event)}
            />
            <Stack direction="row" justifyContent="space-between">
              <Button variant="outlined" color='button' onClick={this.handleSubmit}>
                Submit
              </Button>
              <Rating
                size="large"
                value={this.state.rating}
                precision={0.5}
                onChange={(event, newValue) => this.handleRating(newValue)}
              />
            </Stack>
          </Stack>
        </Modal>
      </ThemeProvider>
    )
  }
}

export class UserTemplate extends Component {
  constructor (props) {
    super(props)
    const profile = JSON.parse(localStorage.getItem('user'))
    this.state = {
      profile: profile
    }
    this.logOut = this.logOut.bind(this)
    this.submitReview = this.submitReview.bind(this)
  }

  async logOut () {
    try {
      const response = await instance.get('/api/logout')
      console.log(response)
      localStorage.removeItem('user')
      this.setState({ profile: null })
      history.push('/home')
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  async submitReview (rating, review) {
    try {
      const response = await instance.post('/api/reviews', { rating: rating, review: review })
      console.log(response)
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    return (
        <div>
          <Header profile={this.state.profile} logOut={this.logOut}/>
          {this.props.children}
          <Footer submitReview={this.submitReview}/>
        </div>
    )
  }
}
