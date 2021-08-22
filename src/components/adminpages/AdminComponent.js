import React, { Component } from 'react'
import {
  Box,
  Typography,
  Grid,
  Divider,
  Paper,
  Stack,
  Button,
  Avatar
} from '@material-ui/core'
import { AdminTemplate } from '../templates/AdminTemplate'
import { instance } from '../../axiosConfig'
import { toast } from 'react-toastify'

const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '8px' }}>
      •
    </Box>
)

const OrdersList = (props) => {
  if (props.orders.length === 0) {
    return (
        <Typography variant="body2" align="center">
          You don&apos;t have any recent orders
        </Typography>
    )
  }
  const orders = props.orders.map((order) => {
    const ebookNames = order.ebooks.map((ebook) => ebook.name).join(', ')
    return (
        <Box key={order._id}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="fontWeightMedium">
              {order.user.firstname + ' ' + order.user.lastname}
            </Typography>
            <Typography>{order.date}</Typography>
          </Stack>
          <Typography color="text.secondary" noWrap>
            ${Number(order.amount).toFixed(2)}
            {bull}
            {ebookNames}
          </Typography>
        </Box>
    )
  })
  return (
      <Stack spacing={2} sx={{ mb: 2 }}>
        {orders}
      </Stack>
  )
}

const EbooksList = (props) => {
  if (props.ebooks.length === 0) {
    return (
        <Typography variant="body2" align="center">
          No book listed, try adding some :)
        </Typography>
    )
  }
  const ebooks = props.ebooks.map((ebook) => {
    return (
        <Grid container item key={ebook._id}>
          <Grid item lg={2} xs={12}>
            <Avatar
                alt={ebook.name}
                src={ebook.image}
                variant="square"
                sx={{ width: 50, height: 80 }}
            />
          </Grid>
          <Grid item lg={10} xs={12}>
            <Typography noWrap fontWeight="fontWeightMedium">
              {ebook.name}
            </Typography>
            <Typography color="text.secondary">
              {ebook.sold} copies sold
            </Typography>
            <Typography color="text.secondary">
              ${Number(ebook.price).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
    )
  })
  return (
      <Grid container spacing={2} mb={2}>
        {ebooks}
      </Grid>
  )
}

const SalesList = (props) => {
  if (props.sales.length === 0) {
    return (
        <Typography variant="body2" align="center">
          You don&apos;t have any sale report yet
        </Typography>
    )
  }
  const sales = props.sales.map((sale) => {
    return (
        <Box key={sale._id}>
          <Typography fontWeight="fontWeightMedium">{sale.date}</Typography>
          <Typography color="text.secondary" noWrap>
            ${Number(sale.revenue).toFixed(2)}
            {bull}
            {sale.sold} ebooks sold
          </Typography>
        </Box>
    )
  })
  return (
      <Stack spacing={2} mb={2}>
        {sales}
      </Stack>
  )
}

// TODO: Need to come up with email object in store first
const CampaignsList = (props) => {
  return (
      <Typography variant="body2" align="center">
        You can write and send email campaigns to users
      </Typography>
  )
}

export const DashBoard = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={9} xs={12}>
        <Stack mb={2}>
          <Typography variant="h6">Business Overview</Typography>
          <Divider />
        </Stack>
        <Grid container spacing={2} mb={2}>
          <Grid item md={6} xs={12}>
            <Stack spacing={2}>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Recent Orders
                </Typography>
                <OrdersList orders={props.orders} />
                <Button variant="container" disableRipple sx={{ padding: 0 }}>
                  See more
                </Button>
              </Paper>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Monthly Sales
                </Typography>
                <SalesList sales={props.sales} />
                <Button variant="container" disableRipple sx={{ padding: 0 }}>
                  See more
                </Button>
              </Paper>
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack spacing={2}>
              <Paper sx={{ padding: 2 }}>
                <Stack direction="row" sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ebooks Sold
                  </Typography>
                </Stack>
                <EbooksList ebooks={props.ebooks} />
                <Button variant="container" color='black' disableRipple sx={{ padding: 0 }}>
                  See more
                </Button>
              </Paper>
              <Paper sx={{ padding: 2 }}>
                <Stack direction="row" sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Latest Email Campaign
                  </Typography>
                </Stack>
                <CampaignsList />
                <Button variant="container" disableRipple sx={{ padding: 0 }}>
                  See more
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
        <Divider />
      </Grid>
      <Grid item md={3} xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Analytics
          </Typography>
          {/* //TODO: Come up with analytic layout */}
        </Paper>
      </Grid>
    </Grid>
  )
}

export class AdminDashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      ebooks: [],
      orders: [],
      sales: []
    }
  }

  async getData () {
    try {
      const ebooksResponse = await instance.get('/api/ebooks/bestseller')
      console.log(ebooksResponse)
      const orderResponse = await instance.get('/api/orders/admin/recent')
      console.log(orderResponse)
      const salesResponse = await instance.get('/api/orders/admin/summary')
      console.log(salesResponse)
      return { ebooks: ebooksResponse.data, orders: orderResponse.data, sales: salesResponse.data }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  componentDidMount () {
    this.getData()
      .then(data => this.setState(data))
  }

  render () {
    return (
      <AdminTemplate selectedIndex={0}>
        <DashBoard
          ebooks={this.state.ebooks}
          orders={this.state.orders}
          sales={this.state.sales}
        />
      </AdminTemplate>
    )
  }
}
