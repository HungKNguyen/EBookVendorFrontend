import React, { Component } from 'react'
import { instance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import { UserTemplate } from '../templates/UserTemplate'
import {
  Avatar,
  Box,
  Button, Card,
  CardMedia, Divider,
  Grid, IconButton,
  List, ListItem, ListItemAvatar, ListItemText,
  Menu,
  MenuItem,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography
} from '@material-ui/core'
import {
  AddShoppingCart as AddShoppingCartIcon,
  ShoppingCart as ShoppingCartIcon,
  DownloadDone as DownloadDoneIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AddComment as AddCommentIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons'
import { GeneratedAvatar } from '../ultilities/GeneratedAvatar'
import { history } from '../../App'

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

const EBookListing = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={4} xs={12}>
          <Card sx={{ maxHeight: 400, maxWidth: 256 }}>
            <CardMedia
                component="img"
                title={props.ebook.name}
                image={props.ebook.image}
            />
          </Card>
      </Grid>
      <Grid item md={8} xs={12}>
        <Stack spacing={2} alignItems='flex-start'>
          <Typography fontWeight='fontWeightBold'>
            {props.ebook.name}
          </Typography>
          <Typography color="text.secondary">
            <i>by {props.ebook.author}</i>
          </Typography>
          <Typography>
            <b>Price:</b> ${Number(props.ebook.price).toFixed(2)}
          </Typography>
          <Typography>
            Description: {props.ebook.description}
          </Typography>
          <Typography>
            ISBN: {props.ebook.ISBN}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction='row' justifyContent='flex-start' spacing={3}>
          <Stack direction='row' spacing={1}>
            <Typography>Avg. Rating:</Typography>
            <Rating value={props.avgRating} precision={0.25} readOnly/>
          </Stack>
          <Typography>
            Sold: {props.ebook.sold}
          </Typography>
          <Typography>
            Favorite: {props.ebook.liked}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

const ButtonOne = (props) => {
  if (props.owned) {
    return (
     <Button
         variant='contained'
         disabled
         startIcon={<DownloadDoneIcon/>}
     >
       Owned EBook
     </Button>
    )
  }
  if (props.inCart) {
    return (
      <Button
          variant='contained'
          disabled
          startIcon={<ShoppingCartIcon/>}
      >
        Already in Cart
      </Button>
    )
  }
  return (
      <Button
          variant='contained'
          startIcon={<AddShoppingCartIcon/>}
          onClick={props.addToCart}
          sx={{
            backgroundColor: '#3874cb',
            color: '#FFFFFF',
            '&:hover, &:focus': {
              background: '#2460b7',
              color: '#FFFFFF'
            }
          }}
      >
        Add to Cart
      </Button>
  )
}

const ButtonTwo = (props) => {
  if (props.favorite) {
    return (
        <Button
            variant='contained'
            color='secondary'
            startIcon={<FavoriteIcon/>}
            onClick={props.removeFavorite}
            sx={{
              backgroundColor: '#ff6d75',
              color: '#FFFFFF',
              '&:hover, &:focus': {
                background: '#ff3d47',
                color: '#FFFFFF'
              }
            }}
        >
          Favorited
        </Button>
    )
  }
  return (
      <Button
          variant='contained'
          color='secondary'
          startIcon={<FavoriteBorderIcon/>}
          onClick={props.addFavorite}
          sx={{
            backgroundColor: '#ff6d75',
            color: '#FFFFFF',
            '&:hover, &:focus': {
              background: '#ff3d47',
              color: '#FFFFFF'
            }
          }}
      >
        Add to Favorite
      </Button>
  )
}

class ButtonsGroup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      comment: '',
      rating: 0
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleOpen () {
    if (this.props.profile) {
      this.setState({
        isOpen: true
      })
    } else {
      history.push('/login')
      toast.error('You need to be logged in to continue')
    }
  }

  handleClose () {
    this.setState({
      isOpen: false,
      comment: '',
      rating: 0
    })
  }

  handleSubmit () {
    this.props.addComment(this.state.rating, this.state.comment)
    this.setState({
      isOpen: false,
      comment: '',
      rating: 0
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
    return (
        <Stack spacing={2}>
          <ButtonOne addToCart={this.props.addToCart}
                     owned={this.props.profile && this.props.profile.ownedEBooks.includes(this.props.ebook._id)}
                     inCart={this.props.profile && this.props.profile.cart.includes(this.props.ebook._id)}
          />
          <ButtonTwo addFavorite={this.props.addFavorite} removeFavorite={this.props.removeFavorite}
                     favorite={this.props.profile && this.props.profile.favEBooks.includes(this.props.ebook._id)}/>
          <Button
              variant='contained'
              startIcon={<AddCommentIcon/>}
              onClick={this.handleOpen}
              sx={{
                backgroundColor: '#EFB23D',
                color: '#FFFFFF',
                '&:hover, &:focus': {
                  background: '#db9e29',
                  color: '#FFFFFF'
                }
              }}
          >
            Add a comment
          </Button>
          <Modal open={this.state.isOpen} onClose={this.handleClose}>
            <Stack spacing={2} sx={style}>
              <Typography variant="h5">Write a comment for {this.props.ebook.name}</Typography>
              <TextField
                  label="Multiline"
                  multiline
                  rows={4}
                  fullWidth
                  variant="filled"
                  value={this.state.comment}
                  name="comment"
                  onChange={(event) => this.handleUserInput(event)}
              />
              <Rating
                  size="large"
                  value={this.state.rating}
                  precision={0.5}
                  onChange={(event, newValue) => this.handleRating(newValue)}
              />
              <Button variant="contained" onClick={this.handleSubmit}>
               Submit
              </Button>
            </Stack>
          </Modal>
        </Stack>
    )
  }
}

const EndOfCommentList = (props) => {
  if (props.commentsTotal === 0) {
    return (
        <Divider>Be the first to leave a comment</Divider>
    )
  }
  if (props.commentsLength === props.commentsTotal) {
    return (
        <Divider>No more comments</Divider>
    )
  }
  return (
      <Divider>
        <Button onClick={() => props.getComments(props.sortIndex, false)}>
          Show 5 more comments
        </Button>
      </Divider>
  )
}

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isModifyModalOpen: false,
      isDeleteModalOpen: false,
      commentId: '',
      commentUserId: '',
      commentText: '',
      rating: 0,
      anchorEl: null
    }
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
    this.handleMenuClose = this.handleMenuClose.bind(this)
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleModifyModalClose = this.handleModifyModalClose.bind(this)
    this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this)
    this.handleModify = this.handleModify.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCommentText = this.handleCommentText.bind(this)
    this.handleRating = this.handleRating.bind(this)
  }

  handleOptionSelect (index) {
    if (index === 0) {
      this.setState({
        isModifyModalOpen: true,
        anchorEl: null
      })
    } else {
      this.setState({
        isDeleteModalOpen: true,
        anchorEl: null
      })
    }
  }

  handleMenuClose () {
    this.setState({ anchorEl: null })
  }

  handleMenuOpen (event, comment) {
    this.setState({
      commentId: comment._id,
      commentUserId: comment.user._id,
      commentText: comment.comment,
      rating: comment.rating,
      anchorEl: event.currentTarget
    })
  }

  handleModifyModalClose () {
    this.setState({ isModifyModalOpen: false })
  }

  handleDeleteModalClose () {
    this.setState({ isDeleteModalOpen: false })
  }

  handleModify () {
    this.props.modifyComment(this.state.commentId, this.state.rating, this.state.commentText)
    this.setState({ isModifyModalOpen: false })
  }

  handleDelete () {
    this.props.deleteComment(this.state.commentId)
    this.setState({ isDeleteModalOpen: false })
  }

  handleCommentText (event) {
    this.setState({ commentText: event.target.value })
  }

  handleRating (newValue) {
    this.setState({ rating: newValue })
  }

  render () {
    const options = [
      'Edit Comment',
      'Remove Comment'
    ]
    return (
        <React.Fragment>
          <List>
            {this.props.comments.map((comment) => {
              const avatar = comment.user.image
                ? <Avatar src={comment.user.image}/>
                : <GeneratedAvatar name={comment.user.firstname + ' ' + comment.user.lastname} sx={{ width: 40, height: 40 }}/>

              return (
                  <ListItem key={comment._id} secondaryAction={
                    <IconButton edge='end' onClick={(event) => this.handleMenuOpen(event, comment)}>
                      <MoreVertIcon/>
                    </IconButton>
                  }>
                    <ListItemAvatar>
                      {avatar}
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                          <React.Fragment>
                            <Typography component={'span'} fontWeight='fontWeightBold'>
                              {comment.user.firstname + ' ' + comment.user.lastname}
                            </Typography>
                            <Typography component={'span'} variant='body2'>
                              {' on ' + new Date(comment.updatedAt).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </Typography>
                          </React.Fragment>
                        }
                        secondary={
                          <Stack spacing={1} component={'span'}>
                            <Rating readOnly size='small' value={comment.rating} precision={0.5}/>
                            <Typography component={'span'}>
                              {comment.comment}
                            </Typography>
                          </Stack>
                        }
                    />
                  </ListItem>
              )
            })}
          </List>
          <Menu open={Boolean(this.state.anchorEl)} onClose={this.handleMenuClose} anchorEl={this.state.anchorEl}>
            {options.map((option, index) => (
                <MenuItem
                    key={index}
                    disabled={!(this.props.profile && ((this.props.profile._id === this.state.commentUserId) || (this.props.profile.admin && index === 1)))}
                    onClick={() => {
                      this.handleOptionSelect(index)
                    }}
                >
                  {option}
                </MenuItem>
            ))}
          </Menu>
          <Modal open={this.state.isModifyModalOpen} onClose={this.handleModifyModalClose}>
            <Stack spacing={2} sx={style}>
              <Typography variant="h5">Edit comment</Typography>
              <TextField
                  label="Multiline"
                  multiline
                  rows={4}
                  fullWidth
                  variant="filled"
                  value={this.state.commentText}
                  onChange={(event) => this.handleCommentText(event)}
              />
              <Rating
                  size="large"
                  value={this.state.rating}
                  precision={0.5}
                  onChange={(event, newValue) => this.handleRating(newValue)}
              />
              <Button variant="contained" onClick={this.handleModify}>
                Save
              </Button>
            </Stack>
          </Modal>
          <Modal open={this.state.isDeleteModalOpen} onClose={this.handleDeleteModalClose}>
            <Stack spacing={2} sx={style}>
              <Typography variant="h5">Remove comment</Typography>
              <Typography>You are about to delete your comment, this cannot be undone</Typography>
              <Button variant="contained" onClick={this.handleDelete}>
                Confirm
              </Button>
            </Stack>
          </Modal>
        </React.Fragment>
    )
  }
}

