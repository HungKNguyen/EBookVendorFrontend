import React, { Component } from 'react';
import {
    AppBar,
    Box,
    createTheme,
    ThemeProvider,
    Toolbar,
    Button,
    Typography,
    Modal,
    TextField, Rating, Stack
} from "@material-ui/core";

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
    constructor(props) {
        super(props);
        this.state = {
            rating: 4,
            review: "",
            isOpen: false
        }
    }
    handleOpen() {
        this.setState({
            isOpen: true
        })
    }
    handleClose() {
        this.setState({
            isOpen: false
        })
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    handleRating (newValue) {
        this.setState({
            rating: newValue
        })
    }
    handleSubmit() {
        console.log(this.state)
        this.handleClose();
    }
    render() {
        const style = {
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            background: '#fff',
            border: '2px solid #272727',
            p: 4,
            textAlign: 'center'
        };
        return (
            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color='black'>
                        <Toolbar sx={{mx: 'auto'}}>
                            <Button variant='text' size='large' color='white' onClick={() => this.handleOpen()}>Write us a review</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Modal
                    open={this.state.isOpen}
                    onClose={() => this.handleClose()}
                >
                    <Stack spacing={2} sx={style}>
                        <Typography variant='h5'>Write a review</Typography>
                        <TextField
                            label="Multiline"
                            multiline
                            rows={4}
                            fullWidth
                            variant='filled'
                            value={this.state.review}
                            name='review'
                            onChange={(event) => this.handleUserInput(event)}
                        />
                        <Stack direction='row' justifyContent="space-between">
                            <Button variant="contained" onClick={() => this.handleSubmit()}>Submit</Button>
                            <Rating size='large' value={this.state.rating} onChange={(event, newValue) => this.handleRating(newValue)}/>
                        </Stack>
                    </Stack>
                </Modal>
            </ThemeProvider>
        )
    }
}

export default Footer;