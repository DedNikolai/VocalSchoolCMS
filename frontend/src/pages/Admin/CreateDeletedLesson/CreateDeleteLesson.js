import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
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
import {NavLink} from 'react-router-dom';


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
    const lessonDate = new Date(props.match.params.current).toLocaleDateString().split('.').reverse().join('-');
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            lesson: currentLesson,
            lessonDate: lessonDate,
            lessonTime: currentLesson.time,
            reason: '',
        },

        onSubmit: value => {
            rejecrLesson(value);
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        getLessonById(id);
    }, []);


    const handleChangeReason = event => {
        formik.setFieldValue('reason', event.target.value);
    }

    if (currentLessonLoading) {
        return <Preloader/>
    }

    return (
        <Paper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Учень"
                        name='student'
                        id="outlined-size-small"
                        value={formik.values.lesson.student.firstName + ' ' + formik.values.lesson.student.lastName}
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
                        value={formik.values.lesson.teacher.firstName + ' ' + formik.values.lesson.teacher.lastName}
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

CreateDeleteLesson.propTypes = {
    getLessonById: PropTypes.func.isRequired,
    currentLessonLoading: PropTypes.bool.isRequired,
    currentLesson: PropTypes.object,
    transferLesson: PropTypes.func.isRequired,
};

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
    rejecrLesson: (lesson) => dispatch(rejectLesson(lesson)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeleteLesson);