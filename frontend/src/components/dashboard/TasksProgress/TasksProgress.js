import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Typography
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import {red} from "@material-ui/core/colors/index";

const TasksProgress = (props) => {
    const {abonements = []} = props;
    const test = abonements.filter(abonement => abonement.quantity == 1).length;
    const abonement = abonements.filter(abonement => abonement.quantity != 1).length;
    const effect = test != 0 ? abonement*100%test : 100;

    return (
        <Card
            sx={{ height: '100%' }}
            {...props}
        >
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
                            % Куплених абонементів
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h3"
                        >
                            {`${effect}%`}
                        </Typography>
                        <LinearProgress
                            value={effect}
                            variant="determinate"
                        />
                        <div className='box-container'>
                            <Box
                                sx={{
                                    pt: 2,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                className='box-container__item'
                            >
                                {/*<ArrowDownwardIcon sx={{ color: red[900] }} />*/}
                                <Typography
                                    color="textSecondary"
                                    variant="caption"
                                >
                                    Тестових занять
                                </Typography>
                                <Typography
                                    sx={{
                                        color: red[900],
                                        mr: 1
                                    }}
                                    variant="body2"
                                >
                                    {test}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    pt: 2,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                className='box-container__item'
                            >
                                {/*<ArrowDownwardIcon sx={{ color: red[900] }} />*/}
                                <Typography
                                    color="textSecondary"
                                    variant="caption"
                                >
                                    Куплених абонементів
                                </Typography>
                                <Typography
                                    sx={{
                                        color: red[900],
                                        mr: 1
                                    }}
                                    variant="body2"
                                >
                                    {abonement}
                                </Typography>

                            </Box>
                        </div>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: orange[600],
                                height: 56,
                                width: 56
                            }}
                        >
                            <InsertChartIcon />
                        </Avatar>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

};

export default TasksProgress;