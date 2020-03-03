import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '20px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search(props) {
    const {onClick, searchParam, setSearchParam, search} = props
    const classes = useStyles();

    const onChange = e => {
        setSearchParam(e.target.value);
        search(e.target.value)
    }

    const clearSearch = () => {
        setSearchParam('');
        search('')
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Пошук"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={onChange}
                value={searchParam}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={clearSearch}>
                <ClearIcon />
            </IconButton>
        </Paper>
    );
};
