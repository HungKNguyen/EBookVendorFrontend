import React, { Component } from 'react'
import { styled, Box } from '@material-ui/system'
import PropTypes from 'prop-types'
import { alpha } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Stack from '@material-ui/core/Stack'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import InputBase from '@material-ui/core/InputBase'
import { connect } from 'react-redux'
import AdminTemplate from '../templates/AdminTemplate'

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

function TableHeader () {
  return (
    <TableHead>
      <TableRow>
        <TableCell id="checkbox-column"></TableCell>
        <TableCell id="avatar-column"></TableCell>
        <TableCell minWidth= "170" align = 'center'>Name</TableCell>
        <TableCell minWidth= "170" align = 'center'>Price</TableCell>
        <TableCell minWidth= "170" align = 'center'>Sold</TableCell>
        <TableCell minWidth= "170" align = 'center'>Rating</TableCell>
        <TableCell minWidth= "170" align = 'center'></TableCell>
      </TableRow>
    </TableHead>
  )
}

const TableToolbar = (props) => {
  const { numSelected, rowCount, onSelectAllClick } = props

  return (
    <Toolbar>
      <Checkbox
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={onSelectAllClick}
        sx={{ ml: 'auto' }}
      />
      {numSelected > 0
        ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
      {numSelected} selected
        </Typography>
          )
        : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          id="tableTitle"
          component="div"
        >
          select all
        </Typography>
          )}

      {numSelected > 0
        ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
          )
        : (
        <Tooltip title="search">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Tooltip>
          )}
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
}

export const Products = (props) => {
  const [selected, setSelected] = React.useState([])
  const isSelected = (name) => selected.indexOf(name) !== -1

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.ebooks.content.map((n) => n.name)
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

  function EbooksLists (name, price, status) {
    if (props.ebooks.isLoading) {
      return (
        <Typography>
          Loading...
        </Typography>
      )
    }
    if (props.ebooks.content.length === 0) {
      return (
        <Typography>
          No book listed, try add something new.
        </Typography>
      )
    }
    const ebooks = props.ebooks.content.map((ebook) => {
      const isItemSelected = isSelected(ebook.name)

      return (
        <TableRow
          hover
          onClick={(event) => handleClick(event, ebook.name)}
          key={ebook.name}
          selected={isItemSelected}
        >
          <TableCell align="center">
            <Checkbox color="primary" checked={isItemSelected}/>
          </TableCell>
          <TableCell align="center">
            <Avatar alt={ebook.name} src={ebook.image} sx={{ height: 50 }} variant="square"/>
          </TableCell>
          <TableCell align="center">
            {ebook.name}
          </TableCell>
          <TableCell align="center">${ebook.price}</TableCell>
          <TableCell align="center">{ebook.sold}</TableCell>
          <TableCell align="center">{ebook.sold}</TableCell>
          <TableCell align="center"><MoreHorizIcon/></TableCell>
        </TableRow>
      )
    })

    return (ebooks)
  }

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ pb: 2 }}>
        <Typography variant="h3">
          Products
        </Typography>
        <Button variant="contained">
          +  New Ebook
        </Button>
      </Stack>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 740 }} padding ="normal">
          <TableToolbar
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={props.ebooks.length}/>
          <Table stickyHeader >
            <TableHeader/>
            <TableBody>
              <EbooksLists/>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

const mapStateToProps = state => {
  return {
    ebooks: state.ebooks
  }
}

class ProductsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render () {
    return (
          <AdminTemplate selectedIndex={1}>
              <Products ebooks={this.props.ebooks}/>
          </AdminTemplate>
    )
  }
}
export const ProductsPage = connect(mapStateToProps)(ProductsComponent)
