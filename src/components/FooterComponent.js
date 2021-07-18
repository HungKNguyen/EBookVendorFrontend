import React, { Component } from 'react';
import {AppBar, Box, createTheme, ThemeProvider, Toolbar, Button} from "@material-ui/core";

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
                        <Toolbar sx={{mx: 'auto'}}>
                            <Button variant='text' size='large' color='white'>Write us a review</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>
        )
    }
}

export default Footer;