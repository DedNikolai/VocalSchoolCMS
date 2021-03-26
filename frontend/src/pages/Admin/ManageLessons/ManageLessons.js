import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {createLesson, getLessonById, getLessonsByDay, updateLesson} from "../../../store/actions/lesson";
import {getAllTeachers} from "../../../store/actions/teacher";
import {connect} from "react-redux";
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
import './ManageLesson.scss';
import {colors} from '../../../constants/view';
import Disciplines from '../../../constants/disciplines';
import ua from "../../../languages/ua";
import teacher from "../../../store/reducers/teacher/teacher";
import disciplineValue from '../../../constants/disciplineValue';
import rooms from '../../../constants/rooms';
import typesValue from '../../../constants/typesValue';
import times from '../../../constants/times';
import roomsValues from '../../../constants/roomsValues';
import {withStyles} from "@material-ui/core/styles/index";
import {green} from "@material-ui/core/colors/index";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import daysValues from "../../../constants/daysValues";
import days from '../../../constants/days';
import moment from 'moment';

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
    const {noDay, noTime, noDisciplines, noRoom, noType, noTeacher, noDate} = ua.pages.manageUsers.errors;
    const errors = {};

    if (!values.day) {
        errors.day = noDay;
    }

    if (!values.discipline) {
        errors.discipline = noDisciplines;
    }

    if (!values.room) {
        errors.room = noRoom;
    }

    if (!values.type) {
        errors.type = noType;
    }

    if (!values.teacher) {
        errors.teacher = noTeacher;
    }

    if (!values.time) {
        errors.time = noTime;
    }

    if (!values.lessonStartDate) {
        errors.lessonStartDate = noDate;
    }

    return errors;
};

