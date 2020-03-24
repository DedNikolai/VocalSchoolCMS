import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {createStudent, getStudentById, updateStudent} from "../../../store/actions/student";
import {getLessonsByStudent} from "../../../store/actions/lesson";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {createMuiTheme, makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import {green} from '@material-ui/core/colors';
import {useFormik} from 'formik';
import './ManageStudent.scss';
import {colors} from '../../../constants/view';
import ManegeLesson from '../ManageLessons/ManageLessons';
import StudentLessons from './StudentLessons/StudentLessons';

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

function ManageStudent(props) {
    const classes = useStyles();
    const {student, studentLoading, getStudent, updateStudent, createStudent,
        studentLessons, studentLessonsLoading, getStudentLessons} = props;
    const id = props.match.params.id
    const theme = useTheme();
    const [changed, setChanged] = useState(false);
    const [addLesson, setAddLesson] = useState(false);

    const formik = useFormik({
        initialValues: {},
        onSubmit: value => {
            const data = {...student};
            Object.keys(value).forEach(key => data[key] = value[key]);
            if (id) {
                updateStudent(id, data);
            } else {
                createStudent(value);
            }
            setChanged(true)
        },
    });

    useEffect(() => {
        if (id) {
            getStudent(id);
            getStudentLessons(id);
        }
    }, []);

    const handleChange = event => {
        formik.setFieldValue('teachers', event.target.value);
    };

    if (changed) {
        return <Redirect to='/admin/students' />
    }

    if (studentLessonsLoading || studentLoading && id) {
        return <div className="wrapper"><Preloader/></div>
    }

    const checked = id ? formik.values.teachers || student.teachers : formik.values.teachers || [];
    return (
        <div className='manage-student'>
            <h2>Особисті дані</h2>
            <Paper>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                    <div>
                        <TextField
                            label="Ім'я"
                            name='firstName'
                            id="outlined-size-small"
                            defaultValue={id ? student.firstName : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="Прізвище"
                            name='lastName'
                            id="outlined-size-small"
                            defaultValue={id ? student.lastName : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="Вік"
                            name='age'
                            id="outlined-size-small"
                            defaultValue={id ? student.age : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Email"
                            name='email'
                            id="outlined-size-small"
                            defaultValue={id ? student.email : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            label="Телефон"
                            name='phone'
                            id="outlined-size-small"
                            defaultValue={id ? student.phone : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Баланс"
                            name='payBalance'
                            id="outlined-size-small"
                            defaultValue={id ? student.payBalance : ''}
                            variant="outlined"
                            size="small"
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='buttons-container'>
                        <NavLink to='/admin/students'>
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
                <h2>Заняття</h2>
                <StudentLessons lessons={studentLessons}/>
                <div className='buttons-container'>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<PlusOneIcon />}
                            style={{backgroundColor: colors.COLOR_GREEN}}
                            onClick={() => setAddLesson(true)}
                        >
                            Додаты заняття
                        </Button>
                </div>
            {
                addLesson &&
                <div className='manage-student__add-lesson'>
                    <ManegeLesson student={student} closeForm={() => setAddLesson(false)}/>
                </div>
            }
        </div>
    )
}

ManageStudent.propTypes = {
    student: PropTypes.object,
    studentLoading: PropTypes.bool.isRequired,
    getStudent: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
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
        studentLessonsLoading: lesson.lessonsByStudentLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getStudent: (id) => dispatch(getStudentById(id)),
    updateStudent: (id, data) => dispatch(updateStudent(id, data)),
    createStudent: data => dispatch(createStudent(data)),
    getStudentLessons: id => dispatch(getLessonsByStudent(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStudent);