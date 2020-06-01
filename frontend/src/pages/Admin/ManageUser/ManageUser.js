import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {getUserById, updateUser} from "../../../store/actions/user";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
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
import {useFormik} from 'formik';
import './ManageUser.scss';
import {colors} from '../../../constants/view';
import {Roles} from '../../../constants/roles';
import ua from '../../../languages/ua';

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

const validate = values => {
    const {noEmail, invalidEmail, noRole} = ua.pages.manageUsers.errors;
    const errors = {};
    if (!values.email) {
        errors.email = noEmail;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = invalidEmail;
    }

    if (!values.roles) {
        errors.roles = noRole;
    }

    return errors;
}

function ManageUser(props) {
    const classes = useStyles();
    const {user, userLoading, getUser, updateUser} = props;
    const id = props.match.params.id;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);
    const allRoles = Object.keys(Roles).map(key => Roles[key]);
    const {rolesLabel} = ua.pages.manageUsers.inputFields;

    const formik = useFormik({
        initialValues: {...user},
        validate,
        onSubmit: value => {
            updateUser(id, value);
            setChanged(true)
        },
        enableReinitialize: true
    });

    const handleChange = event => {
        formik.setFieldValue('roles', event.target.value);
    };

    useEffect(() => {
        getUser(id);
    }, []);


    if (changed) {
        return <Redirect to='/admin/users' />
    }

    if (userLoading) {
        return <div className="wrapper"><Preloader/></div>
    }

    const userRoles = allRoles.filter(role => user.roles.some(item => item === role));
    const checked = formik.values.roles || user.roles;
    return (
        <Paper>
            <form className={classes.root} autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label={formik.touched.email && formik.errors.email || "Email"}
                        name='email'
                        id="outlined-size-small"
                        value={formik.values.email}
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.roles && formik.errors.roles || rolesLabel}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='roles'
                            multiple
                            value={formik.values.roles || userRoles}
                            onChange={handleChange}
                            input={<Input />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roles && formik.errors.roles}
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
                            style={{backgroundColor: colors.secondaryColor}}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);