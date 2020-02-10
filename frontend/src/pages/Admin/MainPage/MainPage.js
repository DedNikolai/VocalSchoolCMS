import React, {Fragment, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Deposits from '../../../components/Deposits/Deposits';
import Orders from '../../../components/Orders/Orders';
import {makeStyles} from "@material-ui/core/styles/index";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function MainPage(props) {
    const [text, setText] = useState('');
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        fetch('/api/v1/hello').then(res => {
            return res.text()
        }).then(text => setText(text))
    }, []);

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                        <h1>{text} in ADMIN panel</h1>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                        <Deposits />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Orders />
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default MainPage;