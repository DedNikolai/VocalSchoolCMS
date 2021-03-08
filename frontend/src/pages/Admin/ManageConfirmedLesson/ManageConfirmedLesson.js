import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {getLessonById, updateConfirmedLesson} from "../../../store/actions/confirmedLesson";
import {connect} from "react-redux";
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import './ManageConfirmedLesson.scss';
import {colors} from '../../../constants/view';
import ua from "../../../languages/ua";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    paddingLeft: {
        paddingLeft: '10px'
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

// const validate = values => {
//     const {noDay, noTime, noDisciplines, noRoom, noType, noTeacher} = ua.pages.manageUsers.errors;
//     const errors = {};
//
//     if (!values.day) {
//         errors.day = noDay;
//     }
//
//     if (!values.discipline) {
//         errors.discipline = noDisciplines;
//     }
//
//     if (!values.room) {
//         errors.room = noRoom;
//     }
//
//     if (!values.type) {
//         errors.type = noType;
//     }
//
//     if (!values.teacher) {
//         errors.teacher = noTeacher;
//     }
//
//     if (!values.time) {
//         errors.time = noTime;
//     }
//
//     return errors;
// };

function ManageConfirmedLesson(props) {
    const classes = useStyles();
    const {lesson, lessonLoading, getLesson, updateLesson} = props;
    const id = props.match.params.id;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {...lesson},
        // validate,
        enableReinitialize: true,
        onSubmit: value => {
            updateLesson(value, id);
        },
    });

    useEffect(() => {
        getLesson(id);
    }, []);

    const handleChangeIsPaid = event => {
        formik.setFieldValue('isPaid', event.target.checked);
    };

    if (lessonLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

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
                        value={formik.values.lesson.discipline}
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
                        label="Тип"
                        name='type'
                        id="outlined-size-small"
                        value={formik.values.lesson.type}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Дата"
                        name='date'
                        id="outlined-size-small"
                        value={formik.values.lessonDate}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="День"
                        name='day'
                        id="outlined-size-small"
                        value={formik.values.lesson.day}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Час"
                        name='time'
                        id="outlined-size-small"
                        value={formik.values.time}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label="Тривалість заняття хв"
                        name='duration'
                        id="outlined-size-small"
                        value={formik.values.lesson.duration}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                    <TextField
                        label="Ціна"
                        name='price'
                        id="outlined-size-small"
                        value={formik.values.price}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div className={classes.paddingLeft}>
                    <FormControlLabel
                        control={<GreenCheckbox checked={formik.values.isPaid} onChange={handleChangeIsPaid} name="checkedG" />}
                        label="Відмітка про виплату"
                    />
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin/confirmed-lessons'>
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

ManageConfirmedLesson.defaultProps = {
    lesson: {},
    allTeachers: [],
    lessonsByDay: [],
}

const mapStateToProps = ({confirmedLessons}) => {
    return {
        lesson: confirmedLessons.confirmedLesson,
        lessonLoading: confirmedLessons.confirmedLessonLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getLesson: (id) => dispatch(getLessonById(id)),
    updateLesson: (data, id) => dispatch(updateConfirmedLesson(data, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageConfirmedLesson);