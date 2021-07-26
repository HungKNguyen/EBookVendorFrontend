import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {styled} from "@material-ui/core/styles";
import {Divider, Grid, Link} from "@material-ui/core";

const useStyles = styled((theme) => ({
    title: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "black",
        margin: 12,
        marginBottom: 20
    },
    body: {
        textAlign: "center",
        fontSize: "0.75rem",
        color: "gray"
    },
    divider: {
        background: "black",
        marginTop: 12,
        marginBottom: 12
    },
    price: {
        display: "flex",
        alignItems: "center"
    },
    ebookTitle: {
        fontSize: "1rem",
    },
    seeAll: {
        margin: "0 12px"
    },
    img: {
        height: "5px",
        width: "10%"
    },
    ebookItem: {
        margin: "6px 0px"
    }
}));

export default function Availables() {
    const classes = useStyles()

    const data = [
        {
            copies_sold: 10,
            price: 30.05,
            img: '/assets/images/1984.jpg'
        },
        {
            copies_sold: 2,
            price: 60,
            img: '/assets/images/1984.jpg'
        },
        {
            copies_sold: 30,
            price: 40.50,
            img: '/assets/images/1984.jpg'
        }
    ]
    return (
        <Card>
            <CardContent>
                <Typography className={classes.title} component="h3" variant="h5" color="textSecondary" gutterBottom>
                    Ebook Available for Sale
                </Typography>
                {
                    data.map((e, i) => (
                        <Item {...e} index={i + 1}/>
                    ))
                }
                <div className={classes.seeAll}>
                    <Divider className={classes.divider}/>
                    <Link>See All(10)</Link>
                </div>

            </CardContent>
        </Card>
    )
}

const Item = (props) => {

    const classes = useStyles()

    return (
        <Grid container className={classes.ebookItem}>
            <Grid item xs={2}>
                <img className={classes.img} src={props.img} alt=""/>
            </Grid>
                <Grid item xs={8}>
                    <h4 className={classes.ebookTitle}>Ebook {props.index}</h4>
                    <p>{props.copies_sold} copies sold</p>
                </Grid>
                <Grid item xs={2} className={classes.price}>
                    <div>${props.price}</div>
                </Grid>
        </Grid>
    )
}