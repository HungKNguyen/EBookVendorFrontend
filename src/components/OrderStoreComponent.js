import React, {Component} from 'react';
import { styled, ThemeProvider, createTheme } from '@material-ui/core/styles';
import {Box, CssBaseline} from '@material-ui/core';
import SidebarComponent from './SidebarComponent';
import {connect} from "react-redux";
import {fetchOrders} from "../redux/ActionCreators";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3, 15),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginLeft: `-${drawerWidth}px`
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0
        },
        ...(open && {
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up('sm')]: {
                marginLeft: 0
            },
            [theme.breakpoints.up('sm')]: {
                marginLeft: 0
            },
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

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchOrders: () => {dispatch(fetchOrders())}
})

class OrderStoreComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        this.props.fetchOrders();
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
                    <SidebarComponent open={this.state.open} handleDrawerOpen={() => this.handleDrawerOpen()}
                                      handleDrawerClose={() => this.handleDrawerClose()} selectedIndex={2}/>
                    <Main open={this.state.open}>
                        <DrawerHeader/>
                        {/* TODO: Start here to insert page body */}
                        <h1>This is OrderStore Page</h1>
                    </Main>
                </Box>
            </ThemeProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderStoreComponent);