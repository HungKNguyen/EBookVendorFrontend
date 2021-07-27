import React, {Component} from 'react';
import { styled, useTheme, ThemeProvider, createTheme } from '@material-ui/core/styles';
import {Box, CssBaseline, Typography, Grid, Divider, Paper, Stack} from '@material-ui/core';
import SidebarCompoment from './SidebarComponent';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const theme = createTheme({
    palette: {
        background: {
            default: "#E1E5E9"
        }
    }
});

export default class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleDrawerOpen = () => {
        this.setState({
            open: true,
        })
    };

    handleDrawerClose = () => {
        this.setState({
            open: false,
        })
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{display: 'flex'}}>
                    <SidebarCompoment open={this.state.open} handleDrawerOpen={() => this.handleDrawerOpen()}
                                      handleDrawerClose={() => this.handleDrawerClose()} selectedIndex={0}/>
                    <Main open={this.state.open}>
                        <DrawerHeader/>
                        <Grid container spacing={2}>
                            <Grid item sm={8}>
                                <Stack mb={2}>
                                    <Typography variant='h6'>
                                        Business Overview
                                    </Typography>
                                    <Divider />
                                </Stack>
                                <Grid container spacing={2} mb={2}>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6'>
                                                Recent Orders
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6'>
                                                Ebooks Sold
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6'>
                                                Monthly Revenue
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6'>
                                                Lastest Email Campaign
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item sm={4}>
                                <Paper  sx={{padding: 2}}>
                                    <Typography variant='h6'>
                                        Analytics
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Main>
                </Box>
            </ThemeProvider>
        );
    }
}
