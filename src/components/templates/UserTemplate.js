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
      isNew: true,
      reviewId: '',
      rating: 4.5,
      review: '',
      isOpen: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleUserInput = this.handleUserInput.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleSubmit () {
    try {
      let response
      if (this.state.isNew) {
        response = await instance.post('/api/reviews', { rating: this.state.rating, review: this.state.review })
      } else {
        response = await instance.put('/api/reviews', {
          rating: this.state.rating,
          review: this.state.review,
          reviewId: this.state.reviewId
        })
      }
      toast.success(response.data.message)
      this.handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  async handleDelete () {
    try {
      const response = await instance.delete('/api/reviews', {
        data: {
          reviewId: this.state.reviewId
        }
      })
      toast.success(response.data.message)
      this.setState({
        isNew: true,
        reviewId: '',
        rating: 4.5,
        review: ''
      })
      this.handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  handleOpen () {
    if (localStorage.getItem('user')) {
      instance.get('/api/reviews/user')
        .then((response) => {
          if (response.data) {
            this.setState({
              isOpen: true,
              isNew: false,
              reviewId: response.data._id,
              rating: response.data.rating,
              review: response.data.review
            })
          } else {
            this.setState({ isOpen: true })
          }
        })
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
            <Rating
                size="large"
                value={this.state.rating}
                precision={0.5}
                onChange={(event, newValue) => this.handleRating(newValue)}
            />
            <Stack direction="row" justifyContent="space-between">
              <Button variant="contained" color='button' onClick={this.handleSubmit}>
                {this.state.isNew ? 'Submit' : 'Modify'}
              </Button>
              <Button variant="contained" color='error' disabled={this.state.isNew} onClick={this.handleDelete}>
                Delete
              </Button>
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
    this.state = {
      profile: JSON.parse(localStorage.getItem('user'))
    }
    this.logOut = this.logOut.bind(this)
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

  render () {
    return (
        <div>
          <Header profile={this.state.profile} logOut={this.logOut}/>
          {this.props.children}
          <Footer />
        </div>
    )
  }
}
