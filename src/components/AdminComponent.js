import React, {Component} from 'react';
import { styled, ThemeProvider, createTheme } from '@material-ui/core/styles';
import {Box, CssBaseline, Typography, Grid, Divider, Paper, Stack} from '@material-ui/core';
import SidebarCompoment from './SidebarComponent';
import {fetchOrders, fetchSales, fetchUsers} from "../redux/ActionCreators";
import {connect} from "react-redux";

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

const OrdersList = (props) => {
    return(
        <div />
    )
}

const EbooksList = (props) => {
    return(
        <div />
    )
}

const RevenuesList = (props) => {
    return(
        <div />
    )
}

const CampaignsList = (props) => {
    return(
        <div />
    )
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        sales: state.sales
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchOrders: () => {dispatch(fetchOrders())},
    fetchSales: () => {dispatch(fetchSales())}
})

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        this.props.fetchOrders();
        this.props.fetchSales();
        console.log(this.props);
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
                                            <Typography variant='h6' sx={{mb: 2}}>
                                                Recent Orders
                                            </Typography>
                                            <OrdersList />
                                        </Paper>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6' sx={{mb: 2}}>
                                                Ebooks Sold
                                            </Typography>
                                            <EbooksList />
                                        </Paper>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6' sx={{mb: 2}}>
                                                Monthly Revenue
                                            </Typography>
                                            <RevenuesList />
                                        </Paper>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Paper sx={{padding: 2}}>
                                            <Typography variant='h6' sx={{mb: 2}}>
                                                Latest Email Campaign
                                            </Typography>
                                            <CampaignsList />
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            <Grid item sm={4}>
                                <Paper  sx={{padding: 2}}>
                                    <Typography variant='h6' sx={{mb: 2}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent);