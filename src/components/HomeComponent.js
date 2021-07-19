import React, { Component } from 'react';
import Header from "./HeaderComponent";
import {
    Typography,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea, Stack, Rating, Modal, Divider
} from "@material-ui/core";
import Footer from "./FooterComponent";

function ReviewModal(props) {
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        background: '#fff',
        border: '2px solid #272727',
        p: 4,
        textAlign: 'center'
    };
    if (props.content === null) return <div />
    return (
        <Modal
            open={props.isOpen}
            onClose={() => props.handleClose()}
        >
            <Stack sx={style} spacing={2}>
                <Rating readOnly value={props.content.rating} />
                <Stack direction='row' justifyContent='space-between'>
                    <Typography variant='body2' sx={{textAlign: 'left'}}>{props.content.user.firstname + " " + props.content.user.lastname}</Typography>
                    <Typography variant='body2' sx={{textAlign: 'left'}}>{props.content.date}</Typography>
                </Stack>
                <Divider />
                <Typography variant='body1' sx={{textAlign: 'left'}}>{props.content.review}</Typography>
            </Stack>
        </Modal>
    )
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            selectedReview: null
        }
    }
    handleOpen(review) {
        this.setState({
            isOpen: true,
            selectedReview: review
        })
    }
    handleClose() {
        this.setState({
            isOpen: false,
            selectedReview: null
        })
    }
    render() {
        const ebooks = this.props.ebooks.isLoading ? <div /> : this.props.ebooks.content.map((ebook) => {
            return (
                <Grid item key={ebook._id}>
                    <CardActionArea>
                        <Card sx={{ width: 200 }} variant="outlined">
                            <CardMedia
                                sx={{ height: 300 }}
                                image={ebook.image}
                                title={ebook.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="body1" component="div" noWrap>
                                    <b>{ebook.name}</b>
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" align='left' noWrap>
                                    {ebook.author}
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </Grid>
            )
        })
        const reviews = this.props.reviews.isLoading ? <div /> : this.props.reviews.content.map((review) => {
            return (
                <div key={review._id}>
                    <CardActionArea onClick={() => this.handleOpen(review)}>
                        <Card sx={{ width: 300}} variant="outlined">
                            <CardContent>
                                <Typography gutterBottom variant="body1" component="div" className='three-line-para' align='left'>
                                    {review.review}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" align='right' sx={{mr: 3}} >
                                    <i>{review.user.firstname + " " + review.user.lastname}</i>
                                </Typography>
                            </CardContent>
                        </Card>
                    </CardActionArea>
                </div>
            )
        })
        return (
            <div>
                <Header />
                <ReviewModal content={this.state.selectedReview} isOpen={this.state.isOpen} handleClose={() => this.handleClose()}/>
                <Box sx={{ mx: "auto", textAlign: 'center', py: 5}}>
                    <Typography variant='h4' component='div' sx={{ mb: 3 }}>
                        <b>Our Listing</b>
                    </Typography>
                    <Grid container spacing={5} justifyContent='center'>
                        {ebooks}
                    </Grid>
                </Box>
                <Box sx={{ mx: "auto", py: 5, textAlign: 'center', background: '#F6F6F6'}}>
                    <Typography variant='h4' component='div' sx={{ mb: 3 }}>
                        <b>Customers' Feedback</b>
                    </Typography>
                    <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} justifyContent='center' alignItems='center'>
                        {reviews}
                    </Stack>
                </Box>
                <Footer/>
            </div>
        )
    }
}

export default Home