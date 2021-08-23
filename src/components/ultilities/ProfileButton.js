import { Avatar, Button, ListItemIcon, Menu, MenuItem, Link, Badge } from '@material-ui/core'
import { AccountCircle, Dashboard, Login, Logout, Favorite, Book, KeyboardArrowDown, Web, ShoppingCart } from '@material-ui/icons'
import React from 'react'
import { GeneratedAvatar } from './GeneratedAvatar'

export const ProfileButton = (props) => {
  if (props.profile) {
    const icon = props.profile.image
      ? <Badge badgeContent={props.profile.cart.length} variant="dot" overlap="circular" color='error'>
            <Avatar src={props.profile.image} sx={{ width: 25, height: 25 }} />
        </Badge>
      : <Badge badgeContent={props.profile.cart.length} variant="dot" overlap="circular" color='error'>
            <GeneratedAvatar name={props.profile.firstname + ' ' + props.profile.lastname} sx={{ width: 25, height: 25 }} />
        </Badge>
    const adminMenuItem = props.profile.admin
      ? <div>
            <MenuItem component={Link} href="/home">
                <ListItemIcon>
                    <Web fontSize='small' />
                </ListItemIcon>
                Client View
            </MenuItem>
            <MenuItem component={Link} href="/admin">
                <ListItemIcon>
                    <Dashboard fontSize='small' />
                </ListItemIcon>
                Admin Dashboard
            </MenuItem>
        </div>
      : <div />
    return (
        <div>
            <Button variant="outlined" startIcon={icon} color={props.color} endIcon={<KeyboardArrowDown />}
                    onClick={props.handleClick}>
                {props.profile.firstname} {props.profile.lastname}
            </Button>
            <Menu anchorEl={props.anchor} open={Boolean(props.anchor)} onClose={props.handleClose}>
                <MenuItem component={Link} href="/profile">
                    <ListItemIcon>
                        <AccountCircle fontSize='small' />
                    </ListItemIcon>
                    Profile
                </MenuItem>
                <MenuItem component={Link} href="/profile/cart">
                    <ListItemIcon>
                        <Badge badgeContent={props.profile.cart.length} color='error'>
                            <ShoppingCart fontSize='small' />
                        </Badge>
                    </ListItemIcon>
                    My Cart
                </MenuItem>
                <MenuItem component={Link} href="/profile/favorite">
                    <ListItemIcon>
                        <Favorite fontSize='small' />
                    </ListItemIcon>
                    Favorite
                </MenuItem>
                <MenuItem component={Link} href="/profile/ebooks">
                    <ListItemIcon>
                        <Book fontSize='small' />
                    </ListItemIcon>
                    My Ebook
                </MenuItem>
                {adminMenuItem}
                <MenuItem onClick={props.logOut}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    Log out
                </MenuItem>
            </Menu>
        </div>
    )
  } else {
    return (
        <Button component={Link} href='/login' color="white" variant="outlined" startIcon={<Login />}>
            Login
        </Button>
    )
  }
}
