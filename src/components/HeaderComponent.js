import React, { Component } from 'react';
import {AppBar, Box, Button, Toolbar, Typography, createTheme, ThemeProvider, styled, alpha, InputBase} from "@material-ui/core";
import {Login, Search} from "@material-ui/icons";
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        black: {
            main: '#272727',
            contrastText: '#fff',
        },
        white: {
            main: '#fff'
        }
    }
});

const SearchArea = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

class Header extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color='black'>
                        <Toolbar className='px-md-5'>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to='/home' className='text-white'>
                                    EBookVendor
                                </Link>
                            </Typography>
                            <SearchArea>
                                <SearchIconWrapper>
                                    <Search />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search EBooks..."
                                    inputProps={{ 'name': 'search'}}
                                />
                            </SearchArea>
                            <Link to='/login'>
                                <Button color='white' variant="outlined" startIcon={<Login />}>Login</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        )
    }
}

export default Header