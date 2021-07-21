import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function Sales() {
    return (
    <Card variant="outlined">
        <CardContent>
            <Typography color="textSecondary" gutterBottom>
                Total Sales Monthly
            </Typography>
            <Typography variant="h5" component="h2">
                You don't have any sale this month
            </Typography>
        </CardContent>
    </Card>
    )
}
