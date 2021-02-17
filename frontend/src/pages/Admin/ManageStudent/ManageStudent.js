import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {getStudentById, getStudentTransfers, updateStudent} from "../../../store/actions/student";
import {getLessonsByStudent} from "../../../store/actions/lesson";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import {useFormik} from 'formik';
import './ManageStudent.scss';
import {colors} from '../../../constants/view';
import CreateLesson from '../CreateLesson/CreateLesson';
import CreateAbonement from '../CreateAbonement/CreateAbonement';
import StudentLessons from './StudentLessons/StudentLessons';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ua from "../../../languages/ua";
import StudentBalance from './StudentBalance/StudentBalance';
import StudentTransfers from './StudentTransfers/StudentTransfers';


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

function ManageStudent(props) {
    const classes = useStyles();
    const {student, studentLoading, getStudent, updateStudent,
        studentLessons, studentLessonsLoading, getStudentLessons,
        studentTransfers, studentTransfersLoading, loadStudentTransfers} = props;
    const id = props.match.params.id;
    const theme = useTheme();
    const [changed, setChanged] = useState(false);
    const [addLesson, setAddLesson] = useState(false);
    const [addAbonement, setAddAbonement] = useState(false);

    const formik = useFormik({
        initialValues: {...student},
        validate,
        onSubmit: value => {
            updateStudent(id, value);
            setChanged(true)
        },
        enableReinitialize: true
    });

    useEffect(() => {
        if (id) {
            getStudent(id);
            getStudentLessons(id);
            loadStudentTransfers(id)
        }
    }, []);

    if (changed) {
        return <Redirect to='/admin/students' />
    }

    if (studentLessonsLoading || studentLoading) {
        return <div className="wrapper"><Preloader/></div>
    }
    console.log(studentTransfers)
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
                            value={formik.values.firstName}
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
                            value={formik.values.lastName}
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
                            value={formik.values.age}
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
                            value={formik.values.email}
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
                            value={formik.values.phone}
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
            <h2>Абонементи</h2>
            <Paper>
                <div className='balance-table-container'>
                    <StudentBalance rows={student.abonements} />
                </div>
            </Paper>
            <h2>Заняття</h2>
            <StudentLessons lessons={studentLessons} studentId={student.id}/>
            <h2>Перенесені уроки</h2>
            {
                studentTransfersLoading ? <Preloader/> :
                    <StudentTransfers tarnsferedLessons={studentTransfers} />
            }

            <div className='buttons-container'>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PlusOneIcon />}
                    style={{backgroundColor: colors.COLOR_GREEN}}
                    onClick={() => setAddLesson(true)}
                >
                    Додати заняття
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PlaylistAddCheckIcon />}
                    style={{backgroundColor: colors.COLOR_GREEN}}
                    onClick={() => setAddAbonement(true)}
                >
                    Додати абонемент
                </Button>
            </div>
            {
                addLesson &&
                <div className='manage-student__add-lesson'>
                    <CreateLesson student={student} closeForm={() => setAddLesson(false)}/>
                </div>
            }
            {
                addAbonement &&
                <div className='manage-student__add-lesson'>
                    <CreateAbonement student={student} closeForm={() => setAddAbonement(false)}/>
                </div>
            }
        </div>
    )
}

ManageStudent.propTypes = {
    student: PropTypes.object,
    studentLoading: PropTypes.bool.isRequired,
    getStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    allTeachers: PropTypes.array,
    studentLessons: PropTypes.array,
    studentLessonsLoading: PropTypes.bool.isRequired,
    getStudentLessons: PropTypes.func.isRequired,
};

ManageStudent.defaultProps = {
    student: null,
    allTeachers: [],
    studentLessons: []
}

const mapStateToProps = ({student, teacher, lesson}) => {
    return {
        student: student.studentById,
        studentLoading: student.studentByIdLoading,
        studentLessons: lesson.lessonsByStudent,
        studentLessonsLoading: lesson.lessonsByStudentLoading,
        studentTransfers: student.studentTransferLessons,
        studentTransfersLoading: student.studentTransferLessonsLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getStudent: (id) => dispatch(getStudentById(id)),
    updateStudent: (id, data) => dispatch(updateStudent(id, data)),
    getStudentLessons: id => dispatch(getLessonsByStudent(id)),
    loadStudentTransfers: id => dispatch(getStudentTransfers(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);