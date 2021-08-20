import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { styled, Box } from '@material-ui/system'
import { alpha } from '@material-ui/core/styles'
import {
  Stack,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Toolbar,
  InputBase,
  Divider
} from '@material-ui/core'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import SearchIcon from '@material-ui/icons/Search'

import { fetchOrders } from '../../redux/ActionCreators'
import { connect } from 'react-redux'
import AdminTemplate from '../templates/AdminTemplate'

function OrdersTableHeader (props) {
  const { onSelectAllClick, numSelected, rowCount } = props

  return (
        <TableHead>
            <TableRow>
                <TableCell align="center" >
                    <Checkbox
                      color="primary"
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={rowCount > 0 && numSelected === rowCount}
                      onChange={onSelectAllClick}
                    />
                </TableCell>
                <TableCell align="center">
                    Order
                </TableCell>
                <TableCell align="center">
                    Date
                </TableCell>
                <TableCell align="center">
                    Customer
                </TableCell>
                <TableCell align="center">
                    Total
                </TableCell>
            </TableRow>
        </TableHead>
  )
}

OrdersTableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
}

function OrdersTableToolbar (props) {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch'
        }
      }
    }
  }))

  return (
        <Toolbar>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <SettingsOutlinedIcon/>
        </Toolbar>
  )
};

export const Orders = (props) => {
  const [selected, setSelected] = React.useState([])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.orders.content.map((n) => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

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
    const orders = props.orders.content.map((order) => {
      const isItemSelected = isSelected(order._id)

      return (
        <TableRow key={order._id}>
            <TableCell align="center">
                <Checkbox
                  color="primary"
                  key={order._id}
                  onClick={(event) => handleClick(event, order._id)}
                  checked={isItemSelected}
                  selected={isItemSelected}
                />
            </TableCell>
            <TableCell align="center">
              #{order._id}
            </TableCell>
            <TableCell align="center">
              {order.date}
            </TableCell>
            <TableCell align="center">
                {order.user.firstname + ' ' + order.user.lastname}
            </TableCell>
            <TableCell align="center">
                ${Number(order.amount).toFixed(2)}
            </TableCell>
        </TableRow>
      )
    })
    return (orders)
  }

  return (
    <Box sx={{ width: '100%' }}>
        <Typography variant="h4">
            Orders
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" color="primary" flexItem/>}
          spacing={1}
        >
            <Typography>
                {props.orders.content.length} orders
            </Typography>
            <Typography color="primary">
                $ revenue
            </Typography>
        </Stack>
        <Paper sx={{ width: '100% ', mb: 2, mt: 3 }}>
            <OrdersTableToolbar/>
            <TableContainer sx={{ maxHeight: 740 }} >
                <Table stickyHeader>
                    <OrdersTableHeader
                      numSelected={selected.length}
                      onSelectAllClick={handleSelectAllClick}
                      rowCount={props.orders.content.length}
                    />
                    <TableBody>
                        <OrdersList orders={props.orders}/>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => {
    dispatch(fetchOrders())
  }
})

class OrdersComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount () {
    this.props.fetchOrders()
  }

  render () {
    return (
        <AdminTemplate selectedIndex={2}>
            <Orders orders={this.props.orders}/>
        </AdminTemplate>
    )
  }
}

export const OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent)
