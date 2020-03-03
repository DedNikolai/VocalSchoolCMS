import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AddBox from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        cursor: 'pointer',
        backgroundColor: '#4caf50',
        color: '#fff'
    },
}));

function AddButton() {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <AddBox/>
        </Paper>
    );
}

export default AddButton;
