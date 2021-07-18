import React, { Component } from 'react';
import Header from "./HeaderComponent";
import {
    Typography,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActionArea, Stack
} from "@material-ui/core";
import Footer from "./FooterComponent";

class Home extends Component {
    render() {
        const ebooks = this.props.ebooks.isLoading ? <div /> : this.props.ebooks.content.map((ebook) => {
            return (
                <Grid item>
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
                <div>
                    <CardActionArea>
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
                    <Stack spacing={5} direction="row" justifyContent='center'>
                        {reviews}
                    </Stack>
                </Box>
                <Footer/>
            </div>
        )
    }
}

export default Home