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
import { fetchEbooks, fetchOrders, fetchSales } from '../../redux/ActionCreators'
import { connect } from 'react-redux'
import AdminTemplate from '../templates/AdminTemplate'

export const DashBoard = (props) => {
  const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '8px' }}>
      •
    </Box>
  )

  const OrdersList = (props) => {
    if (props.orders.isLoading) {
      return (
        <Typography variant="body2" align="center">
          Loading...
        </Typography>
      )
    }
    if (props.orders.content.length === 0) {
      return (
        <Typography variant="body2" align="center">
          You don&apos;t have any recent orders
        </Typography>
      )
    }
    const orders = props.orders.content.slice(0, 3).map((order) => {
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
      <Box>
        <Stack spacing={2} sx={{ mb: 2 }}>
          {orders}
        </Stack>
        <Button variant="text" disableRipple sx={{ padding: 0 }}>
          See all({props.orders.content.length})
        </Button>
      </Box>
    )
  }

  const EbooksList = (props) => {
    if (props.ebooks.isLoading) {
      return (
        <Typography variant="body2" align="center">
          Loading...
        </Typography>
      )
    }
    if (props.ebooks.content.length === 0) {
      return (
        <Typography variant="body2" align="center">
          No book listed, try adding some :)
        </Typography>
      )
    }
    const ebooks = props.ebooks.content.slice(0, 5).map((ebook) => {
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
      <Box>
        <Grid container spacing={2} mb={2}>
          {ebooks}
        </Grid>
        <Button variant="text" disableRipple sx={{ padding: 0 }}>
          See all({props.ebooks.content.length})
        </Button>
      </Box>
    )
  }

  const SalesList = (props) => {
    if (props.sales.isLoading) {
      return (
        <Typography variant="body2" align="center">
          Loading...
        </Typography>
      )
    }
    if (props.sales.content.length === 0) {
      return (
        <Typography variant="body2" align="center">
          You don&apos;t have any sale report yet
        </Typography>
      )
    }
    const sales = props.sales.content.slice(0, 3).map((sale) => {
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
      <React.Fragment>
        <Stack spacing={2} mb={2}>
          {sales}
        </Stack>
        <Button variant="text" disableRipple sx={{ padding: 0 }}>
          See all({props.sales.content.length})
        </Button>
      </React.Fragment>
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
              </Paper>
              <Paper sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Monthly Sales
                </Typography>
                <SalesList sales={props.sales} />
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
                  <Button variant="text" disableRipple sx={{ padding: 0 }}>
                    Add new ebook
                  </Button>
                </Stack>
                <EbooksList ebooks={props.ebooks} />
              </Paper>
              <Paper sx={{ padding: 2 }}>
                <Stack direction="row" sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Latest Email Campaign
                  </Typography>
                  <Button variant="text" disableRipple sx={{ padding: 0 }}>
                    Create new
                  </Button>
                </Stack>
                <CampaignsList />
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

const mapStateToProps = (state) => {
  return {
    ebooks: state.ebooks,
    orders: state.orders,
    sales: state.sales
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => {
    dispatch(fetchOrders())
  },
  fetchSales: () => {
    dispatch(fetchSales())
  },
  fetchEbooks: () => {
    dispatch(fetchEbooks())
  }
})

class AdminComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount () {
    this.props.fetchOrders()
    this.props.fetchSales()
    this.props.fetchEbooks()
  }

  render () {
    return (
      <AdminTemplate selectedIndex={0}>
        <DashBoard
          ebooks={this.props.ebooks}
          orders={this.props.orders}
          sales={this.props.sales}
        />
      </AdminTemplate>
    )
  }
}

export const AdminDashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminComponent)