class CommentsListing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sortIndex: 0,
      anchorEl: null
    }
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOptionSelect (event, index) {
    this.setState({
      sortIndex: index,
      anchorEl: null
    }, () => {
      this.props.getComments(this.state.sortIndex, true)
    })
  }

  handleClose () {
    this.setState({ anchorEl: null })
  }

  handleOpen (event) {
    this.setState({ anchorEl: event.currentTarget })
  }

  render () {
    const options = [
      'Most Positive',
      'Most Critical',
      'Latest Comments',
      'Newest Comments'
    ]

    return (
        <Box>
          <Stack direction='row' spacing={3}>
            <Typography paddingY={1}>
              Comments ({this.props.commentsTotal})
            </Typography>
            <Button onClick={this.handleOpen} startIcon={<SortIcon />}>
              Sort by
            </Button>
            <Menu open={Boolean(this.state.anchorEl)} onClose={this.handleClose} anchorEl={this.state.anchorEl}>
              {options.map((option, index) => (
                  <MenuItem
                      key={index}
                      selected={index === this.state.sortIndex}
                      onClick={(event) => this.handleOptionSelect(event, index)}
                  >
                    {option}
                  </MenuItem>
              ))}
            </Menu>
          </Stack>
          <Comments comments={this.props.comments} modifyComment={this.props.modifyComment}
                    deleteComment={this.props.deleteComment} profile={this.props.profile}/>
          <EndOfCommentList commentsTotal={this.props.commentsTotal} commentsLength={this.props.comments.length}
                            sortIndex={this.state.sortIndex} getComments={this.props.getComments}/>
        </Box>
    )
  }
}

