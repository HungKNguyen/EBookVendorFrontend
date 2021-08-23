import React, { Component } from 'react'
import { instance } from '../../axiosConfig'
import { toast } from 'react-toastify'
import { UserTemplate } from '../templates/UserTemplate'
import { Box, Button, Card, CardMedia, Grid, Paper, Stack, Typography } from '@material-ui/core'
import { Payment as PaymentIcon } from '@material-ui/icons'

const CartList = (props) => {
  if (props.cart.length === 0) {
    return (
        <Typography variant="body2" align="center">
          Your cart is empty, try adding some ebooks :)
        </Typography>
    )
  }
  const list = props.cart.map((ebook) => {
    return (
        <Stack direction='row' justifyContent='space-between' key={ebook._id}>
          <Grid container>
            <Grid item md={2} xs={12}>
              <Card sx={{ maxHeight: 200, maxWidth: 128 }}>
                <CardMedia
                    component="img"
                    title={ebook.name}
                    image={ebook.image}
                />
              </Card>
            </Grid>
            <Grid item md={10} xs={12}>
              <Stack spacing={1} paddingLeft={1}>
                <Typography noWrap fontWeight="fontWeightMedium">
                  {ebook.name}
                </Typography>
                <Typography color="text.secondary">
                  <i>by {ebook.author}</i>
                </Typography>
                <Typography>
                  ISBN: {ebook.ISBN}
                </Typography>
              </Stack>
              <Button size='small' sx={{ padding: 1 }} onClick={() => props.removeFromCart(ebook._id)}>
                Remove from cart
              </Button>
            </Grid>
          </Grid>
          <Typography>
            ${Number(ebook.price).toFixed(2)}
          </Typography>
        </Stack>
    )
  })
  return (
      <Box>
        {list}
      </Box>
  )
}

const CartDisplay = (props) => {
  const reducer = (accumulator, currentEbook) => accumulator + currentEbook.price
  const totalPrice = props.cart.length ? props.cart.reduce(reducer, 0) : 0
  return (
    <Stack spacing={5} paddingX={10} paddingY={5} sx={{ minHeight: 500 }}>
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4'>
          My Cart
        </Typography>
        <Button color='primary' variant='contained' startIcon={<PaymentIcon />}>
          Check out - ${Number(totalPrice).toFixed(2)}
        </Button>
      </Stack>
      <Box>
        <Paper variant='outlined' square sx={{ background: '#F6F6F6' }}>
          <Paper variant='outlined' square sx={{ background: '#272727', color: '#ffffff', paddingX: 3 }}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='h6'>
                {props.cart.length} EBook(s)
              </Typography>
              <Typography variant='h6'>
                USD
              </Typography>
            </Stack>
          </Paper>
          <Box marginY={3} paddingX={3}>
            <CartList {...props}/>
          </Box>
          <Paper variant='outlined' square sx={{ background: '#272727', color: '#ffffff', paddingX: 3 }}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='h6'>
                Total Cost:
              </Typography>
              <Typography variant='h6'>
                ${Number(totalPrice).toFixed(2)}
              </Typography>
            </Stack>
          </Paper>
        </Paper>
      </Box>
    </Stack>
  )
}

export class Cart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profile: JSON.parse(localStorage.getItem('user')),
      cart: []
    }
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  async getData () {
    try {
      const response = await instance.get('/api/users/cart')
      return { cart: response.data }
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }

  async removeFromCart (ebookId) {
    try {
      const response = await instance.delete('/api/users/cart', {
        data: {
          ebookId: ebookId
        }
      })
      toast.success(response.data.message)
      const newProfile = this.state.profile
      newProfile.cart = newProfile.cart.filter(item => item !== ebookId)
      const newCart = this.state.cart.filter(item => item._id !== ebookId)
      this.setState({
        profile: newProfile,
        cart: newCart
      })
      localStorage.setItem('user', JSON.stringify(newProfile))
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

  render () {
    return (
          <UserTemplate>
              <CartDisplay {...this.state} removeFromCart={this.removeFromCart}/>
          </UserTemplate>
    )
  }
}
