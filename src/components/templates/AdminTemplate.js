import React, { Component } from 'react'
import {
  styled,
  ThemeProvider,
  createTheme,
  useTheme
} from '@material-ui/core/styles'
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: `-${drawerWidth}px`,
      padding: theme.spacing(3, 15)
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(3)
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
        marginLeft: 0
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(3),
        marginLeft: 0
      }
    })
  })
)

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  color: '#272727',
  background: '#fff'
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

const theme = createTheme({
  palette: {
    background: {
      default: '#E1E5E9'
    }
  }
})

const SidebarComponent = (props) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <React.Fragment>
      <StyledAppBar position="fixed" open={props.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(props.open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            EBookVendor Administration
          </Typography>
          <Stack direction="row" spacing={3} mx={2}>
            <IconButton>
              <Badge badgeContent={4} color="error">
                <MailIcon color="action" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon color="action" />
              </Badge>
            </IconButton>
            <IconButton>
              <AccountCircle color="action" />
            </IconButton>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: '#272727',
            color: '#FFFFFF'
          }
        }}
        variant={matches ? 'persistent' : 'temporary'}
        anchor="left"
        open={props.open}
      >
        <DrawerHeader>
          <IconButton
            onClick={props.handleDrawerClose}
            sx={{ color: '#FFFFFF' }}
          >
            {theme.direction === 'ltr'
              ? (
              <ChevronLeftIcon />
                )
              : (
              <ChevronRightIcon />
                )}
          </IconButton>
        </DrawerHeader>
        <Divider variant="middle" />
        <List>
          <ListItemButton
            selected={props.selectedIndex === 0}
            key={0}
            component={Link}
            to="/admin"
            sx={{
              '&:hover, &:focus': {
                background: '#424242',
                color: '#FFFFFF'
              }
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            selected={props.selectedIndex === 1}
            key={1}
            component={Link}
            to="/admin/ebooks"
            sx={{
              '&:hover, &:focus': {
                background: '#424242',
                color: '#FFFFFF'
              }
            }}
          >
            <ListItemText primary="Store Products" />
          </ListItemButton>
          <ListItemButton
            selected={props.selectedIndex === 2}
            key={2}
            component={Link}
            to="/admin/orders"
            sx={{
              '&:hover, &:focus': {
                background: '#424242',
                color: '#FFFFFF'
              }
            }}
          >
            <ListItemText primary="Store Orders" />
          </ListItemButton>
          <ListItemButton
            selected={props.selectedIndex === 3}
            key={3}
            component={Link}
            to="/admin/analytic"
            sx={{
              '&:hover, &:focus': {
                background: '#424242',
                color: '#FFFFFF'
              }
            }}
          >
            <ListItemText primary="Analytics & Reports" />
          </ListItemButton>
          <ListItemButton
            selected={props.selectedIndex === 4}
            key={4}
            component={Link}
            to="/admin/finance"
            sx={{
              '&:hover, &:focus': {
                background: '#424242',
                color: '#FFFFFF'
              }
            }}
          >
            <ListItemText primary="Finances" />
          </ListItemButton>
          <ListItemButton
            selected={props.selectedIndex === 5}
            key={5}
            component={Link}
            to="/admin/campaign"
            sx={{
              '&:hover, &:focus': {
                background: '#424242',
                color: '#FFFFFF'
              }
            }}
          >
            <ListItemText primary="Email Campaigns" />
          </ListItemButton>
        </List>
        <Divider variant="middle" />
      </Drawer>
    </React.Fragment>
  )
}

class AdminTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true
    })
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    })
  };

  render () {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <SidebarComponent
            open={this.state.open}
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            selectedIndex={this.props.selectedIndex}
          />
          <Main open={this.state.open}>
            <DrawerHeader />
            {this.props.children}
          </Main>
        </Box>
      </ThemeProvider>
    )
  }
}

export default AdminTemplate
