import React, {useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {createStudent} from "../../../store/actions/student";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import './CreateStudent.scss';
import {colors} from '../../../constants/view';
import ua from "../../../languages/ua";

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
        minWidth: 100,
    },
}));

const validate = values => {
    const {noEmail, invalidEmail, noFirstName, noSecondName, noAge, noPhone, noBalance} = ua.pages.manageUsers.errors;
    const errors = {};
    if (!values.email) {
        errors.email = noEmail;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = invalidEmail;
    }

    if (!values.firstName) {
        errors.firstName = noFirstName;
    }

    if (!values.lastName) {
        errors.lastName = noSecondName;
    }

    if (!values.age) {
        errors.age = noAge;
    }

    if (!values.phone) {
        errors.phone = noPhone;
    }

    if (!values.payBalance) {
        errors.payBalance = noBalance;
    }

    return errors;
}

function CreateStudent(props) {
    const classes = useStyles();
    const {createStudent} = props;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);

    const formik = useFormik({
        initialValues: {
            payBalance: '0'
        },
        validate,
        onSubmit: value => {
            createStudent(value);
            setChanged(true)
        },
    });

    if (changed) {
        return <Redirect to='/admin/students' />
    }

    return (
        <div className='manage-student'>
            <h2>Особисті дані</h2>
            <Paper>
                <form className={classes.root} autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            label={formik.touched.firstName && formik.errors.firstName || "Ім'я"}
                            name='firstName'
                            id="outlined-size-small"
                            defaultValue={''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && formik.errors.firstName}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label={formik.touched.lastName && formik.errors.lastName || "Прізвище"}
                            name='lastName'
                            id="outlined-size-small"
                            defaultValue={''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && formik.errors.lastName}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label={formik.touched.age && formik.errors.age || "Вік"}
                            name='age'
                            id="outlined-size-small"
                            defaultValue={''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.age && formik.errors.age}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div>
                        <TextField
                            label={formik.touched.email && formik.errors.email || "Email"}
                            name='email'
                            id="outlined-size-small"
                            defaultValue={''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.email && formik.errors.email}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            label={formik.touched.phone && formik.errors.phone || "Телефон"}
                            name='phone'
                            id="outlined-size-small"
                            defaultValue={''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.phone && formik.errors.phone}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    <div className='buttons-container'>
                        <NavLink to='/admin/students'>
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
        </div>
    )
}

CreateStudent.propTypes = {
    createStudent: PropTypes.func.isRequired,
};

CreateStudent.defaultProps = {

}

const mapStateToProps = ({}) => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    createStudent: data => dispatch(createStudent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);