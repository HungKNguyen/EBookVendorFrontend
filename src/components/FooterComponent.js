import React, { Component } from 'react';
import {AppBar, Box, createTheme, ThemeProvider, Toolbar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Login, Search} from "@material-ui/icons";

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

class Footer extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color='black'>
                        <Toolbar>

                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        )
    }
}

export default Footer;