const EBookDisplay = (props) => {
  if (props.ebook) {
    return (
      <Grid container spacing={5} paddingX={10} paddingY={5}>
        <Grid item md={9} xs={12}>
          <EBookListing ebook={props.ebook} avgRating={props.avgRating} />
          <Box marginY={3}>
            <Divider />
          </Box>
          <CommentsListing comments={props.comments} commentsTotal={props.commentsTotal} getComments={props.getComments}
                           modifyComment={props.modifyComment} deleteComment={props.deleteComment} ebook={props.ebook}
                           profile={props.profile}/>
        </Grid>
        <Grid item md={3} xs={12}>
          <ButtonsGroup addToCart={props.addToCart} addFavorite={props.addFavorite}
                        removeFavorite={props.removeFavorite} addComment={props.addComment}
                        profile={props.profile} ebook={props.ebook}/>
        </Grid>
      </Grid>
    )
  }
  return (
      <div />
  )
}

export class EBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: JSON.parse(localStorage.getItem('user')),
      ebook: null,
      comments: [],
      avgRating: 0,
      commentsTotal: 0,
      sortIndex: 0
    }
    this.getComments = this.getComments.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.addFavorite = this.addFavorite.bind(this)
    this.removeFavorite = this.removeFavorite.bind(this)
    this.addComment = this.addComment.bind(this)
    this.modifyComment = this.modifyComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
  }

  async getData () {
    try {
      const ebookResponse = await instance.get('/api/ebooks/single', {
        params: {
          ebookId: this.props.ebookId
        }
      })
      const commentsResponse = await instance.get('/api/comments', {
        params: {
          ebookId: this.props.ebookId,
          sortField: 'rating',
          order: 'desc',
          skip: 0
        }
      })
      const commentsTotalResponse = await instance.get('/api/comments/total', {
        params: {
          ebookId: this.props.ebookId
        }
      })
      const commentsAvgResponse = await instance.get('/api/comments/average', {
        params: {
          ebookId: this.props.ebookId
        }
      })
      return {
        ebook: ebookResponse.data,
        comments: commentsResponse.data,
        commentsTotal: commentsTotalResponse.data.total,
        avgRating: commentsAvgResponse.data.average ? commentsAvgResponse.data.average : 0
      }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }

  async getComments (index, isNew) {
    const sortSetting = [
      { sortField: 'rating', order: 'desc' },
      { sortField: 'rating', order: 'asc' },
      { sortField: 'updatedAt', order: 'desc' },
      { sortField: 'updatedAt', order: 'asc' }
    ]
    const response = await instance.get('/api/comments', {
      params: {
        ebookId: this.props.ebookId,
        sortField: sortSetting[index].sortField,
        order: sortSetting[index].order,
        skip: isNew ? 0 : this.state.comments.length
      }
    })
    if (isNew) {
      this.setState({
        comments: response.data
      })
    } else {
      this.setState({
        comments: this.state.comments.concat(response.data)
      })
    }
  }

  async addToCart () {
    try {
      const response = await instance.post('/api/users/cart', {
        ebookId: this.state.ebook._id
      })
      toast.success(response.data.message)
      const newProfile = this.state.profile
      newProfile.cart.push(this.state.ebook._id)
      this.setState({ profile: newProfile })
      localStorage.setItem('user', JSON.stringify(newProfile))
    } catch (error) {
      console.log(error)
    }
  }

  async addFavorite () {
    try {
      const response = await instance.post('/api/users/favorite', {
        ebookId: this.state.ebook._id
      })
      toast.success(response.data.message)
      const newProfile = this.state.profile
      newProfile.favEBooks.push(this.state.ebook._id)
      this.setState({ profile: newProfile })
      localStorage.setItem('user', JSON.stringify(newProfile))
    } catch (error) {
      console.log(error)
    }
  }

  async removeFavorite () {
    try {
      const response = await instance.delete('/api/users/favorite', {
        data: {
          ebookId: this.state.ebook._id
        }
      })
      toast.success(response.data.message)
      const newProfile = this.state.profile
      newProfile.favEBooks = newProfile.favEBooks.filter(item => item !== this.state.ebook._id)
      this.setState({ profile: newProfile })
      localStorage.setItem('user', JSON.stringify(newProfile))
    } catch (error) {
      console.log(error)
    }
  }

  async addComment (rating, comment) {
    try {
      const response = await instance.post('/api/comments', {
        ebookId: this.state.ebook._id,
        rating: rating,
        comment: comment
      })
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  async modifyComment (commentId, rating, comment) {
    try {
      const response = await instance.put('/api/comments', {
        commentId: commentId,
        rating: rating,
        comment: comment
      })
      toast.success(response.data.message)
      this.getComments(0, true)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteComment (commentId) {
    try {
      let response
      if (this.state.profile.admin) {
        response = await instance.delete('/api/comments/admin', {
          data: { commentId: commentId }
        })
      } else {
        response = await instance.delete('/api/comments', {
          data: { commentId: commentId }
        })
      }
      toast.success(response.data.message)
      this.getComments(0, true)
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount () {
    this.getData()
      .then(data => {
        return this.setState(data)
      })
  }

  render () {
    return (
      <UserTemplate>
        <EBookDisplay {...this.state} getComments={this.getComments}
        addToCart={this.addToCart} addFavorite={this.addFavorite} removeFavorite={this.removeFavorite}
        addComment={this.addComment} modifyComment={this.modifyComment} deleteComment={this.deleteComment}/>
      </UserTemplate>
    )
  }
}
