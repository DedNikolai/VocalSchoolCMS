import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {createUser, getUserById, updateUser} from "../../../store/actions/user";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {createMuiTheme, makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {green} from '@material-ui/core/colors';
import {useFormik} from 'formik';
import './ManageUser.scss';
import {colors} from '../../../constants/view';
import {Roles} from '../../../constants/roles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 500
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1),
        width: 100,
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function ManageUser(props) {
    const classes = useStyles();
    const {user, userLoading, getUser, updateUser, createUser} = props;
    const id = props.match.params.id;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);
    const allRoles = Object.keys(Roles).map(key => Roles[key]);

    const formik = useFormik({
        initialValues: {},
        onSubmit: value => {
            const data = {...user};
            Object.keys(value).forEach(key => data[key] = value[key]);
            if (id) {
                updateUser(id, data);
            } else {
                createUser(value);
            }
            setChanged(true)
        },
    });

    useEffect(() => {
        if (id) {
            getUser(id);
        }
    }, []);

    const handleChange = event => {
        formik.setFieldValue('roles', event.target.value);
    };

    if (changed) {
        return <Redirect to='/admin/users' />
    }

    if (userLoading && id) {
        return <div className="wrapper"><Preloader/></div>
    }

    const userRoles = id ? allRoles.filter(role => user.roles.some(item => item === role)) : [];
    const checked = id ? formik.values.roles || user.roles : formik.values.roles || [];
    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Email"
                        name='email'
                        id="outlined-size-small"
                        defaultValue={id ? user.email : ''}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">Рівні доступу</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teachers'
                            multiple
                            value={formik.values.roles || userRoles}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {allRoles.map(role => (
                                <MenuItem key={role} value={role}>
                                    <Checkbox checked={checked.indexOf(role) > -1} />
                                    <ListItemText primary={role} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin/users'>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            Cancel
                        </Button>
                    </NavLink>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            style={{backgroundColor: colors.COLOR_GREEN}}
                            type='submit'
                        >
                            Save
                        </Button>
                    </ThemeProvider>
                </div>
            </form>
        </Paper>

    )
}

ManageUser.propTypes = {
    user: PropTypes.object,
    userLoading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

ManageUser.defaultProps = {
    user: null,
}

const mapStateToProps = ({user}) => {
    return {
        user: user.userById,
        userLoading: user.userByIdLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getUser: (id) => dispatch(getUserById(id)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    createUser: data => dispatch(createUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);