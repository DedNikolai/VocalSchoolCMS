import React, {useEffect, useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import './CreateDeleteLesson.scss';
import {colors} from '../../../constants/view';
import {getLessonById} from '../../../store/actions/lesson';
import {rejectLesson} from '../../../store/actions/deletedLesson';
import disciplineValue from '../../../constants/disciplineValue';


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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
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

function CreateDeleteLesson(props) {
    const classes = useStyles();
    const {currentLesson, currentLessonLoading, getLessonById, rejecrLesson} = props;
    const id = props.match.params.id;
    const date = props.match.params.current;
    const lessonDate = new Date(props.match.params.current).toLocaleDateString().split('.').reverse().join('-');
    const theme = useTheme();
    const [created, setCreated] = useState(false);

    const formik = useFormik({
        initialValues: {
            lesson: currentLesson,
            lessonDate: lessonDate,
            lessonTime: currentLesson.time,
            teacher: currentLesson.teacher,
            student: currentLesson.student,
            reason: '',
            discipline: currentLesson.discipline
        },

        onSubmit: value => {
            rejecrLesson(value, date);
            setCreated(true);
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        getLessonById(id);
    }, []);


    const handleChangeReason = event => {
        formik.setFieldValue('reason', event.target.value);
    };

    if (currentLessonLoading) {
        return <Preloader/>
    }

    if (created) return <Redirect to={'/admin'}/>;

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={formik.values.student.firstName + ' ' + formik.values.student.lastName}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Дисципліна"
                        name='discipline'
                        id="outlined-size-small"
                        value={disciplineValue[formik.values.discipline]}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Вчитель"
                        name='teacher'
                        id="outlined-size-small"
                        value={formik.values.teacher.firstName + ' ' + formik.values.teacher.lastName}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        id="date"
                        label="Дата заняття"
                        type="date"
                        value={formik.values.lessonDate.slice(0, 10)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="time"
                        type="time"
                        variant="outlined"
                        className={classes.textField}
                        value={formik.values.lessonTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                        variant="outlined"
                    />
                </div>
                <div>
                    <TextField
                        id="reason"
                        variant="outlined"
                        className={classes.textField}
                        value={formik.values.reason}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChangeReason}
                        variant="outlined"
                        fullWidth
                    />
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin' className='main-menu__item'>
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

CreateDeleteLesson.defaultProps = {
    allTeachers: [],
    currentLesson: {}
}

const mapStateToProps = ({lesson, teacher}) => {
    return {
        currentLesson: lesson.lessonById,
        currentLessonLoading: lesson.lessonByIdLoading
    }
};

const mapDispatchToProps = dispatch => ({
    getLessonById: (id) => dispatch(getLessonById(id)),
    rejecrLesson: (lesson, date) => dispatch(rejectLesson(lesson, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeleteLesson);