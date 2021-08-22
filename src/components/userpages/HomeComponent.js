import React, { Component } from 'react'
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Stack,
  Rating,
  Modal,
  Divider, Link
} from '@material-ui/core'
import { UserTemplate } from '../templates/UserTemplate'
import { instance } from '../../axiosConfig'
import { toast } from 'react-toastify'

const ReviewModal = (props) => {
  const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#fff',
    border: '2px solid #272727',
    p: 4,
    textAlign: 'center'
  }
  if (props.content === null) return <div />
  return (
    <Modal open={props.isOpen} onClose={props.handleClose}>
      <Stack sx={style} spacing={2}>
        <Rating readOnly value={props.content.rating} precision={0.5} />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ textAlign: 'left' }}>
            {props.content.user.firstname + ' ' + props.content.user.lastname}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left' }}>
            {new Date(props.content.updatedAt).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })}
          </Typography>
        </Stack>
        <Divider />
        <Typography variant="body1" sx={{ textAlign: 'left' }}>
          {props.content.review}
        </Typography>
      </Stack>
    </Modal>
  )
}

const EbooksDisplay = (props) => {
  const ebooks = props.ebooks.map((ebook) => {
    return (
        <Grid item key={ebook._id}>
          <CardActionArea component={Link} href={`/browse/${ebook._id}`} >
            <Card sx={{ width: 200 }} variant="outlined">
              <CardMedia
                  sx={{ height: 300 }}
                  image={ebook.image}
                  title={ebook.name}
              />
              <CardContent>
                <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    noWrap
                    align='left'
                >
                  <b>{ebook.name}</b>
                </Typography>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    align="left"
                    noWrap
                >
                  by {ebook.author}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
    )
  })
  return (
      <Box sx={{ mx: 'auto', textAlign: 'center', py: 5 }}>
        <Typography variant="h4" component="div" sx={{ mb: 3 }}>
          <b>Our Listing</b>
        </Typography>
        <Grid container spacing={5} justifyContent="center">
          {ebooks}
        </Grid>
      </Box>
  )
}

const ReviewsDisplay = (props) => {
  const reviews = props.reviews.map((review) => {
    return (
        <Box key={review._id}>
          <CardActionArea onClick={() => props.handleOpen(review)}>
            <Card variant="outlined">
              <CardContent>
                <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    className="three-line-para"
                    align="left"
                    sx={{ width: 250, height: 125 }}
                >
                  {review.review}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="right"
                    sx={{ mr: 3 }}
                >
                  <i>{review.user.firstname + ' ' + review.user.lastname}</i>
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Box>
    )
  })
  return (
      <Box
          sx={{ mx: 'auto', py: 5, textAlign: 'center', background: '#F6F6F6' }}
      >
        <Typography variant="h4" component="div" sx={{ mb: 3 }}>
          <b>Customers&apos; Feedback</b>
        </Typography>
        <Stack
            spacing={5}
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="center"
            alignItems="center"
        >
          {reviews}
        </Stack>
      </Box>
  )
}

const HomeDisplay = (props) => {
  return (
    <Box>
      <ReviewModal
        content={props.selectedReview}
        isOpen={props.isOpen}
        handleClose={props.handleClose}
      />
      <EbooksDisplay ebooks={props.ebooks} />
      <ReviewsDisplay reviews={props.reviews} handleOpen={props.handleOpen} />
    </Box>
  )
}

export class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectedReview: null,
      ebooks: [],
      reviews: []
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async getData () {
    try {
      const ebooksResponse = await instance.get('/api/ebooks/featured')
      const reviewsResponse = await instance.get('/api/reviews/featured')
      return { ebooks: ebooksResponse.data, reviews: reviewsResponse.data }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }

  componentDidMount () {
    this.getData()
      .then(data => this.setState(data))
  }

  handleOpen (review) {
    this.setState({
      isOpen: true,
      selectedReview: review
    })
  }

  handleClose () {
    this.setState({
      isOpen: false,
      selectedReview: null
    })
  }

  render () {
    return (
      <UserTemplate>
         <HomeDisplay
          selectedReview={this.state.selectedReview}
          isOpen={this.state.isOpen}
          ebooks={this.state.ebooks}
          reviews={this.state.reviews}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
         />
      </UserTemplate>
    )
  }
}