function ManageLessons(props) {
    const classes = useStyles();
    const {lesson, lessonLoading, getLesson, updateLesson, allTeachersLoading, getTeachers, allTeachers} = props;
    const id = props.match ? props.match.params.id : null;
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {...lesson},
        validate,
        enableReinitialize: true,
        onSubmit: value => {
            updateLesson(id, value);
        },
    });

    useEffect(() => {
        getTeachers();
        getLesson(id);
    }, []);

    const handleDateChange = (event) => {
        if (formik.values.isSingleLesson) {
            formik.setFieldValue('lessonFinishDate', event.target.value);
        }

        formik.setFieldValue('lessonStartDate', event.target.value);
        const day = new Date(event.target.value);
        formik.setFieldValue('day', days[day.getDay() - 1]);
    };

    const handleFinishDateChange = event => {
        formik.setFieldValue('lessonFinishDate', event.target.value);
    }

    const handleChangeDiscipline = event => {
        formik.setFieldValue('discipline', event.target.value);
        formik.setFieldValue('teacher', {});
        formik.setFieldValue('type', '');
    };

    const handleChangeTeacher = event => {
        formik.setFieldValue('teacher', event.target.value);
        formik.setFieldValue('type', '');
    };

    const handleChangeRoom = event => {
        formik.setFieldValue('room', event.target.value);
    };

    const handleChangeType = event => {
        formik.setFieldValue('type', event.target.value);
        if (event.target.value === 'MAN') {
            formik.setFieldValue('duration', 60)
        } else {
            formik.setFieldValue('duration', 30)
        }
    };


    const handleChangeTime = event => {
        formik.setFieldValue('time', event.target.value);
    };

    if (allTeachersLoading || lessonLoading && id) {
        return <div className="wrapper"><Preloader/></div>
    };
    console.log(lesson)
    const checkedDiscipline = formik.values.discipline;
    const checkedTeacher = formik.values.teacher || {};
    const checkedType = formik.values.type || '';
    const lessonTypes = checkedTeacher.id ? checkedTeacher.prices.filter(price => price.discipline === checkedDiscipline).map(price => price.type) : [];
    const currentPrice = formik.values.teacher && formik.values.discipline && formik.values.type ? formik.values.teacher.prices.filter(price => {
        return (
            price.discipline === formik.values.discipline && price.type === formik.values.type
        )
    }) : '';
    const price = currentPrice.length ? currentPrice[0].priceValue : '';
    const isAllowUpdate = new Date(formik.values.lessonStartDate).getTime() > new Date().setHours(0, 0, 0, 0);

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
                <div className={classes.paddingLeft}>
                    <FormControlLabel
                        control={<GreenCheckbox checked={formik.values.isSingleLesson} disabled name="isTestLesson" />}
                        label="Разовий Урок"
                    />
                </div>
                <div>
                    <TextField
                        label={formik.touched.lessonStartDate && formik.errors.lessonStartDate || 'Дата старту заняття'}
                        id="date"
                        type="date"
                        value={formik.values.lessonStartDate}
                        className={classes.textField}
                        onBlur={formik.handleBlur}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={!isAllowUpdate}
                    />
                </div>
                <div>
                    <TextField
                        id="day"
                        name='day'
                        label="День"
                        type="text"
                        value={daysValues[formik.values.day]}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                    />
                </div>
                <div>
                    <TextField
                        label={'Дата закінчення занять'}
                        id="date"
                        type="date"
                        value={formik.values.lessonFinishDate}
                        className={classes.textField}
                        onBlur={formik.handleBlur}
                        onChange={handleFinishDateChange}
                        disabled={formik.values.isSingleLesson}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.discipline && formik.errors.discipline || 'Дисципліна'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='discipline'
                            onChange={handleChangeDiscipline}
                            input={<Input />}
                            renderValue={() => disciplineValue[formik.values.discipline]}
                            value={formik.values.discipline}
                            onBlur={formik.handleBlur}
                            error={formik.touched.disciplines && formik.errors.disciplines}
                            MenuProps={MenuProps}
                            disabled={!isAllowUpdate}
                        >
                            {Disciplines.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.discipline === item}/>
                                    <ListItemText primary={disciplineValue[item]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            disabled={!checkedDiscipline || !isAllowUpdate}
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
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.type && formik.errors.type || 'Тип Заняття'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='type'
                            onChange={handleChangeType}
                            input={<Input />}
                            renderValue={() => typesValue[checkedType]}
                            value={checkedType}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && formik.errors.type}
                            MenuProps={MenuProps}
                            disabled={!checkedTeacher.id || !isAllowUpdate}
                        >
                            {lessonTypes.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.type === item}/>
                                    <ListItemText primary={typesValue[item]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.time && formik.errors.time || 'Час'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='time'
                            onChange={handleChangeTime}
                            input={<Input />}
                            renderValue={() => formik.values.time || ''}
                            value={formik.values.time}
                            MenuProps={MenuProps}
                            onBlur={formik.handleBlur}
                            error={formik.touched.time && formik.errors.time}
                            disabled={!isAllowUpdate}
                        >
                            {times.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.time === item}/>
                                    <ListItemText primary={item} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="Тривалість заняття хв"
                        name='duration'
                        id="outlined-size-small"
                        value={formik.values.duration || ''}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                    <TextField
                        label="Ціна"
                        name='price'
                        id="outlined-size-small"
                        value={price}
                        variant="outlined"
                        size="small"
                        disabled
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">{formik.touched.room && formik.errors.room || 'Клас'}</InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            name='room'
                            onChange={handleChangeRoom}
                            input={<Input />}
                            renderValue={() => rooms[formik.values.room] || ''}
                            value={formik.values.room}
                            onBlur={formik.handleBlur}
                            error={formik.touched.roоm && formik.errors.room}
                            MenuProps={MenuProps}
                            disabled={!isAllowUpdate}
                        >
                            {roomsValues.map(item => (
                                <MenuItem key={item} value={item}>
                                    <Checkbox checked={formik.values.room === item} />
                                    <ListItemText primary={rooms[item]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className='buttons-container'>
                    <NavLink to='/admin/lessons'>
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

ManageLessons.defaultProps = {
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
        lessonsByDayLoading: lesson.lessonsByDayLoading,
        lessonsByDay: lesson.lessonsByDay,
    }
};

const mapDispatchToProps = dispatch => ({
    getLesson: (id) => dispatch(getLessonById(id)),
    updateLesson: (id, data) => dispatch(updateLesson(id, data)),
    createLesson: data => dispatch(createLesson(data)),
    getTeachers: () => dispatch(getAllTeachers()),
    getAllLessonsByCurrentDay: day => dispatch(getLessonsByDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageLessons);