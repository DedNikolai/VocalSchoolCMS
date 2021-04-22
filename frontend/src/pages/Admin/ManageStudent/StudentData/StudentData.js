import React from 'react';
import {NavLink} from 'react-router-dom';
import {updateStudent} from "../../../../store/actions/student";
import {connect} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import {colors} from '../../../../constants/view';
import ua from "../../../../languages/ua";


const useStyles = makeStyles(theme => ({
    root: {
        margin: 10,
        width: 300,
    },

    rootFullWidth: {
        width: '90%',
        margin: 10,
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

    return errors;
};

function StudentData(props) {
    const classes = useStyles();
    const {student, updateStudent, setChanged} = props;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {...student},
        validate,
        onSubmit: value => {
            updateStudent(student.id, value);
            setChanged(true)
        },
        enableReinitialize: true
    });

    return (
        <div className='manage-student'>
            <Paper>
                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            label={formik.touched.firstName && formik.errors.firstName || "Ім'я"}
                            name='firstName'
                            id="outlined-size-small"
                            value={formik.values.firstName}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && formik.errors.firstName}
                            onBlur={formik.handleBlur}
                            className={classes.root}
                        />
                        <TextField
                            label={formik.touched.lastName && formik.errors.lastName || "Прізвище"}
                            name='lastName'
                            id="outlined-size-small"
                            value={formik.values.lastName}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && formik.errors.lastName}
                            onBlur={formik.handleBlur}
                            className={classes.root}
                        />
                        <TextField
                            label={formik.touched.age && formik.errors.age || "Вік"}
                            name='age'
                            id="outlined-size-small"
                            value={formik.values.age}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.age && formik.errors.age}
                            onBlur={formik.handleBlur}
                            className={classes.root}
                        />
                    </div>
                    <div>
                        <TextField
                            label={"Батьки"}
                            name='parent'
                            id="outlined-size-small"
                            defaultValue={''}
                            variant="outlined"
                            value={formik.values.parent}
                            size="small"
                            onChange={formik.handleChange}
                            fullWidth
                            className={classes.rootFullWidth}
                        />
                    </div>
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
                            className={classes.root}
                        />
                        <TextField
                            label={formik.touched.phone && formik.errors.phone || "Телефон"}
                            name='phone'
                            id="outlined-size-small"
                            value={formik.values.phone}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                            error={formik.touched.phone && formik.errors.phone}
                            onBlur={formik.handleBlur}
                            className={classes.root}
                        />
                    </div>
                    <div className='buttons-container'>
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

StudentData.defaultProps = {
    student: null,
    allTeachers: [],
    studentLessons: []
}

const mapStateToProps = ({}) => {
    return {
    }
};

const mapDispatchToProps = dispatch => ({
    updateStudent: (id, data) => dispatch(updateStudent(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentData);