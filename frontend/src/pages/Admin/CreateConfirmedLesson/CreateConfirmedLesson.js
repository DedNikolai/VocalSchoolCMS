import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {getLessonById} from "../../../store/actions/lesson";
import {getAllTeachers} from "../../../store/actions/teacher";
import {createConfirmedLesson} from "../../../store/actions/confirmedLesson";
import {connect} from "react-redux";
import Preloader from '../../../components/Preloader/index';
import Paper from '@material-ui/core/Paper';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useFormik} from 'formik';
import './CreateConfirmedLesson.scss';
import {colors} from '../../../constants/view';
import ua from "../../../languages/ua";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import disciplineValue from '../../../constants/disciplineValue';
import typesValue from '../../../constants/typesValue';
import daysValues from "../../../constants/daysValues";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const validate = values => {
    const {noTeacher} = ua.pages.manageUsers.errors;
    const errors = {};

    if (!values.teacher) {
        errors.teacher = noTeacher;
    }

    return errors;
};

function CreateConfirmedLesson(props) {
    const classes = useStyles();
    const {lesson, lessonLoading, getLesson, allTeachersLoading, getTeachers, allTeachers, createLesson} = props;
    const id = props.match.params.lessonId;
    const date = props.match.params.date;
    const theme = useTheme();

    const setLessonPrice = (lesson, teacher) => {
      return teacher ? teacher.prices.filter(price => {
          return (
              price.discipline === lesson.discipline && price.type === lesson.type
          )
      })[0].priceValue : '';
    };

    const formik = useFormik({
        initialValues: {
            lesson: lesson,
            teacher: lesson.teacher,
            lessonDate: date,
            isPaid: false,
            price: setLessonPrice(lesson, lesson.teacher)
        },
        // validate,
        enableReinitialize: true,
        onSubmit: value => {
            createLesson(value, date);
        },
    });

    useEffect(() => {
        getLesson(id);
        getTeachers();

    }, []);

    const handleChangeTeacher = event => {
        formik.setFieldValue('teacher', event.target.value);
        const lessonPrice = setLessonPrice(formik.values.lesson,  event.target.value);
        formik.setFieldValue('price', lessonPrice);

    };

    if (lessonLoading || allTeachersLoading) {
        return <div className="wrapper"><Preloader/></div>
    };

    const checkedTeacher = formik.values.teacher;
    const checkedDiscipline = formik.values.lesson.discipline;

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
                        label="Дисципліна"
                        name='discipline'
                        id="outlined-size-small"
                        value={disciplineValue[formik.values.lesson.discipline]}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.teacher && formik.errors.teacher || 'Вчитель'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='teacher'
                            onChange={handleChangeTeacher}
                            input={<Input />}
                            renderValue={() => checkedTeacher.id ? checkedTeacher.firstName + ' ' + checkedTeacher.lastName : ''}
                            value={checkedTeacher}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teacher && formik.errors.teacher}
                            MenuProps={MenuProps}
                        >
                            {allTeachers.filter(teacher => teacher.disciplines.indexOf(checkedDiscipline) !== -1).map(teacher => (
                                <MenuItem key={teacher.id} value={teacher}>
                                    <Checkbox checked={checkedTeacher.id === teacher.id}/>
                                    <ListItemText primary={teacher.firstName + ' ' + teacher.lastName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="Тип"
                        name='type'
                        id="outlined-size-small"
                        value={typesValue[formik.values.lesson.type]}
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
                        value={daysValues[formik.values.lesson.day]}
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

CreateConfirmedLesson.defaultProps = {
    lesson: {},
    allTeachers: [],
    lessonsByDay: [],
}

const mapStateToProps = ({lesson, teacher}) => {
    return {
        lesson: lesson.lessonById,
        lessonLoading: lesson.lessonByIdLoading,
        allTeachers: teacher.teachers,
        allTeachersLoading: teacher.teachersLoading,
    }
};

const mapDispatchToProps = dispatch => ({
    getLesson: (id) => dispatch(getLessonById(id)),
    createLesson: (lesson, date) => dispatch(createConfirmedLesson(lesson, date)),
    getTeachers: () => dispatch(getAllTeachers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateConfirmedLesson);