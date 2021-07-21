import React from 'react';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Divider} from "@material-ui/core";

const useStyles = styled({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "black",
    margin: 12,
    marginBottom: 20
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    background: "black",
    marginTop: 12,
    marginBottom: 12
  },
  body: {
    textAlign: "center",
    fontSize: "0.75rem",
    color: "gray"
  }
});

export default function Orders() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} component="h3" variant="h5" color="textSecondary" gutterBottom>
          Recent Orders
        </Typography>
        <Divider className={classes.divider}/>
        <Typography component="h6" className={classes.body} >
          You don't have any recent orders
        </Typography>
      </CardContent>
    </Card>
  );
}