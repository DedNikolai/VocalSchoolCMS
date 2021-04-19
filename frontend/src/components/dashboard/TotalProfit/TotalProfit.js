import React from 'react';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const TotalProfit = (props) => {
    const {lessons = []} = props;
    const sum = lessons.filter(lesson => lesson.isPaid).reduce(((prev, current) => prev + current.price), 0);

    return (

        <Card {...props}>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="h6"
                        >
                            Виплати вчителям
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {`₴ ${sum}`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: indigo[600],
                                height: 56,
                                width: 56
                            }}
                        >
                            <AttachMoneyIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

};

export default TotalProfit;